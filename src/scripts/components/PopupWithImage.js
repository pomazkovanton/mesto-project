import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor({popupSelector, imageSelector, captionSelector}) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  open(name, url) {
    this._image.src = url;
    this._image.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}
