import { configApi } from "./data";
import axios from "axios";

//Универсальный обработчик запроса на сервер
const handleRequest = async (url, method, data={}, headers=configApi.headers) => {
  try {
    const res = await axios(`${configApi.baseUrl}${url}`, {
      method: method,
      data: data,
      headers: headers
    });
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

//Получение данных о пользователе с сервера
const getUser = () => {
  return handleRequest('/users/me', 'GET');
}

//Получение карточек с сервера
const getCards = () => {
  return handleRequest('/cards', 'GET');
}

//Загрузка карточки на сервер
const postCards = (name, link) => {
  return handleRequest('/cards', 'POST', {name: name, link: link});
}

// Обновление данных о пользователе на сервере
const updateUser = (name, about) => {
  return handleRequest('/users/me', 'PATCH', {name: name, about: about});
}

// Смена аватара на сервере
const updateAvatar = (avatar) => {
  return handleRequest('/users/me/avatar', 'PATCH', {avatar: avatar});
}

// Удаление карточки на сервере
const delCard = (cardID) => {
  return handleRequest(`/cards/${cardID}`, 'DELETE');
}

// Добавление лайка
const putLike = (cardID) => {
  return handleRequest(`/cards/likes/${cardID}`, 'PUT');
}

// Удаление лайка
const delLike = (cardID) => {
  return handleRequest(`/cards/likes/${cardID}`, 'DELETE');
}

export {getCards, getUser, postCards, updateUser, delCard, putLike, delLike, updateAvatar}

