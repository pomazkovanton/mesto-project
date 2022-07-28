import "../../css/pages/index.css";

import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithAlert from "../components/PopupWithAlert";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";

import {
  configApi,
  selectorsUserInfo,
  selectorsCard,
  selectorsPopupView,
  popupSelectors,
  buttons,
  selectorsForm,
  forms,
  elementsPopupEdit,
} from "../utils/constants";
import { handleOpenPopup, handleErrors } from "../utils/utils";

//Обработчик добавления новой карточки
const handleAddCard = async (inputValues) => {
  popupAddCard.renderLoading(true, 'Создать', 'Создание..');
  try {
    const { data } = await api.postCards(inputValues);
    gallery.addItem(renderCard(data));
    popupAddCard.close();
  }
  catch (error)  {
    handleErrors(error, 'Невозможно добавить новую карточку');
  }
  finally {
    popupAddCard.renderLoading(false, 'Создать', 'Создание..');
  }
};

//Обработчик изменения информации о пользователе
const handleEditUser = async (inputValues) => {
  popupEditUser.renderLoading(true);
  try {
    const { data } = await api.updateUser(inputValues);
    user.setUserInfo(data);
    popupEditUser.close();
  }
  catch (error) {
    handleErrors(error, 'Невозможно изменить информацию о пользователе');
  }
  finally {
    popupEditUser.renderLoading(false);
  }
};

//Обработчик изменения аватара
const handleAddAvatar = async ({ avatar }) => {
  popupAddAvatar.renderLoading(true);
  try {
    const { data } = await api.updateAvatar(avatar);
    user.setUserAvatar(data);
    popupAddAvatar.close();
  }
  catch (error) {
    handleErrors(error, 'Невозможно обновить аватар пользователя');
  }
  finally {
    popupAddAvatar.renderLoading(false);
  }
};

//Обработчик удаления карточки
const handleClosingAlert = async (cardID) => {
  try {
    await api.delCard(cardID);
    popupAlert.card.deleteCard();
    popupAlert.close();
  }
  catch (error){
    handleErrors(error, 'Невозможно удалить карточку');
  }
};

// Создания экземпляра карточки и рендер новой карточки
const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    user._id,
    selectorsCard,
    handleLikeCard,
    handleImageClick,
    handleDeleteCard
  );
  return card.generate();
};

// Создания экземпляра api
const api = new Api(configApi);
// Создания экземпляра пользователя
const user = new UserInfo(selectorsUserInfo);
// Создания экземпляра Section для рендера карточек
const gallery = new Section(".gallery__list", renderCard);
// Создания экземпляров модальных окон
const popupView = new PopupWithImage(selectorsPopupView);
const popupAlert = new PopupWithAlert(popupSelectors.alert, handleClosingAlert);
const popupAddAvatar = new PopupWithForm(popupSelectors.editAvatar, handleAddAvatar);
const popupEditUser = new PopupWithForm(popupSelectors.editProfile, handleEditUser);
const popupAddCard = new PopupWithForm(popupSelectors.addCard, handleAddCard);

//Создание экземпляров форм для валидации
const formValidAvatar = new FormValidator(selectorsForm, forms.formEditAvatar);
const formValidProfile = new FormValidator(selectorsForm, forms.formEditProfile);
const formValidCard = new FormValidator(selectorsForm, forms.formAddCard);

//Запуск валидации форм
formValidAvatar.enableValidation();
formValidProfile.enableValidation();
formValidCard.enableValidation();

//Добавление слушателей событий на модальные окна
popupView.setEventListeners();
popupAlert.setEventListeners();
popupAddAvatar.setEventListeners();
popupEditUser.setEventListeners();
popupAddCard.setEventListeners();

const getData = async () => {
  try {
    const serverData = await Promise.all([api.getUser(), api.getCards()]);
    const userData = serverData[0].data;
    const cards = serverData[1].data;

    //Сохранение данных о пользователе
    user._id = userData._id;
    user.setUserInfo(userData);
    user.setUserAvatar(userData);

    //Рендер карточек на странице
    gallery.rendered(cards);
  }
  catch (error) {
    handleErrors(error, 'Не удалось получить данные с сервера');
  }

};

// Обработчик лайков
const handleLikeCard = async (card) => {
  try {
    const { data } = card.checkLike()
      ? await api.delLike(card._id)
      : await api.putLike(card._id);
    card.likes = data.likes;
    card.renderLike();
  }
  catch (error) {
    handleErrors(error, 'Не удалось изменить состояние лайка');
  }

};

// Обработчик клика по изображению карточки (открытие popup с изображением)
const handleImageClick = (name, url) => {
  popupView.open(name, url);
};

// Обработчик нажатия по кнопке удаления карточки (открытие popup с предупреждением)
const handleDeleteCard = (card) => {
  popupAlert.open();
  popupAlert.getIdCard(card);
};

//Обработчик открытия модального окна изменения профиля
const handleOpenPopupEditUser = () => {
  const { name, about } = user.getUserInfo();
  elementsPopupEdit.nameInput.value = name;
  elementsPopupEdit.aboutInput.value = about;
  handleOpenPopup(popupEditUser, formValidProfile);
};

//Обработчик кликов кнопок
buttons.btnEditAvatar.addEventListener("click", () => handleOpenPopup(popupAddAvatar, formValidAvatar));
buttons.btnEditUser.addEventListener("click", handleOpenPopupEditUser);
buttons.btnAddCard.addEventListener("click", () => handleOpenPopup(popupAddCard, formValidCard));

getData();
