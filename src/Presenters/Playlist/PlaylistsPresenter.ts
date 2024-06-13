import { PlaylistsModel } from "../../Models/PlaylistsModel";
import { insertComponent } from "../../Utils/insertComponent";
import { PlaylistsView } from "../../Views/Playlist/PlaylistsView";
import { IPresenterFliterable } from "../IPresenterFilterable";
import { PlaylistItemPresenter } from "./PlaylistItemPresenter";

export class PlaylistsPresenter implements IPresenterFliterable {
  private _playlistsView: PlaylistsView;
  private _playlistItemPresenters: PlaylistItemPresenter[] = [];
  private _root: Element;
  private _playlistsModel: PlaylistsModel;
  private _switchScreen: (value: number) => void;

  constructor(root: Element, playlistsModel: PlaylistsModel, switchScreen: (value: number) => void) {
    this._root = root;
    this._playlistsModel = playlistsModel;
    this._switchScreen = switchScreen;
    this._playlistsView = new PlaylistsView();
  }

  public render(): void {
    insertComponent(this._root, this._playlistsView.getElement(), 'afterbegin');

    this.filterRender();
  }

  public remove(): void {
    this._playlistsView.removeElement();
  }

  public filterRender(filter?: string): void {

    this._playlistItemPresenters.map((presenter) => presenter.remove());

    this._playlistItemPresenters = [];

    this._playlistsModel.getElements(filter).forEach((playlist) => {
      this._playlistItemPresenters.push(
        new PlaylistItemPresenter(
          this._playlistsView.getElement().querySelector('#playlists-list')!,
          playlist,
          this._switchScreen
        )
      );
    });

    this._playlistItemPresenters.map((presenter) => presenter.render());
  }
}