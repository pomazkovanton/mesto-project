import '../css/pages/index.css';
import enableValidation from './validate';

const btnEdit = document.querySelector(".profile__btn-edit");
const btnAdd = document.querySelector(".profile__btn-add");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupView = document.querySelector(".popup_type_view");

const closeButtons = document.querySelectorAll(".popup__btn-close");

const nameUser = document.querySelector(".profile__name");
const positionUser = document.querySelector(".profile__position");
const popupViewImg = popupView.querySelector(".popup__figure-img");
const popupViewCaption = popupView.querySelector(".popup__figure-caption");

const inputName = popupEdit.querySelector(".popup__form-input_type_name");
const inputPosition = popupEdit.querySelector(
  ".popup__form-input_type_position"
);
const inputPlace = popupAdd.querySelector(".popup__form-input_type_place");
const inputImg = popupAdd.querySelector(".popup__form-input_type_img");

const formEdit = popupEdit.querySelector(".popup__form");
const formAdd = popupAdd.querySelector(".popup__form");

const cardsContainer = document.querySelector(".gallery__list");

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

//Функция открытия модального окна
function openPopup(popup) {
  document.addEventListener('keydown', handleEscUp);
  popup.classList.add("popup_opened");
}

//Функция закрытия модального окна
function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  popup.classList.remove("popup_opened");
  handleCloseForm(popup);
}

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

//Функция создания новой карточки
function createCard(namePlace, linkImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".gallery__item").cloneNode(true);
  const galleryImg = cardElement.querySelector(".gallery__img");
  const galleryTitle = cardElement.querySelector(".gallery__item-title");
  const likeBtn = cardElement.querySelector(".gallery__btn-like");
  const deleteBtn = cardElement.querySelector(".gallery__btn-del");

  galleryImg.src = linkImg;
  galleryImg.alt = namePlace;
  galleryTitle.textContent = namePlace;

  //Переключатель лайков
  likeBtn.addEventListener("click", handleCardLike);
  //Удаление карточки
  deleteBtn.addEventListener("click", handleDeleteCard);
  //Открытие модального окна с увеличенным изображением
  imagePopupOpeningHandler(galleryImg);

  return cardElement;
}

//Обработка переключателя лайков
const handleCardLike = (evt) => {
  evt.target.classList.toggle("gallery__btn-like_active");
};

//Обработка удаление карточки
const handleDeleteCard = (evt) => {
  evt.target.closest('.gallery__item').remove();
};

// Обработка открытия модального окна с изображением
const imagePopupOpeningHandler = (galleryImg) => {
  galleryImg.addEventListener('click', () => {
    popupViewImg.src = galleryImg.src;
    popupViewImg.alt = galleryImg.alt;
    popupViewCaption.textContent = galleryImg.alt;

    openPopup(popupView);
  });
};

//Функция добавления новой карточки
function addCard(namePlace, linkImg) {
  const card = createCard(namePlace, linkImg);
  cardsContainer.prepend(card);
}

//Функция отрисовки карточек
function renderCards() {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

//Функция для обработки отправки формы добавления новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(inputPlace.value, inputImg.value);
  closePopup(popupAdd);
  evt.target.reset();
}

//Обработка событий для модального окна редактирования профиля
btnEdit.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", handleProfileFormSubmit);

//Обработка событий для модального окна добавления карточки
btnAdd.addEventListener("click", () => openPopup(popupAdd));
formAdd.addEventListener("submit", handleCardFormSubmit);

//Обработка событий закрытия модальных окон
closeButtons.forEach((button) => {
  const popup = button.closest(".popup"); // С помощью closest возвращает ближайщий родительский элемент
  button.addEventListener("click", () => closePopup(popup));
});

const handleCloseForm = (popup) => {
  const form = popup.querySelectorAll('.popup__form')[0];

  if (form) {
    resetForm(form);
    resetInputError(form);
  }
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

popups.forEach(popup => {
  handleOverlayClick(popup);
})


renderCards();
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonClass: 'popup__form-btn_inactive',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-error_active'
});

