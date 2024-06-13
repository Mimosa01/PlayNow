export interface IPresenterFliterable {
  filterRender(value: string): void;
  render(): void;
  remove(): void;
}