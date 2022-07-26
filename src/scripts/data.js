const selectorsForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__form-btn",
  inactiveButtonSelector: "popup__form-btn_inactive",
  inputErrorSelector: "popup__form-input_type_error",
  errorActiveSelector: "popup__form-error_active",
  errorSelector: ".popup__form-error",
};

const selectorsCard = {
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
};

export { selectorsForm, selectorsCard, configApi };
