const btnEdit = document.querySelector(".profile__btn-edit");
const btnAdd = document.querySelector(".profile__btn-add");

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

//Функция закрытия/открытия модальных окон
function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

//Функция открытия окна редактирования профиля
function openPopupEdit() {
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
  togglePopup(popupEdit);
}

//Функция для обработки отправки формы изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  nameUser.textContent = inputName.value;
  positionUser.textContent = inputPosition.value;

  togglePopup(popupEdit);
}

//Функция создания новой карточки
function createCard(namePlace, linkImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);
  const galleryImg = cardElement.querySelector(".gallery__img");
  const galleryTitle = cardElement.querySelector(".gallery__item-title");

  galleryImg.src = linkImg;
  galleryImg.alt = namePlace;
  galleryTitle.textContent = namePlace;

  //Обработка лайков
  cardElement
    .querySelector(".gallery__btn-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__btn-like_active");
    });

  //Удаление карточки
  cardElement
    .querySelector(".gallery__btn-del")
    .addEventListener("click", function () {
      cardElement.remove();
    });

  //Открытие модального окна с изображением
  galleryImg.addEventListener("click", function (evt) {
    popupViewImg.src = evt.target.src;
    popupViewImg.alt = evt.target.alt;
    popupViewCaption.textContent = evt.target.alt;
    togglePopup(popupView);
  });

  return cardElement;
}

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
  togglePopup(popupAdd);
  evt.target.reset();
}

//Обработка событий для модального окна редактирования профиля
btnEdit.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", handleProfileFormSubmit);

//Обработка событий для модального окна добавления карточки
btnAdd.addEventListener("click", () => togglePopup(popupAdd));
formAdd.addEventListener("submit", handleCardFormSubmit);

//Обработка событий закрытия модальных окон
closeButtons.forEach((button) => {
  const popup = button.closest(".popup"); // С помощью closest возвращает ближайщий родительский элемент
  button.addEventListener("click", () => togglePopup(popup));
});

renderCards();
