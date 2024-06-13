export function insertComponent(container: Element, el: Element, place: InsertPosition): void {
  if (el) {
    container.insertAdjacentElement(place, el);
  }
}