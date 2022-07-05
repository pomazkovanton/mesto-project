import { configApi } from "./data";

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Получениие данных о пользователе с сервера
const getUser = () => {
  return fetch(`${configApi.baseUrl}/users/me`,{
    headers: configApi.headers
  })
  .then(res => getResponseData(res));
}

//Получение карточек с сервера
const getCards = () => {
  return fetch(`${configApi.baseUrl}/cards`,{
    headers: configApi.headers
  })
  .then(res => getResponseData(res));
}

//Загрузка карточки на сервер
const postCards = (name, link) => {
  return fetch(`${configApi.baseUrl}/cards`,{
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    }),
    headers: configApi.headers
  })
  .then(res => getResponseData(res));
}

// Обновление данных о пользователе на сервере
const updateUser = (name, about) => {
  return fetch(`${configApi.baseUrl}/users/me`,{
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about
    }),
    headers: configApi.headers
  })
  .then(res => getResponseData(res));
}

// Смена аватара на сервере
const updateAvatar = (avatar) => {
  return fetch(`${configApi.baseUrl}/users/me/avatar`,{
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatar
    }),
    headers: configApi.headers
  })
  .then(res => getResponseData(res));
}

// Удаление карточки на сервере
const delCard = (cardID) => {
  return fetch(`${configApi.baseUrl}/cards/${cardID} `,{
    method: 'DELETE',
    headers: configApi.headers
  })
  .then(res => getResponseData(res));
}

// Добавление лайка
const putLike = (cardID) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${cardID}`,{
    method: 'PUT',
    headers: configApi.headers
  })
  .then(res => getResponseData(res));
}

// Удаление лайка
const delLike = (cardID) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${cardID}`,{
    method: 'DELETE',
    headers: configApi.headers
  })
  .then(res => getResponseData(res));
}

export {getCards, getUser, postCards, updateUser, delCard, putLike, delLike, updateAvatar}

