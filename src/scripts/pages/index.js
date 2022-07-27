import "../../css/pages/index.css";

import Api from "../components/Api";
import UserInfo from "../components/UserInfo";
import Section from "../components/Section";
import Card from "../components/Card";

import {
  configApi,
  selectorsUserInfo,
  selectorsCard,
} from "../utils/constants";

// Создания экземпляра карточки и рендер новой карточки
const renderCard = (cardData) => {
  const card = new Card(cardData, user._id, selectorsCard, handleLikeCard, handleImageClick);
  return card.generate();
};

// Создания экземпляра api
const api = new Api(configApi);
// Создания экземпляра пользователя
const user = new UserInfo(selectorsUserInfo);
// Создания экземпляра Section для рендера карточек
const gallery = new Section(".gallery__list", renderCard);

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
  //Открытие  popup с изображением
}

getData();
