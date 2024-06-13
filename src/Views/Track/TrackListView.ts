import { AbstractView } from "../Abstract/AbstractView";
import { calendarIconSvg, timeIconSvg } from "../SVGView/SVGView";

export class TrackListView extends AbstractView {

  protected getTemplate(): Element {
    const section = document.createElement('section');
    const header = document.createElement('h2');
    const container = document.createElement('div');
    const tracksHeaderContainer = document.createElement('div');
    const number = document.createElement('div');
    const name = document.createElement('div');
    const albom = document.createElement('div');
    const data = document.createElement('div');
    const time = document.createElement('div');
    const trackParent = document.createElement('ul');
      
    section.classList.add('tracks', 'section');
    header.classList.add('tracks__h2', 'title__h2');
    container.classList.add('tracks__content');
    tracksHeaderContainer.classList.add('tracks__header', 'flex');
    number.classList.add('tracks__header__number');
    name.classList.add('tracks__header__name');
    albom.classList.add('tracks__header__albom');
    data.classList.add('tracks__header__data');
    time.classList.add('tracks__header__time');
    trackParent.classList.add('tracks__list');
  
    header.textContent = 'Треки';
    number.textContent = '№';
    name.textContent = 'НАЗВАНИЕ';
    albom.textContent = 'АЛЬБОМ';

    trackParent.setAttribute('id', 'trackParent');
    section.setAttribute('data-target', 'tracks');

    data.append(calendarIconSvg());
    time.append(timeIconSvg());
    tracksHeaderContainer.append(number, name, albom, data, time);
    container.append(tracksHeaderContainer, trackParent);
    section.append(header, container);

    return section;
  }
}