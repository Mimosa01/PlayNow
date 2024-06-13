import { Playlist } from "../../Models/PlaylistsModel";
import { setAttributes } from "../../Utils/setAtributes";
import { AbstractView } from "../Abstract/AbstractView";

export class ModalItemView extends AbstractView {
  private _playlist: Playlist;

  constructor(playlist: Playlist) {
     super();
     this._playlist = playlist; 
    }

  protected getTemplate(): Element {
    const container = document.createElement('div');
    const image = document.createElement('img');
    const title = document.createElement('div');
    const info = document.createElement('div');

    container.classList.add('playlists-modal__playlist');
    image.classList.add('playlists-modal__playlist__image');
    title.classList.add('playlists-modal__playlist__title');
    info.classList.add('playlists-modal__playlist__info');

    setAttributes(image, {'src': '', 'alt': ''});

    title.textContent = this._playlist.name;
    info.textContent = this._playlist.songs ? `${String(this._playlist.songs.length)} треков` : '0 треков';

    container.append(image, title, info);

    return container;
  }

  public get playlist(): Playlist {
    return this._playlist;
  }
}