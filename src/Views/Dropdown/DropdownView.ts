import { AbstractView } from "../Abstract/AbstractView";
import { ButtonView } from "../Button/ButtonView";

export class DropdownView extends AbstractView {
  private _addButton: Element | null = null;
  private _deleteButton: Element | null = null;
  private _isDeleted: boolean;

  constructor(isDeleted: boolean) {
     super(); 
     this._isDeleted = isDeleted;
    }
  
  protected getTemplate(): Element {
    const dropdownContent = document.createElement('div');
    this._addButton = new ButtonView({className: ['track__add-btn'], body: 'Добавить в плейлист'}).getElement();
    this._deleteButton = new ButtonView({className: ['track__delete-btn'], body: 'Удалить из плейлиста'}).getElement();  

    dropdownContent.classList.add('track__dropdown');

    if (this._isDeleted) {
      dropdownContent.append(this._addButton, this._deleteButton);
    } else {
      dropdownContent.append(this._addButton);
    }

    document.addEventListener('click', (event) => {
      event.preventDefault();
    
      if (document.querySelector('.track__dropdown')) {
        const modal = document.querySelector('.track__dropdown');
        if (!(modal as HTMLElement).contains(event.target as Node)) {
          if (!(modal?.previousElementSibling?.closest('.track__btn-dropdown') as HTMLElement).contains(event.target as Node)) {
            this.removeElement()
          }
        }
      }
    })

    return dropdownContent;
  }

  public get addButton(): Element | null {
    return this._addButton;
  }

  public get deleteButton(): Element | null {
    return this._deleteButton;
  }
}