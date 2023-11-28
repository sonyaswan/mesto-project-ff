import '../pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards, createCard, deleteItem, likeItem} from '../components/cards.js';
import {openModal, closeModalEvt, openCloseImgPopup} from '../components/modal.js';


// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

const newCardButtonOpen = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим форму редактирования профиля в DOM и ее поля
const formElement = document.querySelector('div.popup_type_edit .popup__form'); // Воспользуйтесь методом querySelector()
const nameInput = formElement.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Находим форму добавления карточки в DOM и ее поля
const formNewPlace = document.forms['new-place']; 
const placeNameInput = formNewPlace.elements['place-name']; 
const placeUrlInput = formNewPlace.elements.link;

// функция отображение карточки
function renderCard (cardContent, prepEnd) {
  const newCard = createCard(cardContent, deleteItem, openCloseImgPopup, likeItem);
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
formElement.addEventListener('submit', handleFormSubmit); 
formNewPlace.addEventListener('submit', handleFormNewPlace); 

