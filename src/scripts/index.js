import '../pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from '../components/cards.js';
import {createCard, deleteItem, likeItem} from '../components/card.js';
import {openModal, closeModalEvt, openImgPopup} from '../components/modal.js';
import {placesList, 
  profileEditButtonOpen, 
  profileEditPopup, 
  newCardButtonOpen,
  newCardPopup,
  imgPopup,
  profileTitle,
  profileDescription,
  formEditProfile,
  nameInput,
  jobInput,
  formNewPlace,
  placeNameInput,
  placeUrlInput} from '../components/dom.js'; 


// функция отображение карточки
function renderCard (cardContent, prepEnd) {
  const newCard = createCard(cardContent, deleteItem, openImgPopup, likeItem);
  if (prepEnd) {
    placesList.prepend(newCard); 
  } else {
    placesList.append(newCard); 
  }
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => renderCard(item, false));

//  добавление слушателей

profileEditButtonOpen.addEventListener('click', function (evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profileEditPopup);
});

profileEditPopup.addEventListener('click', closeModalEvt);

newCardButtonOpen.addEventListener('click', function (evt) {
  formNewPlace.reset();
  openModal(newCardPopup);
});

newCardPopup.addEventListener('click', closeModalEvt);

imgPopup.addEventListener('click', closeModalEvt);

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModalEvt(evt);
}

function handleFormNewPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newPlace = {
    name: placeNameInput.value,
    link: placeUrlInput.value
  };
  renderCard(newPlace, true);
  closeModalEvt(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormSubmit); 
formNewPlace.addEventListener('submit', handleFormNewPlace); 

