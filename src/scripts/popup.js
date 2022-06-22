const closeButtons = document.querySelectorAll(".popup__btn-close");
const popups = document.querySelectorAll(".popup");

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
const handleCloseForm = (popup) => {
  const form = popup.querySelectorAll('.popup__form')[0];
  if (form) {
    resetForm(form);
    resetInputError(form);
  }
}

//Функция закрытия модального окна
function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.classList.remove("popup_opened");
  handleCloseForm(popup);
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
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

//Функция открытия модального окна
function openPopup(popup) {
  document.addEventListener('keydown', handleEscUp);
  popup.classList.add("popup_opened");
}

//Обработка событий закрытия модальных окон
popups.forEach(popup => {
  handleOverlayClick(popup);
})

//Обработка событий закрытия модальных окон
closeButtons.forEach((button) => {
  const popup = button.closest(".popup"); // С помощью closest возвращает ближайщий родительский элемент
  button.addEventListener("click", () => closePopup(popup));
});

export {openPopup, closePopup, handleOverlayClick}
