import { configApi } from "./data";
import axios from "axios";

//Получение данных о пользователе с сервера
const getUser = async () => {
  try {
    const res = await axios(`${configApi.baseUrl}/users/me`,{headers: configApi.headers});
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

//Получение карточек с сервера
const getCards = async () => {
  try {
    const res = await axios(`${configApi.baseUrl}/cards`, {headers: configApi.headers});
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

//Загрузка карточки на сервер
const postCards = async (name, link) => {
  try {
    const res = await axios(`${configApi.baseUrl}/cards`, {
      method: 'POST',
      data: {
        name: name,
        link: link
      },
      headers: configApi.headers
    });
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

// Обновление данных о пользователе на сервере
const updateUser = async (name, about) => {
  try {
    const res = await axios(`${configApi.baseUrl}/users/me`,{
      method: 'PATCH',
      data: {
        name: name,
        about: about
      },
      headers: configApi.headers
    })
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

// Смена аватара на сервере
const updateAvatar = async (avatar) => {
  try {
    const res = await axios(`${configApi.baseUrl}/users/me/avatar`,{
      method: 'PATCH',
      data: {
        avatar: avatar
      },
      headers: configApi.headers
    })
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

// Удаление карточки на сервере
const delCard = async (cardID) => {
  try {
    const res = await axios(`${configApi.baseUrl}/cards/${cardID} `,{
      method: 'DELETE',
      headers: configApi.headers
    })
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

// Добавление лайка
const putLike = async (cardID) => {
  try {
    const res = await axios(`${configApi.baseUrl}/cards/likes/${cardID}`,{
      method: 'PUT',
      headers: configApi.headers
    })
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

// Удаление лайка
const delLike = async (cardID) => {
  try {
    const res = await axios(`${configApi.baseUrl}/cards/likes/${cardID}`,{
      method: 'DELETE',
      headers: configApi.headers
    })
    return res;
  } catch (error) {
    console.error(error.response.status+": "+error.response.data.message);
  }
}

export {getCards, getUser, postCards, updateUser, delCard, putLike, delLike, updateAvatar}

