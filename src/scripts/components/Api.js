import axios from "axios";

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //Универсальный обработчик запроса на сервер
  async _handleRequest(url, method, data = {}, headers = this._headers) {
    const res = await axios(`${this._baseUrl}${url}`, {
      method: method,
      data: data,
      headers: headers,
    });
    return res;
   }

  //Получение данных о пользователе с сервера
  getUser() {
    return this._handleRequest("/users/me", "GET");
  }

  //Получение карточек с сервера
  getCards() {
    return this._handleRequest("/cards", "GET");
  }

  //Загрузка карточки на сервер
  postCards({ name, link }) {
    return this._handleRequest("/cards", "POST", { name: name, link: link });
  }

  // Обновление данных о пользователе на сервере
  updateUser({ name, about }) {
    return this._handleRequest("/users/me", "PATCH", {
      name: name,
      about: about,
    });
  }

  // Смена аватара на сервере
  updateAvatar(avatar) {
    return this._handleRequest("/users/me/avatar", "PATCH", { avatar: avatar });
  }

  // Удаление карточки на сервере
  delCard(cardID) {
    return this._handleRequest(`/cards/${cardID}`, "DELETE");
  }

  // Добавление лайка
  putLike(cardID) {
    return this._handleRequest(`/cards/likes/${cardID}`, "PUT");
  }

  // Удаление лайка
  delLike(cardID) {
    return this._handleRequest(`/cards/likes/${cardID}`, "DELETE");
  }
}
