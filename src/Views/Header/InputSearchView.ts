import { setAttributes } from "../../Utils/setAtributes";
import { AbstractView } from "../Abstract/AbstractView";

export class InputSearchView extends AbstractView {
  private _input: Element | null = null;

  protected getTemplate(): Element {
    const inputContainer = document.createElement('div');
    this._input = document.createElement('input');

    inputContainer.classList.add('header__search');
    this._input.classList.add('header__search__field');

    setAttributes(this._input, {'type': 'search', 'placeholder': 'ЧТО БУДЕМ ИСКАТЬ?'});
    
    inputContainer.append(this._input);

    return inputContainer;
  }

  public get input(): Element | null{
    return this._input;
  }
}