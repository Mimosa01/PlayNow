interface IView {
  getElement(): Element;
  removeElement(): void;
}

export abstract class AbstractView implements IView {
  private _element: Element | null = null;

  constructor() {}

  public getElement(): Element {
    if (!this._element) {
      this._element = this.getTemplate();
    }
    return this._element;
  }

  public removeElement(): void {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }

  protected abstract getTemplate(): Element;
}