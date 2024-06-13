import { WorkApi } from "../api/WorkApi";
import { Song } from "./TracksModel";

export type PlayerTrack = {
  track: Song;
  isPlaying: boolean;
  currentTime: number;
  playlist: Song[];
}

export class PlayerModel {
  private _currentTrack: PlayerTrack;

  constructor(track: Song, playlist: Song[]) {
    this._currentTrack = {
      track: track,
      currentTime: 0,
      isPlaying: false,
      playlist: playlist
    }
  }

  public get currentTrack(): PlayerTrack {
    return this._currentTrack;
  }

  public async updateTrack(track: Song, playlistId?: number): Promise<void> {

    this._currentTrack.track = track;
    this._currentTrack.isPlaying = false;
    this._currentTrack.currentTime = 0;

    if (!playlistId) {
      if (!this._currentTrack.playlist) {
        this._currentTrack.playlist = await WorkApi.getTracks();
      }
    } else {
      this._currentTrack.playlist = (await WorkApi.getPlaylist(playlistId)).songs;
    }
  }

  public getTrackNext(trackId: number): Song {
    let index: number = this._currentTrack.playlist.findIndex((track) => track.id === trackId);
    
    if (index === this._currentTrack.playlist.length - 1) {
      index = -1;
    }

    return this._currentTrack.playlist[index + 1];
  }

  public getTrackBack(trackId: number): Song {
    let index = this._currentTrack.playlist.findIndex((track) => track.id === trackId);

    if (index === 0) {
      index = this._currentTrack.playlist.length;
    }

    return this._currentTrack.playlist[index - 1];
  }

  public shufflePlaylist(): void {
    for (let i = this._currentTrack.playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._currentTrack.playlist[i], this._currentTrack.playlist[j]] = [this._currentTrack.playlist[j], this._currentTrack.playlist[i]];
    }
  } 
}