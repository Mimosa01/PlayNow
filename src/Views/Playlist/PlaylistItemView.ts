import { Playlist } from "../../Models/PlaylistsModel";
import { setAttributes } from "../../Utils/setAtributes";
import { AbstractView } from "../Abstract/AbstractView";

export class PlaylistItemView extends AbstractView {
  private _playlist: Playlist
  
  constructor(playlist: Playlist) { 
    super();
    this._playlist = playlist; 
  }

  protected getTemplate(): Element {
    const item = document.createElement('li');
    const picture = document.createElement('picture');
    const image = document.createElement('img');
    const playlistContent = document.createElement('div');
    const header = document.createElement('h3');
    const headerLink = document.createElement('a');
    const playlistCount = document.createElement('span');

    item.classList.add('playlist__item');
    image.classList.add('playlist__img');
    playlistContent.classList.add('playlist__content');
    header.classList.add('playlist__h3');
    headerLink.classList.add('playlist__h3__link');
    playlistCount.classList.add('playlist__count');

    setAttributes(image, {'src': this._playlist.songs[0].image, 'alt': this._playlist.name});
    headerLink.setAttribute('href', '#');

    headerLink.textContent = this._playlist.name;
    playlistCount.textContent = this._playlist.songs ? `${this._playlist.songs.length} треков` : '0 треков';

    header.append(headerLink);
    playlistContent.append(header, playlistCount);
    picture.append(image);
    item.append(picture, playlistContent);

    return item;
  }
}