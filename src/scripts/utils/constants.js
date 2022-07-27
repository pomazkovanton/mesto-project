export const configApi = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-12",
  headers: {
    authorization: "625c1c0f-02ec-4f48-b7e0-8363adbe96f2",
    "Content-Type": "application/json",
  },
};

export const selectorsUserInfo = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__position",
  avatarSelector: ".profile__avatar",
};

export const selectorsCard = {
  templateSelector: "#card-template",
  cardSelector: ".gallery__item",
  imgSelector: ".gallery__img",
  titleSelector: ".gallery__item-title",
  btnLikeSelector: ".gallery__btn-like",
  btnLikeActiveSelector: "gallery__btn-like_active",
  btnDelSelector: ".gallery__btn-del",
  likeCounterSelector: ".gallery__like-counter",
};

export const selectorsPopupView = {
  popupSelector: '.popup_type_view',
  imageSelector: '.popup__figure-img',
  captionSelector: '.popup__figure-caption',
}

export const popupSelectors = {
  editAvatar: ".popup_type_avatar",
  editProfile: ".popup_type_edit",
  addCard: ".popup_type_add",
  alert: ".popup_type_alert",
}
