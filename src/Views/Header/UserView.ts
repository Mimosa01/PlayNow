import { setAttributes } from "../../Utils/setAtributes";
import { AbstractView } from "../Abstract/AbstractView";
import { ButtonView } from "../Button/ButtonView";
import { arrowSvg } from "../SVGView/SVGView";

type UserProps = {
  firstName: string;
  lastName: string;
}

export class UserView extends AbstractView {
  private _user: UserProps

  constructor(user: UserProps) {
     super();
     this._user = user; 
    }

  protected getTemplate(): Element {
    const userImg = document.createElement('img');
    const usernameSpan = document.createElement('span');
    const button = new ButtonView
    (
      {
        className: ['header__user'],
        body: [userImg, usernameSpan, arrowSvg()],
      }
    ).getElement();
  
    userImg.classList.add('header__user__img');
    usernameSpan.classList.add('header__user__text');
  
    setAttributes(userImg, {'src': '', 'alt': 'Изображение пользователя'}); // Need data
  
    usernameSpan.textContent = `${this._user.firstName} ${this._user.lastName.slice(0, 1)}.`;
    // usernameSpan.textContent = 'Kirill T'; 
  
    return button;
  }
}