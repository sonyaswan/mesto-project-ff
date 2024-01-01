const studentConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: 'b698a70e-68ca-440a-8289-1336e2ee5149',
    'Content-Type': 'application/json'
  },
  uri: {
    profile: '/users/me',
    avatar: '/users/me/avatar',
    cards: '/cards',
    likes: '/cards/likes'
  }
}

/**
 * Базовая реализация GET запроса
 * @param {object} config объект с кофигурацие подключения
 * @param {string} config.baseUrl базовый адрес с идентификатором группы
 * @param {object} config.headers данные подключения
 * @param {string} config.headers.authorization токен подключения
 * @param {string} uri частичный путь после базового адреса
 */
const getData = (config, uri) => {
  // fetch GET запрос c авторизацией
  return fetch(config.baseUrl + uri, {
    headers: {
      authorization: config.headers.authorization
    }
  })
    .then(handleResponse)
}

/**
 * Обработчик ошибок запроса
 * @param {Response} response объект с ответом сервера до загрузки данных
 * @return {Promise} в then всегда будет результат
 * @reject {status, error} в catch всегда будет ошибка
 */

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
   // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${response.status}`);
};

/**
 * Функция изменения, добавления, удаления данных
 * @param {object} config объект с кофигурацие подключения
 * @param {string} config.baseUrl базовый адрес с идентификатором группы
 * @param {object} config.headers данные подключения
 * @param {string} config.headers.authorization токен подключения
 * @param {string} uri частичный путь после базового адреса
 * @param {PATCH|POST|DELETE|PUT} method HTTP метод запроса
 * @param {object} data данные которые нужно передать на сервер (необязательный параметр)
 */

const requestData = (config, uri, method, data) => {
  return fetch(config.baseUrl + uri, {
    method: method,
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify(data),
  })
  .then(handleResponse);
}

const makeAPI = (config) => ({
  updateProfile: (newInfo) => requestData(config, config.uri.profile, 'PATCH', newInfo),
  updateAvatar: (newURL) => requestData(config, config.uri.avatar, 'PATCH', newURL),
  deleteCard: (cardID) => requestData(config, `${config.uri.cards}/${cardID}`, 'DELETE'),
  postCard: (newPlace) => requestData(config, config.uri.cards, 'POST', newPlace),
  toggleLike: (cardID, ifLiked) => {
    const method = ifLiked ? "DELETE" : "PUT";
    return requestData(config, `${config.uri.likes}/${cardID}`, method)
  },
  userInfo: getData(config, config.uri.profile),
  cardsInfo: getData(config, config.uri.cards)
});

const projectAPI = makeAPI(studentConfig);

export {projectAPI};