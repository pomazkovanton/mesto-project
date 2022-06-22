import { openPopup } from "./popup";

const gallary = document.querySelector('.gallery__list');

//Переключение лайков
const toggleLike = (like) => {
  like.classList.toggle("gallery__btn-like_active");
};

//Удаление карточки
const deleteCard = (button) => {
  button.closest('.gallery__item').remove();
};

// Обработка открытия модального окна с изображением
const imagePopupOpeningHandler = (galleryImg) => {
  const popupView = document.querySelector(".popup_type_view");
  const popupViewImg = popupView.querySelector(".popup__figure-img");
  const popupViewCaption = popupView.querySelector(".popup__figure-caption");

  galleryImg.addEventListener('click', () => {
    popupViewImg.src = galleryImg.src;
    popupViewImg.alt = galleryImg.alt;
    popupViewCaption.textContent = galleryImg.alt;

    openPopup(popupView);
  });
};

//Функция создания новой карточки
function createCard(namePlace, linkImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".gallery__item").cloneNode(true);
  const galleryImg = cardElement.querySelector(".gallery__img");
  const galleryTitle = cardElement.querySelector(".gallery__item-title");

  galleryImg.src = linkImg;
  galleryImg.alt = namePlace;
  galleryTitle.textContent = namePlace;

  imagePopupOpeningHandler(galleryImg);

  return cardElement;
}

//Функция добавления новой карточки
function addCard(namePlace, linkImg) {
  const cardsContainer = document.querySelector(".gallery__list");
  const card = createCard(namePlace, linkImg);

  cardsContainer.prepend(card);
}

//Функция отрисовки карточек
function renderCards(initialCards) {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

// Обработчик кликов галлерии картинок (лайки и удаление карточек)
gallary.addEventListener('click', (evt) => {
  const button = evt.target;

  if (button.classList.contains('gallery__btn-like')) {
    toggleLike(button);
  }

  if (button.classList.contains('gallery__btn-del')) {
    deleteCard(button);
  }
});

export {renderCards, addCard}
