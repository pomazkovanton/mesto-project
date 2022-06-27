import { configApi } from "./data";

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

export {getCards, getUser, postCards}
