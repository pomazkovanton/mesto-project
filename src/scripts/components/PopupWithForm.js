import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm) {
    super(selector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputLists = this._form.querySelectorAll(".popup__form-input");

    this._handleSubmitForm = handleSubmitForm;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputLists.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmitForm(this._getInputValues());
    });
  }
}
