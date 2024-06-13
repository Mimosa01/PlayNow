import { AbstractView } from "../Abstract/AbstractView";
import { logoSvg } from "../SVGView/SVGView";

export class LogoView extends AbstractView {
  protected getTemplate(): Element {
    const logo = document.createElement('a');
    logo.classList.add('header__logo');
    logo.setAttribute('href', '/');
    logo.append(logoSvg());

    return logo;
  }
}