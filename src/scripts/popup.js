//Функция закрытия модального окна
const closePopup = (popup) => {
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
const openPopup = (popup) => {
  document.addEventListener('keydown', handleEscUp);
  popup.classList.add("popup_opened");
}

export {openPopup, closePopup, handleOverlayClick }
