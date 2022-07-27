export default class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectors.inputSelector)
    );
    this._submitBtn = this._form.querySelector(
      this._selectors.submitButtonSelector
    );
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._selectors.inputErrorSelector);
    errorElement.classList.remove(this._selectors.errorActiveSelector);
    errorElement.textContent = "";
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._selectors.inputErrorSelector);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._selectors.errorActiveSelector);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.classList.add(this._selectors.inactiveButtonSelector);
      this._submitBtn.setAttribute("disabled", true);
    } else {
      this._submitBtn.classList.remove(this._selectors.inactiveButtonSelector);
      this._submitBtn.removeAttribute("disabled", true);
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  enableValidation() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
}
