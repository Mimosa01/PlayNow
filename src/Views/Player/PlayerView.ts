import { Song } from "../../Models/TracksModel";
import { normalizeDurationTrack } from "../../Utils/normalizeDurationTrack";
import { setAttributes } from "../../Utils/setAtributes";
import { AbstractView } from "../Abstract/AbstractView";
import { ButtonView } from "../Button/ButtonView";
import { likeSvg, shuffleSvg, skipBackSvg, playSvg, skipNextSvg, repeatSvg, mikroSvg } from "../SVGView/SVGView";

export class PlayerView extends AbstractView {
  private _likeButton: Element | null = null;
  private _shuffleButton: Element | null = null;
  private _skipBackButton: Element | null = null;
  private _playButton: Element | null = null;
  private _skipNextButton: Element | null = null;
  private _repeatButton: Element | null = null;
  private _currentTime: Element | null = null;
  private _rangePlayInput: HTMLInputElement | null = null;
  private _volumeInput: HTMLInputElement | null = null;

  private _track: Song;

  constructor(track: Song) {
     super();
     this._track = track; 
    }

  protected getTemplate(): Element {
    const footer = document.createElement('footer');
    const container = document.createElement('div');
    const playerTrackContainer = document.createElement('div');
    const trackImage = document.createElement('img');
    const trackContent = document.createElement('div');
    const headerContainer = document.createElement('div');
    const trackAuthor = document.createElement('p');
    const trackHeader = document.createElement('h3');
    const controlsContainer = document.createElement('div');
    const controlsHeader = document.createElement('div');
    const controlsFooter = document.createElement('div');
    this._currentTime = document.createElement('span');
    const rangePlay = document.createElement('div');
    const timeEnd = document.createElement('span');
    const rangeContainer = document.createElement('div');
    const rangeValue = document.createElement('div');
    this._rangePlayInput = document.createElement('input');
    this._volumeInput = document.createElement('input');

    this._likeButton = new ButtonView({className: ['player__track__like'], body: [likeSvg()]}).getElement();
    this._shuffleButton = new ButtonView({className: ['player__shaffle-btn'], body: [shuffleSvg()]}).getElement();
    this._skipBackButton = new ButtonView({className: ['player__skipback-btn'], body: [skipBackSvg()]}).getElement();
    this._playButton = new ButtonView({className: ['player__play-btn'], body: [playSvg()]}).getElement();
    this._skipNextButton = new ButtonView({className: ['player__skipnext-btn'], body: [skipNextSvg()]}).getElement();
    this._repeatButton = new ButtonView({className: ['player__repeat-btn'], body: [repeatSvg()]}).getElement();

    footer.classList.add('footer');
    container.classList.add('player', 'flex');
    playerTrackContainer.classList.add('player__track-name', 'flex');
    trackImage.classList.add('player__track__img');
    trackContent.classList.add('player__track-name__content');
    headerContainer.classList.add('player__name__header', 'flex');
    trackAuthor.classList.add('player__track__author');
    trackHeader.classList.add('player__track__h3');
    controlsContainer.classList.add('player__controls');
    controlsHeader.classList.add('player__controls__header');
    controlsFooter.classList.add('player__controls__footer');
    this._currentTime.classList.add('player__time-start');
    timeEnd.classList.add('player__time-end');
    rangePlay.classList.add('player__range-play');
    rangeContainer.classList.add('player__value');
    rangeValue.classList.add('player__value-range');
    this._rangePlayInput.classList.add('player__range-input');
    this._volumeInput.classList.add('player__volume-input');

    setAttributes(trackImage, {'src': this._track.image, 'alt': this._track.name});
    rangePlay.setAttribute('id', 'range-play'); 
    rangeValue.setAttribute('id', 'range-value');
    setAttributes(this._rangePlayInput, {'type': 'range', 'min': '0', 'max': String(this._track.duration), 'value': '0'});
    setAttributes(this._volumeInput, {'type': 'range', 'min': '0', 'max': '1', 'value': '0.1', 'step': '0.01'})

    trackAuthor.textContent = this._track.artist.name;
    trackHeader.textContent = this._track.name;
    this._currentTime.textContent = '0:00';
    timeEnd.textContent = normalizeDurationTrack(this._track.duration);

    rangePlay.append(this._rangePlayInput);
    rangeValue.append(this._volumeInput);
    rangeContainer.append(mikroSvg(), rangeValue);
    controlsFooter.append(this._currentTime, rangePlay, timeEnd);
    controlsContainer.append(controlsHeader, controlsFooter);

    controlsHeader.append(
      this._shuffleButton, 
      this._skipBackButton, 
      this._playButton, 
      this._skipNextButton, 
      this._repeatButton
    );

    headerContainer.append(trackHeader, this._likeButton);
    trackContent.append(headerContainer, trackAuthor);
    playerTrackContainer.append(trackImage, trackContent);
    container.append(
      playerTrackContainer, 
      controlsContainer, 
      rangeContainer
    );
 
    footer.append(container);

    return footer;
  }

  public get likeButton(): Element | null {
    return this._likeButton;
  }

  public get shuffleButton(): Element | null {
    return this._shuffleButton;
  }

  public get skipBackButton(): Element | null {
    return this._skipBackButton;
  }

  public get playButton(): Element | null {
    return this._playButton;
  }

  public get skipNextButton(): Element | null {
    return this._skipNextButton;
  }

  public get repeatButton(): Element | null {
    return this._repeatButton;
  }

  public get currentTime(): Element | null {
    return this._currentTime;
  }

  public get rangePlay(): HTMLInputElement | null {
    return this._rangePlayInput;
  }

  public get volumeRange(): HTMLInputElement | null {
    return this._volumeInput;
  }
}