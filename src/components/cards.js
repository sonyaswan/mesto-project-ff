 const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;


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

export {initialCards, createCard, deleteItem, likeItem};

