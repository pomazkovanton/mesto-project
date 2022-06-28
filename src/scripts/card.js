import { openPopup } from "./popup";
import {delCard, putLike, delLike} from './api';
import {configApi} from './data';

// Обработка открытия модального окна с изображением
const imagePopupOpeningHandler = (galleryImg, {popupSelector, popupImgSelector, popupCaptionSelector}) => {
  const popupView = document.querySelector(popupSelector);
  const popupViewImg = popupView.querySelector(popupImgSelector);
  const popupViewCaption = popupView.querySelector(popupCaptionSelector);

  galleryImg.addEventListener('click', () => {
    popupViewImg.src = galleryImg.src;
    popupViewImg.alt = galleryImg.alt;
    popupViewCaption.textContent = galleryImg.alt;

    openPopup(popupView);
  });
};

//Обработчик добавления лайков
const handlerAddingLikes = (card, like, activeClass, counter) => {
  like.classList.add(activeClass);
  putLike(card)
    .then(data => counter.textContent = data.likes.length )
    .catch(err => console.log(err));
}

//Обработчик удаления лайков
const handlerDeleteLikes = (card, like, activeClass, counter) => {
  like.classList.remove(activeClass);
  delLike(card)
    .then(data => counter.textContent = data.likes.length )
    .catch(err => console.log(err));
}

//Функция создания новой карточки
const createCard = (namePlace, linkImg, likes, cardID, userID, {templateSelector, cardSelector, imgSelector, titleSelector, likeCounterSelector, btnDelSelector, btnLikeSelector, btnLikeActiveSelector, ...popupSelectors}) => {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true);
  const galleryImg = cardElement.querySelector(imgSelector);
  const galleryTitle = cardElement.querySelector(titleSelector);
  const galleryLikeCounter = cardElement.querySelector(likeCounterSelector);
  const deleteBtn = cardElement.querySelector(btnDelSelector);
  const likeBtn = cardElement.querySelector(btnLikeSelector);
  const isLike = likes.find(like => like._id === configApi.userID) === undefined ? false : true;

  if (userID !== configApi.userID) {
    deleteBtn.remove();
  }

  if (isLike) {
    likeBtn.classList.add(btnLikeActiveSelector)
  }

  galleryImg.src = linkImg;
  galleryImg.alt = namePlace;
  galleryTitle.textContent = namePlace;
  galleryLikeCounter.textContent = likes.length ;

  imagePopupOpeningHandler(galleryImg, popupSelectors);

  // Общий обработчик лайков
  likeBtn.addEventListener('click', () => {
    if (!likeBtn.classList.contains(btnLikeActiveSelector)) {
      handlerAddingLikes(cardID, likeBtn, btnLikeActiveSelector, galleryLikeCounter);
    } else {
      handlerDeleteLikes(cardID, likeBtn, btnLikeActiveSelector, galleryLikeCounter);
    }
  })

  // Обработчик удаления карточки
  deleteBtn.addEventListener('click', () => {
    delCard(cardID).catch(err => console.log(err));
    cardElement.remove();
  })

  return cardElement;
}

export  {createCard }
