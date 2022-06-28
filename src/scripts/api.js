import { configApi } from "./data";

// Получениие данных о пользователе с сервера
const getUser = () => {
  return fetch(`${configApi.baseUrl}/users/me`,{
    headers: configApi.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//Получение карточек с сервера
const getCards = () => {
  return fetch(`${configApi.baseUrl}/cards`,{
    headers: configApi.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
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
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export {getCards, getUser, postCards, updateUser}

