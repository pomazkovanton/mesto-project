const btnEdit = document.querySelector(".profile__btn-edit");
const btnAdd = document.querySelector(".profile__btn-add");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");

const closeBtnEdit = popupEdit.querySelector(".popup__btn-close");
const closeBtnAdd = popupAdd.querySelector(".popup__btn-close");

let nameUser = document.querySelector(".profile__name");
let positionUser = document.querySelector(".profile__position");

let inputName = popupEdit.querySelector(".popup__form-input_type_name");
let inputPosition = popupEdit.querySelector(".popup__form-input_type_position");
let inputPlace = popupAdd.querySelector(".popup__form-input_type_place");
let inputImg = popupAdd.querySelector(".popup__form-input_type_img");

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

//Функция закрытия модальных окон
function closePopup(popup) {
  popup.classList.add("popup_hide");
}

//Функция открытия модальных окон
function openPopup(popup) {
  popup.classList.remove("popup_hide");
}

//Функция открытия окна редактирования профиля
function openPopupEdit() {
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
  popupEdit.classList.remove("popup_hide");
}

//Функция для обработки отправки формы изменения профиля
function formEditSubmitHandler(evt) {
  evt.preventDefault();

  nameUser.textContent = inputName.value;
  positionUser.textContent = inputPosition.value;

  closePopup(popupEdit);
}

//Функция добавления новой карточки
function addCard(namePlace, linkImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__item")
    .cloneNode(true);

  cardElement.querySelector(".gallery__img").src = linkImg;
  cardElement.querySelector(".gallery__img").alt = namePlace;
  cardElement.querySelector(".gallery__item-title").textContent = namePlace;

  //Обработка лайков
  cardElement
    .querySelector(".gallery__btn-like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__btn-like_active");
    });

  //Удаление карточки
  cardElement
    .querySelector(".gallery__btn-del")
    .addEventListener("click", function (evt) {
      evt.target.parentElement.remove();
    });

  cardsContainer.append(cardElement);
}

//Функция первоначальной загрузки карточек
function loadingCards() {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

//Функция для обработки отправки формы добавления новой карточки
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  addCard(inputPlace.value, inputImg.value);
  closePopup(popupAdd);
  inputPlace.value = "";
  inputImg.value = "";
}

//Обработка событий для модального окна редактирования профиля
btnEdit.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", formEditSubmitHandler);
closeBtnEdit.addEventListener("click", () => closePopup(popupEdit));

//Обработка событий для модального окна добавления карточки
btnAdd.addEventListener("click", () => openPopup(popupAdd));
closeBtnAdd.addEventListener("click", () => closePopup(popupAdd));
formAdd.addEventListener("submit", formAddSubmitHandler);

loadingCards();
