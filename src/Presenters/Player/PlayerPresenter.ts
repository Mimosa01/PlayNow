import { PlayerModel } from "../../Models/PlayerModel";
import { Song } from "../../Models/TracksModel";
import { insertComponent } from "../../Utils/insertComponent";
import { normalizeDurationTrack } from "../../Utils/normalizeDurationTrack";
import { PlayerView } from "../../Views/Player/PlayerView";
import { WorkApi } from "../../api/WorkApi";
import { Timer } from "./Timer";

export class PlayerPresenter {
  private _playerView: PlayerView | null = null;
  private _root: Element;
  private _playerModel: PlayerModel;
  private _audioContext: AudioContext;
  private _source: AudioBufferSourceNode | null = null;
  private _buffer: AudioBuffer | null = null;
  private _gainNode: GainNode;
  private _loop: boolean = false;

  constructor(root: Element, track: Song, playlist: Song[]) {
    this._root = root;
    this._playerModel = new PlayerModel(track, playlist);
    this._audioContext = new AudioContext();
    this._gainNode = this._audioContext.createGain();
    this._playerView = new PlayerView(this._playerModel.currentTrack?.track);

    this._gainNode.gain.value = 0.1;
  }

  public render(): void {
    this._playerView = new PlayerView(this._playerModel.currentTrack?.track);

    insertComponent(this._root, this._playerView.getElement(), 'beforeend');

    if (this._playerView.volumeRange) {
      this._playerView.volumeRange.value = String(this._gainNode.gain.value);
    }
    
    this.handleEvents();
  }

  public remove(): void {
    this._playerView?.removeElement();  
  }

  private handleEvents(): void {
    this._playerView?.playButton?.addEventListener('click', this.onPlayClick.bind(this));
    this._playerView?.likeButton?.addEventListener('click', this.onLikeClick.bind(this));
    this._playerView?.shuffleButton?.addEventListener('click', this.onShuffleClick.bind(this));
    this._playerView?.skipBackButton?.addEventListener('click', this.onSkipBack.bind(this));
    this._playerView?.skipNextButton?.addEventListener('click', this.onSkipNext.bind(this));
    this._playerView?.repeatButton?.addEventListener('click', this.onRepeatClick.bind(this));
    this._playerView?.rangePlay?.addEventListener('input', (event: Event) => this.onRangePlayInput(event));
    this._playerView?.rangePlay?.addEventListener('change', this.onRangePlayChange.bind(this));
    this._playerView?.volumeRange?.addEventListener('input', (event: Event) => this.onVolumeChange(event));
  }

  public async onClickTrack(track: Song, playlistId?: number): Promise<void> {
    await this.updatePlayer(track, playlistId);
  }

  private async updatePlayer(track: Song, playlistId?: number): Promise<void> {
    if (track.id !== this._playerModel.currentTrack.track.id) {
      this.stopMusic();
      
      this._buffer = null;
      this._source = null;
    
      await this.loadSong(track.path);

      await this._playerModel.updateTrack(track, playlistId);
      this.remove();
      this.render();
    }

    this.onPlayClick();
  }

  private async onPlayClick(): Promise<void> {
    if (this._audioContext.state == 'suspended') {
      this._audioContext.resume();
    }

    if (!this._buffer) {
      await this.loadSong(this._playerModel.currentTrack.track.path);
    } 

    if (this._playerModel.currentTrack.isPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  private async startMusic(): Promise<void> {
    this._source = this._audioContext.createBufferSource();
    this._source.buffer = this._buffer;
    this._source?.connect(this._gainNode);
    this._gainNode.connect(this._audioContext.destination);

    this._source?.start(0, this._playerModel.currentTrack.currentTime / 1000);
    this._playerModel.currentTrack.isPlaying = true;
    Timer.setTimer(() => this.updateSeekBar(500), 500)
  }

  private stopMusic(): void {
    Timer.clearInterval();
    this._source?.stop();
    this._source = null;
    this._playerModel.currentTrack.isPlaying = false;
  }

  private async loadSong(path: string): Promise<void> {
    if (this._audioContext) {
      const arrayBuffer = await WorkApi.downloadTrack(path);
      const decodedData = await this._audioContext.decodeAudioData(arrayBuffer);

      this._buffer = decodedData;
    }
  }

  private async onLikeClick(): Promise<void> {
    const userLikes = await WorkApi.getUserLikes();

    const isFind = userLikes.songLikes.find((track) => track.id === this._playerModel.currentTrack.track.id);

    if (isFind) {
      await WorkApi.unlike(this._playerModel.currentTrack.track.id);

    } else {
      await WorkApi.like(this._playerModel.currentTrack.track.id);
    }

    this._playerView?.likeButton?.classList.toggle('like-btn--active');
  }

  private onShuffleClick(): void {
    this._playerModel.shufflePlaylist()
  }

  private async onSkipBack(): Promise<void> {
    this.stopMusic();
    await this.updatePlayer(this._playerModel.getTrackBack(this._playerModel.currentTrack.track.id));
  }

  private async onSkipNext(): Promise<void> {
    this.stopMusic();
    await this.updatePlayer(this._playerModel.getTrackNext(this._playerModel.currentTrack.track.id));
  }

  private onRepeatClick(): void {
    this._loop = !this._loop;
  }

  private updateSeekBar(value: number, isTimer: boolean = true): void {

    if (isTimer) {
      this._playerModel.currentTrack.currentTime += value;
    } else {
      this._playerModel.currentTrack.currentTime = value;
    }

    if (this._playerView?.currentTime && this._playerView.rangePlay) {
      this._playerView.currentTime.textContent = normalizeDurationTrack(this._playerModel.currentTrack.currentTime)
      this._playerView.rangePlay.value = String(this._playerModel.currentTrack.currentTime);
    }

    if (this._playerModel.currentTrack.currentTime + 500 >= this._playerModel.currentTrack.track.duration) {
      Timer.clearInterval();

      if (!this._loop) {
        this.onSkipNext();
      } else {
        this._playerModel.currentTrack.currentTime = 0
        this.startMusic();
      }

    }
  }

  private onRangePlayInput(event: Event): void {
    Timer.clearInterval();
    const value = (event.target as HTMLInputElement).value;

    this.updateSeekBar(Number(value), false);
  }

  private onRangePlayChange(): void {
    this.stopMusic();
    this.startMusic();
    Timer.setTimer(() => this.updateSeekBar(500), 500)
  }

  private onVolumeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    if (this._gainNode?.gain) {
      this._gainNode.gain.value = Number(value);
    }
  }
}