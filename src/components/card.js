import {cardTemplate} from '../components/dom.js'; 

// @todo: Функция создания карточки

function createCard (cardContent, deleteCard, openCard, likeCard) {

  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = newCard.querySelector('.card__image');
  const cardText = newCard.querySelector('.card__title');
  const buttonDeleteCard = newCard.querySelector('.card__delete-button');

  cardImg.src = cardContent.link;
  cardImg.alt = "Фотография локации: " + cardContent.name;
  cardText.textContent = cardContent.name;

  cardImg.addEventListener('click', openCard);
  newCard.addEventListener('click', likeCard);
  buttonDeleteCard.addEventListener('click', function () { 
    deleteCard(newCard);
  });

  return newCard;
}

// @todo: Функция удаления карточки

function deleteItem (item) {
  item.remove();
}

function likeItem (item) {
  if (item.target.classList.contains('card__like-button')) {
    item.target.classList.toggle('card__like-button_is-active');
  }
}

export {createCard, deleteItem, likeItem};
