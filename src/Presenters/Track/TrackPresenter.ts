import { Song } from "../../Models/TracksModel";
import { User } from "../../Models/UsersModel";
import { insertComponent } from "../../Utils/insertComponent";
import { TrackView } from "../../Views/Track/TrackView";
import { WorkApi } from "../../api/WorkApi";
import { DropdownService } from "../Dropdown/DropdownService";

export class TrackPresenter {
  private _trackView: TrackView;
  private _root: Element;
  private _indexTrack: number; 
  private _track: Song; 
  private _user: User;
  private _isDeleted: boolean;
  private _playlistId?: number;
  private _playerHandler: (value: Song, playlistId?: number) => void;

  constructor
  (
    root: Element,
    indexTrack: number, 
    track: Song, 
    user: User, 
    isDeleted: boolean,
    playerHandler: (value: Song, playlistId?: number) => void,
    playlistId?: number
  ) {
    this._root = root;
    this._indexTrack = indexTrack;
    this._track = track;
    this._user = user;
    this._isDeleted = isDeleted;
    this._playlistId = playlistId;
    const isLike = this._track.likes.find((user) => user.id === this._user.id) ? true : false;
    this._playerHandler = playerHandler;
    this._trackView = new TrackView(this._indexTrack, this._track, isLike);
  }

  public render(): void {
    insertComponent(this._root, this._trackView.getElement(), 'beforeend');

    this.handleEvents();
  }

  private handleEvents(): void {
    this._trackView.dropdownButton?.addEventListener('click', this.onDropdownClick.bind(this));
    this._trackView.likeButton?.addEventListener('click', this.onLikeClick.bind(this));
    this._trackView.trackNameLink?.addEventListener('click', () => this._playerHandler(this._track, this._playlistId));
  }

  public remove(): void {
    this._trackView.removeElement();
  }

  private onDropdownClick(): void {
    DropdownService.getInstance().openModal(this._track.id, this._isDeleted, this._playlistId);
  }

  private async onLikeClick(): Promise<void> {
    const userLikes = await WorkApi.getUserLikes();

    const isFind = userLikes.songLikes.find((track) => track.id === this._track.id);

    if (isFind) {
      await WorkApi.unlike(this._track.id);

    } else {
      await WorkApi.like(this._track.id);
    }

    this._trackView.likeButton?.classList.toggle('like-btn--active');
  }
}