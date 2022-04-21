const btnEdit = document.querySelector(".profile__btn-edit");

const popupEdit = document.querySelector(".popup_type_edit");

const closeBtnEdit = popupEdit.querySelector(".popup__btn-close");

let nameUser = document.querySelector(".profile__name");
let positionUser = document.querySelector(".profile__position");

let inputName = popupEdit.querySelector(".popup__form-input_type_name");
let inputPosition = popupEdit.querySelector(".popup__form-input_type_position");

const formEdit = popupEdit.querySelector(".popup__form");

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

function closePopup(popup) {
  popup.classList.add("popup_hide");
}

function openPopupEdit() {
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
  popupEdit.classList.remove("popup_hide");
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();

  nameUser.textContent = inputName.value;
  positionUser.textContent = inputPosition.value;

  closePopup(popupEdit);
}

//Обработка событий для модального окна редактирования профиля
btnEdit.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", formEditSubmitHandler);
closeBtnEdit.addEventListener("click", () => closePopup(popupEdit));
