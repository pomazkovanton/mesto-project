import { configApi } from "./data";

// Обработка ответа с сервера
const getResponseData = async (res) => {
  if (!res.ok) {
    const message = `Ошибка: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }
  const json = await res.json();
  return json;
}

//Получение данных о пользователе с сервера
const getUser = async () => {
  const res = await fetch(`${configApi.baseUrl}/users/me`,{headers: configApi.headers});
  return getResponseData(res);
}

//Получение карточек с сервера
const getCards = async () => {
  const res = await fetch(`${configApi.baseUrl}/cards`, {headers: configApi.headers});
  return getResponseData(res);
}

//Загрузка карточки на сервер
const postCards = async (name, link) => {
  const res = await fetch(`${configApi.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    }),
    headers: configApi.headers
  });
  return getResponseData(res);
}

// Обновление данных о пользователе на сервере
const updateUser = async (name, about) => {
  const res = await fetch(`${configApi.baseUrl}/users/me`,{
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about
    }),
    headers: configApi.headers
  })
  return getResponseData(res);
}

// Смена аватара на сервере
const updateAvatar = async (avatar) => {
  const res = await fetch(`${configApi.baseUrl}/users/me/avatar`,{
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatar
    }),
    headers: configApi.headers
  })
  return getResponseData(res);
}

// Удаление карточки на сервере
const delCard = async (cardID) => {
  const res = await fetch(`${configApi.baseUrl}/cards/${cardID} `,{
    method: 'DELETE',
    headers: configApi.headers
  })
  return getResponseData(res);
}

// Добавление лайка
const putLike = async (cardID) => {
  const res = await fetch(`${configApi.baseUrl}/cards/likes/${cardID}`,{
    method: 'PUT',
    headers: configApi.headers
  })
  return getResponseData(res);
}

// Удаление лайка
const delLike = async (cardID) => {
  const res = await fetch(`${configApi.baseUrl}/cards/likes/${cardID}`,{
    method: 'DELETE',
    headers: configApi.headers
  })
  return getResponseData(res);
}

export {getCards, getUser, postCards, updateUser, delCard, putLike, delLike, updateAvatar}

