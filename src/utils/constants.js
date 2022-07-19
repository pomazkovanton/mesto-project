export const configApi = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '625c1c0f-02ec-4f48-b7e0-8363adbe96f2',
    'Content-Type': 'application/json'
  }
}

export const selectorsForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonSelector: 'popup__form-btn_inactive',
  inputErrorSelector: 'popup__form-input_type_error',
  errorActiveSelector: 'popup__form-error_active',
  errorSelector: '.popup__form-error'
}

export const selectorsCard = {
  templateSelector: "#card-template",
  cardSelector: ".gallery__item",
  imgSelector: ".gallery__img",
  titleSelector: ".gallery__item-title",
  popupSelector: ".popup_type_view",
  popupImgSelector: ".popup__figure-img",
  popupCaptionSelector: ".popup__figure-caption",
  btnLikeSelector: ".gallery__btn-like",
  btnLikeActiveSelector: "gallery__btn-like_active",
  btnDelSelector: ".gallery__btn-del",
  likeCounterSelector: ".gallery__like-counter",
}

// Переменные профиля пользователя
export const btnEdit = document.querySelector(".profile__btn-edit");
export const btnEditAvatar = document.querySelector(".profile__edit-avatar");
export const nameUser = document.querySelector(".profile__name");
export const positionUser = document.querySelector(".profile__position");
export const avatarUser = document.querySelector(".profile__avatar");

// Переменные модального окна изменения аватара пользователя
export const popupEditAvatar = document.querySelector(".popup_type_avatar");
export const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
export const btnSubmitEditAvatar = formEditAvatar.querySelector(selectorsForm.submitButtonSelector);
export const inputAvatarSrc = formEditAvatar.querySelector(".popup__form-input_type_avatar");

// Переменные модального окна изменения профиля
export const popupEdit = document.querySelector(".popup_type_edit");
export const formEdit = popupEdit.querySelector(".popup__form");
export const btnSubmitEdit = formEdit.querySelector(selectorsForm.submitButtonSelector);
export const inputName = popupEdit.querySelector(".popup__form-input_type_name");
export const inputPosition = popupEdit.querySelector(".popup__form-input_type_position");

// Кнопка открытия модального окна добавления новой карточки
export const btnAdd = document.querySelector(".profile__btn-add");

// Переменные модального окна добавления новой карточки
export const popupAdd = document.querySelector(".popup_type_add");
export const formAdd = popupAdd.querySelector(".popup__form");
export const btnSubmitAdd = formAdd.querySelector(selectorsForm.submitButtonSelector);
export const inputPlace = popupAdd.querySelector(".popup__form-input_type_place");
export const inputImg = popupAdd.querySelector(".popup__form-input_type_img");

// Переменные галереи
export const gallery = document.querySelector('.gallery__list');

// Переменные модальных окон
export const closeButtons = document.querySelectorAll(".popup__btn-close");
export const popups = document.querySelectorAll(".popup");

//Переменные элементов модуля с карточками
export const cardTemplate = document.querySelector(selectorsCard.templateSelector).content;
export const popupView = document.querySelector(selectorsCard.popupSelector);
export const popupAlert = document.querySelector('.popup_type_alert');
export const btnAlert = popupAlert.querySelector('.popup__form-btn_type_alert');
export const popupViewImg = popupView.querySelector(selectorsCard.popupImgSelector);
export const popupViewCaption = popupView.querySelector(selectorsCard.popupCaptionSelector);
