// Очистка полей формы
const resetForm = (form) => {
  form.reset();
};

// Сброс ошибок формы
const resetInputError = (form) => {
  const errorList = form.querySelectorAll('.popup__form-error');
  const inputList = form.querySelectorAll('.popup__form-input');

  inputList.forEach((element) => {
    element.classList.remove('popup__form-input_type_error');
  });

  errorList.forEach((element) => {
    element.classList.remove('popup__form-error_active');
    element.textContent = '';
  });
};

//Очитска поля формы и ошибок в Popup
const handleClearForm = (popup) => {
  const form = popup.querySelector('.popup__form');
  resetForm(form);
  resetInputError(form);
}

//Функция закрытия модального окна
function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.classList.remove("popup_opened");
}

// Закрытие модального окна кликом на overlay
const handleOverlayClick = (popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  })
};

// Закрытие модального окна кликом на esc
const handleEscUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

//Функция открытия модального окна
function openPopup(popup) {
  document.addEventListener('keydown', handleEscUp);
  popup.classList.add("popup_opened");
}

export {openPopup, closePopup, handleOverlayClick, handleClearForm}
