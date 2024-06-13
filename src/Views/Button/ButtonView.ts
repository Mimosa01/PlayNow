import { Attributes, setAttributes } from "../../Utils/setAtributes";
import { AbstractView } from "../Abstract/AbstractView";

type ButtonInit = {
  className?: string[];
  body?: Element[] | string;
  attributes?: Attributes;
}

export class ButtonView extends AbstractView {
  private _options: ButtonInit;

  constructor(options: ButtonInit) {
     super();
     this._options = options; 
    }

  protected getTemplate(): Element {
    const button = document.createElement('button');

    if (this._options.className) {
      this._options.className.forEach((cls) => {
        button.classList.add(cls);
      })
    }

    if (this._options.body) {
      if (typeof this._options.body === 'string') {
        button.textContent = this._options.body;
      } else {
        this._options.body.forEach((element) => {
          button.append(element)
        })
      }
    }

    if (this._options.attributes) {
      setAttributes(button, this._options.attributes);
    }
    
    return button;
  }
}