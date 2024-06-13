import { AbstractView } from "../Abstract/AbstractView";
import { ButtonView } from "../Button/ButtonView";

export class SidebarItemView extends AbstractView {
  private _playlistButton: Element | null = null;
  private _playlistName: string

  constructor(playlistName: string) {
    super();
    this._playlistName = playlistName; 
  }
  
  protected getTemplate(): Element {
    const item = document.createElement('li');
    this._playlistButton = new ButtonView
    (
      {
        className: ['aside__btn'],
        body: this._playlistName,
      }
    ).getElement()

    this._playlistButton.classList.add('aside__btn');
    item.classList.add('aside__item');

    item.append(this._playlistButton);  

    return item;
  }

  public get playlistButton(): Element | null {
    return this._playlistButton;
  }
}