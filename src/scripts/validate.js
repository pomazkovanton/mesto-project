const showInputError = (formElement, inputElement, errorMessage, {inputErrorSelector, errorActiveSelector}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorSelector);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorActiveSelector);
};

const hideInputError = (formElement, inputElement, {inputErrorSelector, errorActiveSelector}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorSelector);
  errorElement.classList.remove(errorActiveSelector);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, {...selectors}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

const disablingButton = (buttonElement, inactiveButtonSelector) => {
  buttonElement.classList.add(inactiveButtonSelector);
  buttonElement.setAttribute('disabled', true);
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonSelector) => {
  if (hasInvalidInput(inputList)) {
    disablingButton(buttonElement, inactiveButtonSelector);
  } else {
     buttonElement.classList.remove(inactiveButtonSelector);
     buttonElement.removeAttribute('disabled');
  }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonSelector, ...selectors}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, inactiveButtonSelector);
    });
  });
};

const enableValidation = ({formSelector, ...selectors}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach( formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, selectors);

  });
}

// Очистка полей формы
const resetForm = (form) => {
  form.reset();
};

// Сброс ошибок формы
const resetInputError = (form, {inputSelector, inputErrorSelector, errorSelector, errorActiveSelector}) => {

  const errorList = form.querySelectorAll(errorSelector);
  const inputList = form.querySelectorAll(inputSelector);

  inputList.forEach((element) => {
    element.classList.remove(inputErrorSelector);
  });

  errorList.forEach((element) => {
    element.classList.remove(errorActiveSelector);
    element.textContent = '';
  });
};

//Очитска поля формы и ошибок в Popup
const handleClearForm = (popup, {formSelector, ...selectors}) => {
  const form = popup.querySelector(formSelector);
  resetForm(form);
  resetInputError(form, selectors);
}


export {enableValidation, disablingButton, handleClearForm};
