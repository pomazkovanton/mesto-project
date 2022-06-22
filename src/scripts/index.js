import '../css/pages/index.css';
import enableValidation from './validate';
import { renderCards, addCard } from './cards';
import { openPopup, closePopup } from './popup';

const btnEdit = document.querySelector(".profile__btn-edit");
const btnAdd = document.querySelector(".profile__btn-add");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");


const nameUser = document.querySelector(".profile__name");
const positionUser = document.querySelector(".profile__position");

const inputName = popupEdit.querySelector(".popup__form-input_type_name");
const inputPosition = popupEdit.querySelector(".popup__form-input_type_position");
const inputPlace = popupAdd.querySelector(".popup__form-input_type_place");
const inputImg = popupAdd.querySelector(".popup__form-input_type_img");

const formEdit = popupEdit.querySelector(".popup__form");
const formAdd = popupAdd.querySelector(".popup__form");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Функция открытия окна редактирования профиля
function openPopupEdit() {
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
  openPopup(popupEdit);
}

//Функция для обработки отправки формы изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameUser.textContent = inputName.value;
  positionUser.textContent = inputPosition.value;

  closePopup(popupEdit);
}

//Функция для обработки отправки формы добавления новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCard(inputPlace.value, inputImg.value);
  closePopup(popupAdd);
}

//Обработка событий для модального окна редактирования профиля
btnEdit.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", handleProfileFormSubmit);

//Обработка событий для модального окна добавления карточки
btnAdd.addEventListener("click", () => openPopup(popupAdd));
formAdd.addEventListener("submit", handleCardFormSubmit);

renderCards(initialCards);
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_inactive',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-error_active'
});
