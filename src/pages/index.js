import '../css/pages/index.css';
import {enableValidation, disablingButton, handleClearForm} from '../components/validate';
import { createCard  } from '../components/card';
import { openPopup, closePopup, handleOverlayClick } from '../components/popups';
import Api from '../components/Api';
import {selectorsForm, configApi, btnEdit, btnEditAvatar, nameUser, positionUser, avatarUser, popupEditAvatar, formEditAvatar, btnSubmitEditAvatar, inputAvatarSrc, popupEdit, formEdit, btnSubmitEdit, inputName, inputPosition, btnAdd, popupAdd, formAdd, btnSubmitAdd, inputPlace, inputImg, gallery, closeButtons, popups} from '../utils/constants';

const api = new Api(configApi);

let myID = '';

const renderLoading = (isLoading = false, typeBtnSubmit) => {
  const button = document.querySelector(`.popup__form-btn_type_${typeBtnSubmit}`);
  isLoading ? button.textContent = 'Сохранение...' : button.textContent = 'Сохранить';
}

//Функция открытия окна редактирования профиля
const openPopupEdit = () => {
  handleClearForm(popupEdit, selectorsForm);
  inputName.value = nameUser.textContent;
  inputPosition.value = positionUser.textContent;
  disablingButton(btnSubmitEdit, selectorsForm.inactiveButtonSelector);
  openPopup(popupEdit);
}

//Функция открытия окна изменения аватара
const openPopupEditAvatar = () => {
  handleClearForm(popupEditAvatar, selectorsForm);
  disablingButton(btnSubmitEditAvatar, selectorsForm.inactiveButtonSelector);
  openPopup(popupEditAvatar);
}

//Функция открытия окна добавления карточки
const openPopupAdd = () => {
  disablingButton(btnSubmitAdd, selectorsForm.inactiveButtonSelector);
  handleClearForm(popupAdd, selectorsForm);
  openPopup(popupAdd);
}

//Функция добавления новой карточки
const addCard = (namePlace, linkImg, likes, cardID, userID) => {
  const card = createCard(namePlace, linkImg, likes, cardID, userID, myID);
  gallery.prepend(card);
}

//Функция отрисовки карточек
const renderCards = (cards) => {
  cards.forEach(({name, link, likes, owner, _id}) => {
    addCard(name, link, likes, _id, owner._id)
  });
}

//Функция для обработки отправки формы изменения профиля
const handleProfileFormSubmit = async (evt) => {
  evt.preventDefault();
  renderLoading(true, 'edit');

  const user = await api.updateUser(inputName.value, inputPosition.value);
  const {name, about} = user.data;
  nameUser.textContent = name;
  positionUser.textContent = about;

  closePopup(popupEdit);
  renderLoading(false, 'edit');
}

//Функция для обработки отправки формы добавления новой карточки
const handleCardFormSubmit = async (evt) => {
  evt.preventDefault();

  renderLoading(true, 'add');
  const card = await api.postCards(inputPlace.value, inputImg.value);
  const {name, link, likes, _id, owner} = card.data;

  addCard(name, link, likes, _id, owner._id);
  closePopup(popupAdd);

  renderLoading(false, 'add');
}

//Функция для обработки отправки формы изменения аватара пользователя
const handleAvatarFormSubmit = async (evt) => {
  evt.preventDefault();

  renderLoading(true, 'avatar');
  const {data} = await api.updateAvatar(inputAvatarSrc.value);
  avatarUser.src = data.avatar;
  closePopup(popupEditAvatar);
  renderLoading(false, 'avatar')
}

//Обработка событий для модального окна изменения аватара пользователя
btnEditAvatar.addEventListener("click", openPopupEditAvatar);
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

//Обработка событий для модального окна редактирования профиля
btnEdit.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", handleProfileFormSubmit);

//Обработка событий для модального окна добавления карточки
btnAdd.addEventListener("click", openPopupAdd);
formAdd.addEventListener("submit", handleCardFormSubmit);

// Обработка событий закрытия модальных окон
popups.forEach(popup => {
  handleOverlayClick(popup);
})

//Обработка нажатия по кнопки закрытия модального окна
closeButtons.forEach((button) => {
  const popup = button.closest(".popup"); // С помощью closest возвращает ближайщий родительский элемент
  button.addEventListener("click", () => closePopup(popup));
});

// Включение валидации
enableValidation(selectorsForm);

//Получение карточек и данных о пользователе с сервера
const getData = async () => {
  const serverData = await Promise.all([api.getUser(), api.getCards()]);
  const {_id, name, about, avatar} = serverData[0].data;
  const cards = serverData[1].data;

  myID = _id;
  nameUser.textContent = name;
  positionUser.textContent = about;
  avatarUser.src = avatar;

  renderCards(cards.reverse())
}

getData();
