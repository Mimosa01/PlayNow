export type Attributes = {
  [key: string]: string;
}

export function setAttributes(el: Element, options: Attributes): void {
  Object.keys(options).forEach((attr) => {
    el.setAttribute(attr, options[attr])
  });
}