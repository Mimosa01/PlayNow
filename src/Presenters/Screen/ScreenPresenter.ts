import { PlaylistsModel } from "../../Models/PlaylistsModel";
import { TracksModel } from "../../Models/TracksModel";
import { User } from "../../Models/UsersModel";
import { WorkApi } from "../../api/WorkApi";
import { IPresenterFliterable } from "../IPresenterFilterable";
import { PlayerPresenter } from "../Player/PlayerPresenter";
import { PlaylistsPresenter } from "../Playlist/PlaylistsPresenter";
import { TrackListPresenter } from "../Track/TrackListPresenter";
import { IObserverScreen, ScreenState } from "./IObserverSreen";

export class ScreenPresenter implements IObserverScreen {
  private _currentScreen: IPresenterFliterable | null = null;
  private _tracksModel: TracksModel;
  private _playlistsModel: PlaylistsModel;
  private _playerPresenter: PlayerPresenter;
  private _user: User;
  private _root: Element;

  constructor(
    tracksModel: TracksModel,
    playlistsModel: PlaylistsModel,
    playerPresenter: PlayerPresenter,
    user: User,
    root: Element
  ) {
    this._playerPresenter = playerPresenter;
    this._tracksModel = tracksModel;
    this._playlistsModel = playlistsModel;
    this._user = user;
    this._root = root;
  }

  public render(): void {
    this._currentScreen = new TrackListPresenter(
      this._root, 
      this._tracksModel, 
      this._playerPresenter,
      this._user, 
      false
    );
    this._currentScreen.render();
  }

  public async switchScreen(screenState: ScreenState, playlistId?: number): Promise<void> {

    switch (screenState) {
      case ScreenState.Tracks:
        this.allTracksScreen();
        break;

      case ScreenState.PlaylistsList:
        this.allPlaylistsScreen();
        break;

      case ScreenState.Likes:
        this.likeTracksScreen();
        break;

      case ScreenState.Playlist:
        if (playlistId) {
          this.currentPlaylistScreen(playlistId);
        }
        break;
    } 
  }

  public filter(filterStr: string): void { 
    this._currentScreen?.filterRender(filterStr);
  }

  private async allTracksScreen(): Promise<void> {
    this._currentScreen?.remove();

    this._tracksModel.setTracks(await WorkApi.getTracks());
    this._currentScreen = new TrackListPresenter(
      this._root, 
      this._tracksModel, 
      this._playerPresenter,
      this._user, 
      false
    );

    this._currentScreen.render();
  }

  private async allPlaylistsScreen(): Promise<void> {
    this._currentScreen?.remove();

    this._currentScreen = new PlaylistsPresenter(this._root, this._playlistsModel, this.currentPlaylistScreen.bind(this));

    this._currentScreen.render();
  }

  private async likeTracksScreen(): Promise<void> {
    this._currentScreen?.remove();

    this._tracksModel.setTracks((await WorkApi.getUserLikes()).songLikes);
    this._currentScreen = new TrackListPresenter(
      this._root, 
      this._tracksModel, 
      this._playerPresenter,
      this._user, 
      true
    );

    this._currentScreen.render();
  }

  private async currentPlaylistScreen(playlistId: number): Promise<void> {
    this._currentScreen?.remove();

    await this._playlistsModel.update();
        
    const playlist = this._playlistsModel.getPlaylist(playlistId);
    this._tracksModel.setTracks(playlist ? playlist.songs : []);
    this._currentScreen = new TrackListPresenter(
      this._root, 
      this._tracksModel, 
      this._playerPresenter,
      this._user, 
      true, 
      playlistId
    );

    this._currentScreen.render();
  }
}