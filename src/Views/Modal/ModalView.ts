import { AbstractView } from "../Abstract/AbstractView";

export class ModalVew extends AbstractView {
  private _closeButton: Element | null = null;

  protected getTemplate(): Element {
    const background = document.createElement('div');
    const container = document.createElement('div');
    const title = document.createElement('div');
    const content = document.createElement('div');
    const footer = document.createElement('div');
    this._closeButton = document.createElement('div');

    background.classList.add('playlists-background')
    container.classList.add('playlists-modal', 'show');
    title.classList.add('playlists-modal__title');
    content.classList.add('playlists-modal__playlist_content');
    footer.classList.add('playlists-modal__footer');
    this._closeButton.classList.add('playlists-modal__close-btn');

    content.setAttribute('id', 'modal-content');

    title.textContent = 'Добавить в плейлист';
    this._closeButton.textContent = 'Отменить';
    
    footer.append(this._closeButton);
    container.append(title, content, footer);
    background.append(container)

    return background;
  }

  public get closeButton(): Element | null {
    return this._closeButton;
  }
}