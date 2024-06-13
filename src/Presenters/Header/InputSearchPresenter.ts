import { insertComponent } from "../../Utils/insertComponent";
import { InputSearchView } from "../../Views/Header/InputSearchView";
import { IObserverScreen } from "../Screen/IObserverSreen";

export class InputSearchPresenter {
  private _inputSearchView: InputSearchView;
  private _observer: IObserverScreen | null = null;
  private _root: Element;

  constructor(root: Element) {
    this._root = root;
    this._inputSearchView = new InputSearchView();
  }

  public render(): void {
    insertComponent(this._root, this._inputSearchView.getElement(), 'beforeend');

    this.handleEvents();
  }

  public remove(): void {
    this._inputSearchView.removeElement();  
  }

  public subscribe(observer: IObserverScreen): void {
    this._observer = observer;
  }

  private handleEvents(): void {
    this._inputSearchView.input?.addEventListener('input', (event: Event) => this.onInput(event.target as HTMLInputElement))
  }

  public onInput(inputValue: HTMLInputElement): void {
    this._observer?.filter(inputValue.value);
  }
}