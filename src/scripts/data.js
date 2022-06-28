const selectorsForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-btn',
  inactiveButtonSelector: 'popup__form-btn_inactive',
  inputErrorSelector: 'popup__form-input_type_error',
  errorActiveSelector: 'popup__form-error_active',
  errorSelector: '.popup__form-error'
}

const selectorsCard = {
  templateSelector: "#card-template",
  cardSelector: ".gallery__item",
  imgSelector: ".gallery__img",
  titleSelector: ".gallery__item-title",
  popupSelector: ".popup_type_view",
  popupImgSelector: ".popup__figure-img",
  popupCaptionSelector: ".popup__figure-caption",
  btnLikeSelector: ".gallery__btn-like",
  btnLikeActiveSelector: ".gallery__btn-like_active",
  btnDelSelector: ".gallery__btn-del",
  likeCounterSelector: ".gallery__like-counter",
  btnDelShowClasses: "gallery__btn-del gallery__btn-del_show",
  btnDelHideClasses: "gallery__btn-del",
}

const configApi = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: '625c1c0f-02ec-4f48-b7e0-8363adbe96f2',
    'Content-Type': 'application/json'
  }
}

export { selectorsForm, selectorsCard, configApi}
