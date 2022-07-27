import "../../css/pages/index.css";

import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Card from "../components/Card";
import PopupWithImage from '../components/PopupWithImage';
import PopupWithAlert from '../components/PopupWithAlert';

import {
  configApi,
  selectorsUserInfo,
  selectorsCard,
  selectorsPopupView,
  popupSelectors
} from "../utils/constants";

//Обработчик удаления карточки
const handleClosingAlert = async (cardID) => {
  await api.delCard(cardID);
  popupAlert.card.deleteCard();
  popupAlert.close();
}

// Создания экземпляра карточки и рендер новой карточки
const renderCard = (cardData) => {
  const card = new Card(cardData, user._id, selectorsCard, handleLikeCard, handleImageClick, handleDeleteCard);
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

//Добавление слушателей событий на модальные окна
popupView.setEventListeners();
popupAlert.setEventListeners();

const getData = async () => {
  const serverData = await Promise.all([api.getUser(), api.getCards()]);
  const userData = serverData[0].data;
  const cards = serverData[1].data;

  //Сохранение данных о пользователе
  user._id = userData._id;
  user.setUserInfo(userData);
  user.setUserAvatar(userData);

  //Рендер карточек на странице
  gallery.rendered(cards);
};

// Обработчик лайков
const handleLikeCard = async (card) => {
  const {data} = card.checkLike()
    ? await api.delLike(card._id)
    : await api.putLike(card._id)
  card.likes = data.likes;
  card.renderLike();
}

// Обработчик клика по изображению карточки (открытие popup с изображением)
const handleImageClick = (name, url) => {
  popupView.open(name, url)
}

// Обработчик нажатия по кнопке удаления карточки (открытие popup с предупреждением)
const handleDeleteCard = (card) => {
  popupAlert.open();
  popupAlert.getIdCard(card);
}

getData();
