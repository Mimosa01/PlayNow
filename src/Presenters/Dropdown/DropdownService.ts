import { insertComponent } from "../../Utils/insertComponent";
import { DropdownView } from "../../Views/Dropdown/DropdownView";
import { WorkApi } from "../../api/WorkApi";
import { ModalService } from "../Modal/ModalService";

enum UserAction {
  ADD,
  DELETE
}

export class DropdownService {
  private static _instance: DropdownService;
  private _currentModal?: DropdownView;
  private _trackId: number | null = null;
  private _playlistId?: number;

  constructor() {}

  public static getInstance(): DropdownService {
    if (!DropdownService._instance) {
      DropdownService._instance = new DropdownService();
    }
    return DropdownService._instance;
  }

  public openModal(trackId: number, isDeleted: boolean, playlistId?: number): void {
    if (this._currentModal) this.closeModal();
    this._trackId = trackId;
    this._playlistId = playlistId;

    this._currentModal = new DropdownView(isDeleted);
    const root = document.getElementById(String(trackId))?.querySelector('.tracks__item__drop');

    if (root) insertComponent(root, this._currentModal.getElement(), 'beforeend');

    this.handleEventsDropdown();
  }

  private closeModal(): void {
    if (this._currentModal) {
        this._currentModal.removeElement();
        this._currentModal = undefined;
        this._trackId = null;
    }
  }

  private handleEventsDropdown(): void {
    this._currentModal?.addButton?.addEventListener('click', () => this.onUserAction(UserAction.ADD));
    this._currentModal?.deleteButton?.addEventListener('click', () => this.onUserAction(UserAction.DELETE));
  }

  private async onUserAction(action: UserAction): Promise<void> {
    switch (action) {
      case UserAction.ADD:
        if (this._trackId) {
          ModalService.getInstance().openModal(this._trackId);
        }
        break;

      case UserAction.DELETE:
        if (this._playlistId) {
          await this.onDeleteClick();
        }
        break;
    }
  }

  private async onDeleteClick(): Promise<void> {
    if (this._playlistId && this._trackId) {
      await WorkApi.deleteTrackFromPlaylist(this._playlistId, this._trackId)
    }

    this.closeModal();

    // Скорее всего это событие должен кто-то слушать, чтобы перерисовывать вьюшку
  }
}