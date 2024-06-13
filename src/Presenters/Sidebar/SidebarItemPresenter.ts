import { Playlist } from "../../Models/PlaylistsModel";
import { insertComponent } from "../../Utils/insertComponent";
import { SidebarItemView } from "../../Views/Sidebar/SidebarItemView";
import { IObserverScreen, ScreenState } from "../Screen/IObserverSreen";

export class SidebarItemPresenter {
  private _sidebarItemView: SidebarItemView;
  private _root: Element;
  private _playlist: Playlist;
  private _observer: IObserverScreen;

  constructor
  (
    root: Element,
    playlist: Playlist, 
    observer: IObserverScreen
  ) {
    this._root = root;
    this._playlist = playlist;
    this._observer = observer;
    this._sidebarItemView = new SidebarItemView(this._playlist.name);
  }

  public render(): void {
    insertComponent(this._root, this._sidebarItemView.getElement(), 'beforeend');

    this.handleEvents();
  }

  public handleEvents(): void {
    this._sidebarItemView.playlistButton?.addEventListener('click', this.onCurrentPlaylistClick.bind(this));
  }

  public remove(): void {
    this._sidebarItemView.removeElement();
  }

  private onCurrentPlaylistClick(): void {
    this._observer.switchScreen(ScreenState.Playlist, this._playlist.id);
  }
}