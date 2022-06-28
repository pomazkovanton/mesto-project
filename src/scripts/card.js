import { openPopup } from "./popup";

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

//Функция создания новой карточки
const createCard = (namePlace, linkImg, likes, deleteBtnClasses, {templateSelector, cardSelector, imgSelector, titleSelector, likeCounterSelector, btnDelSelector, ...popupSelectors}) => {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true);
  const galleryImg = cardElement.querySelector(imgSelector);
  const galleryTitle = cardElement.querySelector(titleSelector);
  const galleryLikeCounter = cardElement.querySelector(likeCounterSelector);
  const deleteBtn = cardElement.querySelector(btnDelSelector);

  deleteBtn.classList = deleteBtnClasses;
  galleryImg.src = linkImg;
  galleryImg.alt = namePlace;
  galleryTitle.textContent = namePlace;
  galleryLikeCounter.textContent = likes;

  imagePopupOpeningHandler(galleryImg, popupSelectors);

  return cardElement;
}

//Переключение лайков
const toggleLike = (button, {btnLikeActiveSelector}) => {
  button.classList.toggle(btnLikeActiveSelector.replace('.',''));
};

//Удаление карточки
const deleteCard = (button, {cardSelector}) => {
  button.closest(cardSelector).remove();
};

const handlerClickGallery  = (evt, { btnLikeSelector, btnDelSelector, ...selectors }) => {
  const button = evt.target;

  if (button.classList.contains(btnLikeSelector.replace('.',''))) {
    toggleLike(button, selectors);
  }

  if (button.classList.contains(btnDelSelector.replace('.',''))) {
    deleteCard(button, selectors);
  }
}

export  {createCard, handlerClickGallery}
