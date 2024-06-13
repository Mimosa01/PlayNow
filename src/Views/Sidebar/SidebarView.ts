import { AbstractView } from "../Abstract/AbstractView";
import { ButtonView } from "../Button/ButtonView";
import { searchButtonSvg, trackButtonSvg, playlistButtonSvg } from "../SVGView/SVGView";

export class SidebarView extends AbstractView{
  private _searchButton: Element | null = null;
  private _trackButton: Element | null = null;
  private _playlistButton: Element | null = null;
  private _likeSongsButton: Element | null = null;

  constructor() { super() }

  protected getTemplate(): Element {
    const container = document.createElement('aside');
    const header = document.createElement('h2');
    const navbar = document.createElement('nav');
    const list = document.createElement('ul');
    const trackButtonItem = document.createElement('li');
    const playlistButtonItem = document.createElement('li');
    const likeSongsItem = document.createElement('li');
    const trackSpan = document.createElement('span');
    const playlistSpan = document.createElement('span');

    this._searchButton = new ButtonView
    (
      {
        className: ['search__btn-open'], 
        body: [searchButtonSvg()],
      } 
    ).getElement();

    this._trackButton = new ButtonView
    (
      {
        className: ['aside__btn', 'aside__tabs-btn'],
        body: [trackButtonSvg(), trackSpan],
        attributes: {'data-path': 'tracks'}
    }
    ).getElement();

    this._playlistButton = new ButtonView
    (
      {
        className: ['aside__btn', 'aside__tabs-btn'],
        body: [playlistButtonSvg(), playlistSpan],
        attributes: {'data-path': 'playlists'}
      }
    ).getElement();

    this._likeSongsButton = new ButtonView
    (
      {
        className: ['aside__btn'],
        body: 'Любимые песни'
      }
    ).getElement();

    container.classList.add('aside');
    header.classList.add('aside__h2', 'visually-hidden');
    navbar.classList.add('aside__nav');
    list.classList.add('aside__list');
    trackSpan.classList.add('aside__btn__text');
    playlistSpan.classList.add('aside__btn__text');
    [trackButtonItem, playlistButtonItem, likeSongsItem].forEach((el) => el.classList.add('aside__item'));

    header.textContent = 'Левая панель навигации';
    trackSpan.textContent = 'Треки';
    playlistSpan.textContent = 'Плейлисты';

    list.setAttribute('id', 'playlist');

    list.append(trackButtonItem, playlistButtonItem, likeSongsItem);
    trackButtonItem.append(this._trackButton);
    playlistButtonItem.append(this._playlistButton);
    likeSongsItem.append(this._likeSongsButton);
    navbar.append(this._searchButton, list); 
    container.append(header, navbar)

    return container;
  }

  public get searchButton(): Element | null {
    return this._searchButton;
  }

  public get trackButton(): Element | null {
    return this._trackButton;
  }

  public get playlistButton(): Element | null {
    return this._playlistButton;
  }

  public get likeSongsButton(): Element | null {
    return this._likeSongsButton;
  }
}