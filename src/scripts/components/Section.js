export default class Section {
  constructor(containerSelector, rendered) {
    this._container = document.querySelector(containerSelector);
    this._renderer = rendered;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  rendered(items) {
    items.reverse().forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }
}
