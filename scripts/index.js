// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (cardContent, deleteCard) {

  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = cardContent.link;
  newCard.querySelector('.card__title').textContent = cardContent.name;
  placesList.append(newCard); 

  const buttonDel = newCard.querySelector('.card__delete-button');
  buttonDel.addEventListener('click', function () { 
    deleteCard(newCard);
  });
}

// @todo: Функция удаления карточки

function deleteItem (item) {
  item.remove();
}


// @todo: Вывести карточки на страницу

for (const card of initialCards) {
  createCard(card, deleteItem);
}