import { openPopup } from "./popup";

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

export {renderCards, addCard}
