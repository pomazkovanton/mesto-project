import Popup from "./Popup";

export default class PopupWithAlert extends Popup {
  constructor(popupSelector, handleClosingAlert){
    super(popupSelector);
    this._handleClosingAlert = handleClosingAlert;
    this._button = this._popup.querySelector('.popup__form-btn_type_alert');
  }

  getIdCard(card) {
    this.card = card;
    this._id = card._id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleClosingAlert(this._id);
    });
  }
}
