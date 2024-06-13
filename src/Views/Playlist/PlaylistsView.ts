import { AbstractView } from "../Abstract/AbstractView";

export class PlaylistsView extends AbstractView {

  protected getTemplate(): Element {
    const section = document.createElement('section');
    const header = document.createElement('h2');
    const list = document.createElement('ul');

    section.classList.add('playlist', 'section');
    header.classList.add('playlist__h2');
    list.classList.add('playlist__list');

    header.textContent = 'Плейлисты';

    list.setAttribute('id', 'playlists-list');
    section.setAttribute('data-target', 'playlists');

    section.append(header, list);

    return section;
  }
}