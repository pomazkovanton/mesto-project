import axios from "axios";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Универсальный обработчик запроса на сервер
  async handleRequest(url, method, data = {}, headers = this._headers) {
    try {
      const res = await axios(`${this._baseUrl}${url}`, {
        method: method,
        data: data,
        headers: headers,
      });
      return res;
    } catch (error) {
      console.error(error.response.status + ": " + error.response.data.message);
    }
  }

  //Получение данных о пользователе с сервера
  getUser() {
    return handleRequest("/users/me", "GET");
  }

  //Получение карточек с сервера
  getCards() {
    return handleRequest("/cards", "GET");
  }

  //Загрузка карточки на сервер
  postCards({ name, link }) {
    return handleRequest("/cards", "POST", { name: name, link: link });
  }

  // Обновление данных о пользователе на сервере
  updateUser({ name, about }) {
    return handleRequest("/users/me", "PATCH", { name: name, about: about });
  }

  // Смена аватара на сервере
  updateAvatar(avatar) {
    return handleRequest("/users/me/avatar", "PATCH", { avatar: avatar });
  }

  // Удаление карточки на сервере
  delCard(cardID) {
    return handleRequest(`/cards/${cardID}`, "DELETE");
  }

  // Добавление лайка
  putLike(cardID) {
    return handleRequest(`/cards/likes/${cardID}`, "PUT");
  }

  // Удаление лайка
  delLike(cardID) {
    return handleRequest(`/cards/likes/${cardID}`, "DELETE");
  }
}
