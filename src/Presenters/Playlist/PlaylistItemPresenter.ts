import { Playlist } from "../../Models/PlaylistsModel";
import { insertComponent } from "../../Utils/insertComponent";
import { PlaylistItemView } from "../../Views/Playlist/PlaylistItemView";

export class PlaylistItemPresenter {
  private _playlistItemView: PlaylistItemView;
  private _root: Element;
  private _playlist: Playlist;
  private _onPlaylistClick: (value: number) => void;

  constructor(root: Element, playlist: Playlist, onPlaylistClick: (value: number) => void) {
    this._root = root;
    this._playlist = playlist;
    this._onPlaylistClick = onPlaylistClick;
    this._playlistItemView = new PlaylistItemView(this._playlist);
  }

  public render(): void {
    insertComponent(this._root, this._playlistItemView.getElement(), 'beforeend');

    this.handleEvents();
  }

  public remove(): void {
    this._playlistItemView.removeElement();
  }

  private handleEvents(): void {
    this._playlistItemView.getElement().addEventListener('click', () => this._onPlaylistClick(this._playlist.id));
  }
}