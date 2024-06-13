import { TracksModel } from "../../Models/TracksModel";
import { User } from "../../Models/UsersModel";
import { insertComponent } from "../../Utils/insertComponent";
import { TrackListView } from "../../Views/Track/TrackListView";
import { IPresenterFliterable } from "../IPresenterFilterable";
import { PlayerPresenter } from "../Player/PlayerPresenter";
import { TrackPresenter } from "./TrackPresenter";

export class TrackListPresenter implements IPresenterFliterable {
  private _trackListView: TrackListView;
  private _trackPresenters: TrackPresenter[] = [];
  private _root: Element;
  private _tracksModel: TracksModel;
  private _playerPresenter: PlayerPresenter;
  private _user: User;
  private _isDeleted: boolean;
  private _playlistId?: number;

  constructor
  (
    root: Element,
    tracksModel: TracksModel,
    playerPresenter: PlayerPresenter, 
    user: User, 
    isDeleted: boolean,
    playlistId?: number
  ) {
    this._root = root;
    this._tracksModel = tracksModel;
    this._user = user;
    this._isDeleted = isDeleted;
    this._playlistId = playlistId;
    this._playerPresenter = playerPresenter;
    this._trackListView = new TrackListView();
  }

  public render(): void {
    insertComponent(this._root, this._trackListView.getElement(), 'afterbegin');

    this.filterRender();
  }

  public filterRender(filter?: string): void {
    this._trackPresenters.map((presenter) => presenter.remove());
    this._trackPresenters = [];

    this._tracksModel.getElements(filter).forEach((track, index) => {
      this._trackPresenters.push(
        new TrackPresenter(
          this._trackListView.getElement(),
          index, 
          track, 
          this._user, 
          this._isDeleted, 
          this._playerPresenter.onClickTrack.bind(this._playerPresenter),
          this._playlistId ? this._playlistId : undefined
        )
      );
    });

    this._trackPresenters.map((presenter) => presenter.render());
  }

  public remove(): void {
    this._trackListView.removeElement();
  }
}