import { PlaylistsModel } from "../../Models/PlaylistsModel";
import { insertComponent } from "../../Utils/insertComponent";
import { SidebarView } from "../../Views/Sidebar/SidebarView";
import { IObserverScreen, ScreenState } from "../Screen/IObserverSreen";
import { SidebarItemPresenter } from "./SidebarItemPresenter";

export class SidebarPresenter {
  private _sidebarView: SidebarView;
  private _sidebarItemPresenters: SidebarItemPresenter[] = [];
  private _observer: IObserverScreen | null = null;
  private _root: Element;
  private _playlistsModel: PlaylistsModel;

  constructor(root: Element, playlistsModel: PlaylistsModel) {
    this._root = root;
    this._playlistsModel = playlistsModel;
    this._sidebarView = new SidebarView();
  }

  public render(): void {
    insertComponent(this._root, this._sidebarView.getElement(), 'afterbegin');

    this._playlistsModel.getElements().forEach((playlist) => {
      if (this._observer) {
        return this._sidebarItemPresenters.push(
          new SidebarItemPresenter(
            this._sidebarView.getElement().querySelector('#playlist')!,
            playlist, 
            this._observer
          )
        );
      }
    });

    this._sidebarItemPresenters.map((presenter) => presenter.render());
    
    this.handleEvents();
  }

  private handleEvents(): void {
    this._sidebarView.trackButton?.addEventListener('click', this.onTracksClick.bind(this));
    this._sidebarView.playlistButton?.addEventListener('click', this.onPlaylistsListClick.bind(this));
    this._sidebarView.likeSongsButton?.addEventListener('click', this.onTracksLikeClick.bind(this));
  }

  public remove(): void {
    this._sidebarView.removeElement();
  }

  public subscribe(observer: IObserverScreen): void {
    this._observer = observer;
  }

  private onTracksClick(): void {
    if (this._observer) this._observer.switchScreen(ScreenState.Tracks);
  }

  private onPlaylistsListClick(): void {
    if (this._observer) this._observer.switchScreen(ScreenState.PlaylistsList);
  }

  private onTracksLikeClick(): void {
    if (this._observer) this._observer.switchScreen(ScreenState.Likes);
  }
}