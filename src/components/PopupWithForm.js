import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmitForm){
    super(selector);

    this._form = this._selector.document.querySelector('.popup__form');
    this._inputList = this._form.document.querySelectorAll('.popup__form-input')

    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues(){
    this._inputsValues = {};
    this._inputList.forEach(input => {
      this._inputsValues[input.name] = input.value;
    })
    return this._inputsValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }
}
