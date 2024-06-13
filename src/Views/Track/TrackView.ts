import { Song } from "../../Models/TracksModel";
import { normalizeDate } from "../../Utils/normalizeDate";
import { normalizeDurationTrack } from "../../Utils/normalizeDurationTrack";
import { setAttributes } from "../../Utils/setAtributes";
import { AbstractView } from "../Abstract/AbstractView";
import { ButtonView } from "../Button/ButtonView";
import { dropdownSvg, likeSvg } from "../SVGView/SVGView";

export class TrackView extends AbstractView {
  private _likeButton: Element | null = null;
  private _dropdownButton: Element | null = null;
  private _trackNameLink: Element | null = null;
  private _indexTrack: number; 
  private _track: Song; 
  private _isLike: boolean;

  constructor(
    indexTrack: number, 
    track: Song, 
    isLike: boolean
  ) { 
    super();
    this._indexTrack = indexTrack;
    this._track = track;
    this._isLike = isLike; 
  }

  protected getTemplate(): Element {
    const item = document.createElement('li');
    const number = document.createElement('div');
    const albom = document.createElement('div');
    const time = document.createElement('time');
    const nameContainer = document.createElement('div');
    const trackImage = document.createElement('img');
    const trackContent = document.createElement('div');
    const trackNameHeader = document.createElement('h3');
    this._trackNameLink = document.createElement('a');
    const trackAuthor = document.createElement('span');
    const dataContainer = document.createElement('div');
    const dataSpan = document.createElement('span');
    const dropdownContainer = document.createElement('div');

    this._likeButton = new ButtonView({className: ['track__like-btn'], body: [likeSvg()]}).getElement();
    this._dropdownButton = new ButtonView({className: ['track__btn-dropdown'], body: [dropdownSvg()]}).getElement();
      
    if (this._isLike) {
      this._likeButton.classList.add('like-btn--active');
    }

    item.classList.add('tracks__item', 'flex');
    number.classList.add('tracks__item__number');
    albom.classList.add('tracks__item__albom');
    time.classList.add('tracks__item__time');
    nameContainer.classList.add('tracks__item__name');
    trackImage.classList.add('track__img');
    trackContent.classList.add('track__content');
    trackNameHeader.classList.add('track__name');
    this._trackNameLink.classList.add('track__name__link');
    trackAuthor.classList.add('track__autor');
    dataContainer.classList.add('tracks__item__data', 'flex');
    dataSpan.classList.add('data__text');
    dropdownContainer.classList.add('tracks__item__drop');

    setAttributes(trackImage, {'src': this._track.image, 'alt': this._track.name});
    this._trackNameLink.setAttribute('href', '#');
    item.setAttribute('id', String(this._track.id));
  
    number.textContent = String(this._indexTrack + 1);
    albom.textContent = this._track.album.name;
    time.textContent = normalizeDurationTrack(this._track.duration);
    this._trackNameLink.textContent = this._track.name;
    trackAuthor.textContent = this._track.artist.name;
    dataSpan.textContent = normalizeDate(this._track.createdAt) + ' назад';
  
    dropdownContainer.append(this._dropdownButton);
    dataContainer.append(dataSpan, this._likeButton);
    trackNameHeader.append(this._trackNameLink);
    trackContent.append(trackNameHeader, trackAuthor);
    nameContainer.append(trackImage, trackContent);
    item.append(
      number, 
      nameContainer, 
      albom, 
      dataContainer, 
      time, 
      dropdownContainer
      );
  
    return item;
  }

  public get likeButton(): Element | null {
    return this._likeButton;
  }

  public get dropdownButton(): Element | null {
    return this._dropdownButton;
  }

  public get trackNameLink(): Element | null {
    return this._trackNameLink;
  }
}