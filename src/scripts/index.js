import '../css/pages/index.css';
import {enableValidation, disablingButton} from './validate';
import { renderCards, addCard } from './cards';
import { openPopup, closePopup } from './popup';
import { initialCards, selectorsForm } from './data';

// Переменные профиля пользователя
const btnEdit = document.querySelector(".profile__btn-edit");
const nameUser = document.querySelector(".profile__name");
const positionUser = document.querySelector(".profile__position");

// Переменные модального окна изменения профиля
const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = popupEdit.querySelector(".popup__form");
const btnSubmitEdit = formEdit.querySelector(selectorsForm.submitButtonSelector);
const inputName = popupEdit.querySelector(".popup__form-input_type_name");
const inputPosition = popupEdit.querySelector(".popup__form-input_type_position");

// Кнопка открытия модального окна добавления новой карточки
const btnAdd = document.querySelector(".profile__btn-add");

// Переменные модального окна добавления новой карточки
const popupAdd = document.querySelector(".popup_type_add");
const formAdd = popupAdd.querySelector(".popup__form");
const btnSubmitAdd = formAdd.querySelector(selectorsForm.submitButtonSelector);
const inputPlace = popupAdd.querySelector(".popup__form-input_type_place");
const inputImg = popupAdd.querySelector(".popup__form-input_type_img");



//Функция открытия окна редактирования профиля
const openPopupEdit = () => {
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
  disablingButton(btnSubmitEdit, selectorsForm.inactiveButtonClass);
  openPopup(popupEdit);
}

//Функция открытия окна добавления карточки
const openPopupAdd = () => {
  disablingButton(btnSubmitAdd, selectorsForm.inactiveButtonClass);
  openPopup(popupAdd);
}

//Функция для обработки отправки формы изменения профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  nameUser.textContent = inputName.value;
  positionUser.textContent = inputPosition.value;

  closePopup(popupEdit);
}

//Функция для обработки отправки формы добавления новой карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  addCard(inputPlace.value, inputImg.value);
  closePopup(popupAdd);
}

//Обработка событий для модального окна редактирования профиля
btnEdit.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", handleProfileFormSubmit);

//Обработка событий для модального окна добавления карточки
btnAdd.addEventListener("click", openPopupAdd);
formAdd.addEventListener("submit", handleCardFormSubmit);

renderCards(initialCards);
enableValidation(selectorsForm);
