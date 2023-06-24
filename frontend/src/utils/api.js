import { dataApi } from "../utils/utils.js";

class Api {
  // класс Api, который загружает данные с сервера

  // конструктор принимает: baseUrl и headers (authorization, 'Content-Type')
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl; // адрес сервера и идентификатор группы
    this._type = headers["Content-Type"]; // 'Content-Type'
    this._personalURL = `${baseUrl}/users/me`;
    this._personalAvatarURL = `${baseUrl}/users/me/avatar`;
    this._cardsURL = `${baseUrl}/cards`;
    this._personalID = null;
  }

  // приватные методы
  _checkForErrors(res) {
    // проверить ответ на ошибки

    if (res.ok) {
      // проверить ответа
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклонить промис
    }
  }

  _returnHeadersGET() {
    // вернуть данные для заголовка GET-запроса
    const token = localStorage.getItem("jwt"); // личный токен
    return {
      headers: {
        authorization: token,
      },
    };
  }

  _returnHeadersDELETE() {
    // вернуть данные для заголовка DELETE-запроса
    const token = localStorage.getItem("jwt"); // личный токен
    return {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    };
  }

  _returnHeadersData() {
    // вернуть данные для заголовка
    const token = localStorage.getItem("jwt"); // личный токен
    return {
      authorization: token,
      "Content-Type": this._type,
    };
  }

  _request(url, options) {
    // вернуть результат проверки запроса (обработать результаты)
    return fetch(url, options).then(this._checkForErrors);
  }

  // публичные методы
  getInitialCards() {
    // загрузить карточки с сервера
    return this._request(this._cardsURL, this._returnHeadersGET());
  }

  getProfileInfo() {
    // загрузить информацию о пользователе с сервера
    return this._request(this._personalURL, this._returnHeadersGET());
  }

  editProfileInfo(name, about) {
    // редактировать профиль
    return this._request(this._personalURL, {
      method: "PATCH",
      headers: this._returnHeadersData(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editProfileAvatar(avatar) {
    // редактировать аватар профиля
    return this._request(this._personalAvatarURL, {
      method: "PATCH",
      headers: this._returnHeadersData(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  addCard(name, link) {
    // добавить новую карточку
    return this._request(this._cardsURL, {
      method: "POST",
      headers: this._returnHeadersData(),
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    // удалить карточку
    return this._request(
      `${this._cardsURL}/${id}`,
      this._returnHeadersDELETE()
    );
  }

  updateAddStatusLike(id) {
    // лайкнуть карточку
    const token = localStorage.getItem("jwt"); // личный токен
    return this._request(`${this._cardsURL}/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: token,
      },
    });
  }

  updateDeleteStatusLike(id) {
    // убрать лайк
    return this._request(
      `${this._cardsURL}/${id}/likes`,
      this._returnHeadersDELETE()
    );
  }
}

// Создание экземпляра класса
const api = new Api(dataApi);
export default api;
