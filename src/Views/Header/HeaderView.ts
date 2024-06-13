import { AbstractView } from "../Abstract/AbstractView";

export class HeaderView extends AbstractView {

  protected getTemplate(): Element {
    const header = document.createElement('header');

    header.classList.add('header', 'flex');

    return header;
  }
}