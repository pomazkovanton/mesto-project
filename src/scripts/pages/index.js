import "../../css/pages/index.css";

import Api from "../components/Api";
import UserInfo from "../components/UserInfo";

import { configApi, selectorsUserInfo } from "../utils/constants";

// Создания экземпляра api
const api = new Api(configApi);
// Создания экземпляра пользователя
const user = new UserInfo(selectorsUserInfo);

const getData = async () => {
  const serverData = await Promise.all([api.getUser(), api.getCards()]);
  const userData = serverData[0].data;
  const cards = serverData[1].data;

  //Сохранение данных о пользователе
  user._id = userData._id;
  user.setUserInfo(userData);
  user.setUserAvatar(userData);
};

getData();
