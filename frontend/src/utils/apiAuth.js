export const BASE_URL = "http://localhost:3000";

const checkForErrors = (res) => {
  // проверить ответ на ошибки
  if (res.ok) {
    // проверить ответа
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклонить промис
  }
};

const returnHeadersData = () => {
  // вернуть данные для заголовка
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const request = (url, options) => {
  // вернуть результат проверки запроса (обработать результаты)
  return fetch(url, options).then(checkForErrors);
};

// запрос для регистрации в сервисе
// Коды ошибок: 400 - некорректно заполнено одно из полей
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: returnHeadersData(),
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => (res.ok ? res.json() : res.status));
};

// запрос для регистрации в сервисе
// Коды ошибок:
// 400 - не передано одно из полей
// 401 - пользователь с email не найден
export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: returnHeadersData(),
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  });
};

// запрос для проверки валидности токена и получения email для вставки в шапку сайта
// Коды ошибок:
// 400 — Токен не передан или передан не в том формате
export const checkToken = () => {
  const token = localStorage.getItem("jwt"); // личный токен
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
