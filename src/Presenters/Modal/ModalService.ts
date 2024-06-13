import { Playlist } from "../../Models/PlaylistsModel";
import { insertComponent } from "../../Utils/insertComponent";
import { ModalItemView } from "../../Views/Modal/ModalItemView";
import { ModalVew } from "../../Views/Modal/ModalView";
import { WorkApi } from "../../api/WorkApi";

export class ModalService {
  private static _instance: ModalService;
  private _currentModal?: ModalVew;
  private _modalItemViews: ModalItemView[] = [];
  private _playlists: Playlist[] = [];
  private _trackId: number | null = null;

  constructor() {}

  public static getInstance(): ModalService {
    if (!ModalService._instance) {
      ModalService._instance = new ModalService();
    }
    return ModalService._instance;
  }

  public render(root: Element): void {
    this._currentModal = new ModalVew();

    insertComponent(root, this._currentModal.getElement(), 'afterbegin');
  }

  public openModal(trackId: number): void {
    this._currentModal?.getElement().classList.add('show');
    this._trackId = trackId;

    this._playlists.forEach((playlist) => {
      this._modalItemViews.push(
        new ModalItemView(playlist)
      )
    });

    this._modalItemViews.forEach((view) => {
      this._currentModal?.getElement().querySelector('#modal-content')?.append(view.getElement());
    });

    this.handleEvents();
  }

  private handleEvents(): void {
    this._currentModal?.closeButton?.addEventListener('click', this.onCloseModal.bind(this));
    this._modalItemViews.forEach((view) => {
      view.getElement().addEventListener('click', async () => this.onAddTrack(view.playlist.id));
    })
  }

  private onCloseModal(): void {
    this.closeModal();
  }

  private async onAddTrack(playlistId: number): Promise<void> {
    if (this._trackId) {
      await WorkApi.addTrackInPlaylist(playlistId, this._trackId);
    }

    this.closeModal();
  }

  private closeModal(): void {
    if (this._currentModal?.getElement().classList.contains('show')) {
      this._currentModal?.getElement().classList.remove('show');

      this._trackId = null;

      this._modalItemViews.map((view) => view.removeElement());

      this._modalItemViews = [];
    }
  }

  public set playlists(playlists: Playlist[]) {
    this._playlists = playlists;
  }
}