import { configApi } from "./data";

export const getUser = () => {
  return fetch(`${configApi.baseUrl}/users/me`,{
    headers: configApi.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
