// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (cardContent, deleteCard) {

  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = cardContent.link;
  newCard.querySelector('.card__image').alt = "Фотография локации: " + cardContent.name;
  newCard.querySelector('.card__title').textContent = cardContent.name;

  const buttonDeleteCard = newCard.querySelector('.card__delete-button');
  buttonDeleteCard.addEventListener('click', function () { 
    deleteCard(newCard);
  });

  return newCard;
}

// отображение карточки

function renderCard (cardContent) {
  const newCard = createCard(cardContent, deleteItem);
  placesList.append(newCard); 
}

// @todo: Функция удаления карточки

function deleteItem (item) {
  item.remove();
}


// @todo: Вывести карточки на страницу

initialCards.forEach(renderCard);
