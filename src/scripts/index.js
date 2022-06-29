import '../css/pages/index.css';
import {enableValidation, disablingButton, handleClearForm} from './validate';
import { createCard  } from './card';
import { openPopup, closePopup, handleOverlayClick } from './popup';
import { selectorsForm, selectorsCard } from './data';
import { getUser, getCards, postCards, updateUser, updateAvatar } from './api';

// Переменные профиля пользователя
const btnEdit = document.querySelector(".profile__btn-edit");
const btnEditAvatar = document.querySelector(".profile__edit-avatar");
const nameUser = document.querySelector(".profile__name");
const positionUser = document.querySelector(".profile__position");
const avatarUser = document.querySelector(".profile__avatar");

// Переменные модального окна изменения аватара пользователя
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const btnSubmitEditAvatar = formEditAvatar.querySelector(selectorsForm.submitButtonSelector);
const inputAvatarSrc = formEditAvatar.querySelector(".popup__form-input_type_avatar");

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

// Переменные галереи
const gallery = document.querySelector('.gallery__list');

// Переменные модальных окон
const closeButtons = document.querySelectorAll(".popup__btn-close");
const popups = document.querySelectorAll(".popup");

//Функция открытия окна редактирования профиля
const openPopupEdit = () => {
  handleClearForm(popupEdit, selectorsForm);
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
  disablingButton(btnSubmitEdit, selectorsForm.inactiveButtonSelector);
  openPopup(popupEdit);
}

//Функция открытия окна изменения аватара
const openPopupEditAvatar = () => {
  handleClearForm(popupEditAvatar, selectorsForm);
  disablingButton(btnSubmitEditAvatar, selectorsForm.inactiveButtonSelector);
  openPopup(popupEditAvatar);
}

//Функция открытия окна добавления карточки
const openPopupAdd = () => {
  disablingButton(btnSubmitAdd, selectorsForm.inactiveButtonSelector);
  handleClearForm(popupAdd, selectorsForm);
  openPopup(popupAdd);
}

//Функция добавления новой карточки
const addCard = (namePlace, linkImg, likes, cardID, userID, selectorsCard) => {
  const card = createCard(namePlace, linkImg, likes, cardID, userID, selectorsCard);
  gallery.prepend(card);
}

//Функция отрисовки карточек
const renderCards = (cards) => {
  cards.forEach(({name, link, likes, owner, _id}) => {
    addCard(name, link, likes, _id, owner._id, selectorsCard)
  });
}

//Функция для обработки отправки формы изменения профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  updateUser(inputName.value, inputPosition.value)
    .then( ({name, about}) => {
      nameUser.textContent = name;
      positionUser.textContent = about;
    })
    .catch((err) => {
      console.log(err);
    });

  closePopup(popupEdit);
}

//Функция для обработки отправки формы добавления новой карточки
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();

  postCards(inputPlace.value, inputImg.value)
    .then( ({name, link, likes, _id, owner}) => {
      addCard(name, link, likes, _id, owner._id, selectorsCard);
    })
    .catch((err) => {
      console.log(err);
    });

  closePopup(popupAdd);
}

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  updateAvatar(inputAvatarSrc.value)
    .then( ({avatar}) => {
      avatarUser.src = avatar;
    })
    .catch((err) => {
      console.log(err);
    });

  closePopup(popupEditAvatar);
}

//Обработка событий для модального окна изменения аватара пользователя
btnEditAvatar.addEventListener("click", openPopupEditAvatar);
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

//Обработка событий для модального окна редактирования профиля
btnEdit.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", handleProfileFormSubmit);

//Обработка событий для модального окна добавления карточки
btnAdd.addEventListener("click", openPopupAdd);
formAdd.addEventListener("submit", handleCardFormSubmit);

// Обработка событий закрытия модальных окон
popups.forEach(popup => {
  handleOverlayClick(popup);
})

//Обработка нажатия по кнопки закрытия модального окна
closeButtons.forEach((button) => {
  const popup = button.closest(".popup"); // С помощью closest возвращает ближайщий родительский элемент
  button.addEventListener("click", () => closePopup(popup));
});

// Включение валидации
enableValidation(selectorsForm);

//Получение данных о пользователе с сервера
getUser()
  .then(({name, about, avatar}) => {
    nameUser.textContent = name;
    positionUser.textContent = about;
    avatarUser.src = avatar;
  })
  .catch((err) => {
    console.log(err);
  });

  //Получение карточек с сервера
getCards()
  .then( cards => renderCards(cards))
  .catch((err) => {
    console.log(err);
  });
