import {cardTemplate} from '../components/dom.js'; 

import {
  projectAPI
  } from '../components/api.js';

// @todo: Функция создания карточки

/**
 * 
 * @param {object} cardContent данные карточки
 * @param {string} cardContent.name название локации
 * @param {string} cardContent.link ссылка на изображение
 * @param {object} cardContent.owner владелец карточки
 * @param {Array} cardContent.likes массив с информацией о том, кто лайкнул
 * @param {boolean} cardContent.userID залогиненный пользователь
 * @param {string} cardContent._id id карточки 
 * @param {Function} deleteAny функция удаления из разметки
 * @param {Function} likeCard функция лайка карточки
 * @param {Function} openPopupDelete функция удаления карточки
 * @returns элемент с новой карточкой
 */
function createCard (cardContent, deleteAny, likeCard, openPopupDelete) {

  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = newCard.querySelector('.card__image');
  const cardText = newCard.querySelector('.card__title');
  const likeCounter = newCard.querySelector('.card__like-counter');
  const likeButton = newCard.querySelector('.card__like-button');
  const buttonDeleteCard = newCard.querySelector('.card__delete-button');

  const isMyCard = cardContent.owner._id === cardContent.userID;
  const hasMyLike = cardContent.likes.some((item) => item._id === cardContent.userID);

  cardImg.src = cardContent.link;
  cardImg.alt = "Фотография локации: " + cardContent.name;
  cardText.textContent = cardContent.name;
  likeCounter.textContent = cardContent.likes.length;

  if (hasMyLike) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (evt) => {
    likeCard(evt, cardContent._id)
      .then((newLikes) => {
        likeCounter.textContent = newLikes;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if(isMyCard) {
    buttonDeleteCard.addEventListener('click', () => { 
      openPopupDelete(cardContent._id, newCard);
    });
  } else {
    deleteAny(buttonDeleteCard);
  }

  return newCard;
}

/**
 * Функция удаления любого элемента из html
 * @param {HTMLElement} item DOM любого эелемента
 */
function deleteItem (item) {
  item.remove();
}

/**
 * Постановка и снятие лайка
 * @param {Event} evt событие клика по кнопке лайка
 * @param {string} cardID id карточки, которую лайкают
 * @returns переключает статус сердечка и выдает новое количество лайков
 */
function likeItem (evt, cardID) {
    const liked = evt.target.classList.contains('card__like-button_is-active');
    return projectAPI.toggleLike(cardID, liked) //удаление / постановка лайка
      .then((res) => {
        evt.target.classList.toggle('card__like-button_is-active');
        return res.likes.length;
      })
}

export {createCard, deleteItem, likeItem};
