import { openPopup, closePopup } from "./popup";
import {delCard, putLike, delLike} from './api';
import {selectorsCard} from './data';

const cardTemplate = document.querySelector(selectorsCard.templateSelector).content;
const popupView = document.querySelector(selectorsCard.popupSelector);
const popupAlert = document.querySelector('.popup_type_alert');
const btnAlert = popupAlert.querySelector('.popup__form-btn_type_alert');
const popupViewImg = popupView.querySelector(selectorsCard.popupImgSelector);
const popupViewCaption = popupView.querySelector(selectorsCard.popupCaptionSelector);

// Обработка открытия модального окна с изображением
const imagePopupOpeningHandler = (galleryImg) => {

  galleryImg.addEventListener('click', () => {
    popupViewImg.src = galleryImg.src;
    popupViewImg.alt = galleryImg.alt;
    popupViewCaption.textContent = galleryImg.alt;

    openPopup(popupView);
  });
};

//Обработчик добавления лайков
const handlerAddingLikes = (card, like, activeClass, counter) => {
  putLike(card)
    .then(data => {
      like.classList.add(activeClass);
      counter.textContent = data.likes.length;
    })
    .catch(err => console.log(err));
}

//Обработчик удаления лайков
const handlerDeleteLikes = (card, like, activeClass, counter) => {
  delLike(card)
    .then(data => {
      like.classList.remove(activeClass);
      counter.textContent = data.likes.length;
    })
    .catch(err => console.log(err));
}

//Обработчик удаления карточки
const handlerDeleteCard = (cardId) => {
  const card = document.querySelector(`.gallery__item[data-id="${cardId}"]`);
  delCard(cardId)
    .then( () => {
      card.remove();
      closePopup(popupAlert);
    })
    .catch(err => console.log(err))
    .finally( () => popupAlert.dataset.id = '');
}

//Функция создания новой карточки
const createCard = (namePlace, linkImg, likes, cardID, userID, myID) => {
  const cardElement = cardTemplate.querySelector(selectorsCard.cardSelector).cloneNode(true);
  const galleryImg = cardElement.querySelector(selectorsCard.imgSelector);
  const galleryTitle = cardElement.querySelector(selectorsCard.titleSelector);
  const galleryLikeCounter = cardElement.querySelector(selectorsCard.likeCounterSelector);
  const deleteBtn = cardElement.querySelector(selectorsCard.btnDelSelector);
  const likeBtn = cardElement.querySelector(selectorsCard.btnLikeSelector);
  const isLike = likes.find(like => like._id === myID) === undefined ? false : true;

  if (userID !== myID) {
    deleteBtn.remove();
  }

  if (isLike) {
    likeBtn.classList.add(selectorsCard.btnLikeActiveSelector)
  }

  galleryImg.src = linkImg;
  galleryImg.alt = namePlace;
  galleryTitle.textContent = namePlace;
  galleryLikeCounter.textContent = likes.length;
  cardElement.dataset.id = cardID;

  imagePopupOpeningHandler(galleryImg);

  // Общий обработчик лайков
  likeBtn.addEventListener('click', () => {
    if (!likeBtn.classList.contains(selectorsCard.btnLikeActiveSelector)) {
      handlerAddingLikes(cardID, likeBtn, selectorsCard.btnLikeActiveSelector, galleryLikeCounter);
    } else {
      handlerDeleteLikes(cardID, likeBtn, selectorsCard.btnLikeActiveSelector, galleryLikeCounter);
    }
  })

  // Обработчик удаления карточки
  deleteBtn.addEventListener('click', () => {
    openPopup(popupAlert);
    popupAlert.dataset.id = cardID;
  })

  return cardElement;
}

btnAlert.addEventListener('click', () => {
  const id = popupAlert.dataset.id;
  handlerDeleteCard(id);
});

export  {createCard }
