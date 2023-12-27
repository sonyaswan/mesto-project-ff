import '../pages/index.css'; // добавьте импорт главного файла стилей 

//import {initialCards} from '../components/cards.js';

import {createCard, deleteItem, likeItem} from '../components/card.js';

import {openModal, 
  closeModalEvt, 
  openImgPopup} from '../components/modal.js';

import {cardTemplate,
  placesList,
  profileEditButtonOpen,
  newCardButtonOpen,
  avatarEditButtonOpen,
  profileEditPopup,
  newCardPopup,
  imgPopup,
  deleteCardPopup,
  avatarEditPopup,
  profileTitle,
  profileDescription,
  profileImage,
  formEditProfile,
  nameInput,
  jobInput,
  formEditProfileSubmit,
  formNewPlace,
  placeNameInput,
  placeUrlInput,
  formNewPlaceSubmit,
  formDeleteCard,
  formDeleteCardSubmit,
  formNewAvatar,
  avatarUrlInput,
  formNewAvatarSubmit} from '../components/dom.js'; 

import {validationConfig, enableValidation, clearValidation} from '../components/validation.js';

import {get, 
  request,
  studentConfig,
  userInfo, 
  cardsInfo} from '../components/api.js';

//объект для временного хранения информации карточки, которую надо удалить
const cardIdObj = {
  cardId: '',
  cardDOM:  ''
};


//----------------------------------------------------------------------------
/**
 * функция отображение карточки
 * @param {object} cardContent данные карточки
 * @param {boolean} prepEnd доавление карточки в начало / конец списка
 */
function renderCard (cardContent, prepEnd) {
  const newCard = createCard(cardContent, deleteItem, likeItem, openDeleteCardPopup);
  if (prepEnd) {
    placesList.prepend(newCard); 
  } else {
    placesList.append(newCard); 
  }
}

//----------------------------------------------------------------------------
// функции для слушателей кнопок и попапов

/**
 * Функция открытия попапа удаления карточки, передается в слушатель кнопки "корзина" на каждой карточке
 * @param {string} cardID id карточки 
 * @param {string} cardDOM DOM карточки 
 */
function openDeleteCardPopup (cardID, cardDOM) {
  cardIdObj.cardId = cardID;
  cardIdObj.cardDOM = cardDOM;
  formDeleteCardSubmit.textContent = 'Да';
  openModal(deleteCardPopup);  
}

/**
 * функция открытия попапа редактирования профиля по кнопке
 * @param {Event} evt событие  
 */
function openProfileEditPopup (evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  formEditProfileSubmit.textContent = 'Сохранить';
  clearValidation(formEditProfile, validationConfig);
  openModal(profileEditPopup);
}

/**
 * функция открытия попапа редактирования аватара профиля по кнопке
 * @param {Event} evt событие  
 */
function openAvatarEditPopup (evt) {
  formNewAvatar.reset();
  formNewAvatarSubmit.textContent = 'Сохранить';
  clearValidation(formNewAvatar, validationConfig);
  openModal(avatarEditPopup);
}

/**
 * функция открытия попапа добавления новой карточки по кнопке
 * @param {Event} evt событие 
 */
function openNewCardPopup (evt) {
  formNewPlace.reset();
  formNewPlaceSubmit.textContent = 'Сохранить';
  clearValidation(formNewPlace, validationConfig);
  openModal(newCardPopup);
}

//----------------------------------------------------------------------------
// функции для обработчиков форм

/**
 * Обработчик «отправки» формы удаления карточки
 * @param {Event} evt событие  
 */
function handleSubmitDelete (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  request(studentConfig, `/cards/${cardIdObj.cardId}`, 'DELETE') //удаление карточки с сервера
  .then((res) => {
    formDeleteCardSubmit.textContent = 'Удаление...';
    deleteItem(cardIdObj.cardDOM); //удаление карточки из разметки
  })
  .then((res) => {
    setTimeout(() => {
      closeModalEvt(evt);
    }, 300)   
  })
  .catch((err) => console.log(err));
}

/**
 * Обработчик «отправки» формы изменения информации о пользователе
 * @param {Event} evt событие
 */
function handleFormEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newInf = {
    name: nameInput.value,
    about: jobInput.value
  }
  request(studentConfig, '/users/me', 'PATCH', newInf) //Редактирование профиля
    .then((res) => {
      profileTitle.textContent = newInf.name;
      profileDescription.textContent = newInf.about;
      formEditProfileSubmit.textContent = 'Сохранение...';
    })
    .then((res) => {
      setTimeout(() => {
        closeModalEvt(evt);
      }, 300)   
    })
    .catch((err) => console.log(err));
}

/**
 * Обработчик «отправки» формы Обновление аватара пользователя
 * @param {Event} evt событие
 */
function handleFormEditAvatar(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newInf = {
    avatar: avatarUrlInput.value,
  }
  request(studentConfig, '/users/me/avatar', 'PATCH', newInf) //Редактирование профиля
    .then((res) => {
      profileImage.src = res.avatar;
      formNewAvatarSubmit.textContent =  'Сохранение...';
    })
    .then((res) => {
      setTimeout(() => {
        closeModalEvt(evt);
      }, 300)   
    })
    .catch((err) => console.log(err));
}


/**
 * Обработчик «отправки» формы добавления новой карточки
 * @param {Event} evt событие
 */
function handleFormNewPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const newPlace = {
    name: placeNameInput.value,
    link: placeUrlInput.value
  };

  Promise.all([userInfo, request(studentConfig, '/cards', 'POST', newPlace)]) //добавление новой карточки на сервер
    .then(([USER, card]) => {
      card.userID = USER['_id'];
      renderCard(card, true);
      formNewPlaceSubmit.textContent = 'Сохранение...';
    })
    .then((res) => {
      setTimeout(() => {
        closeModalEvt(evt);
      }, 300)   
    })
    .catch((err) => console.log(err));
}


//----------------------------------------------------------------------------
//рендер страницы с данными из базы

// вывод информации о пользователи из базы
userInfo
  .then((USER) => {
    profileTitle.textContent = USER.name;
    profileDescription.textContent = USER.about;
    profileImage.src = USER.avatar;
  })
  .catch((err) => console.log(err));

// вывод карточек из базы
Promise.all([userInfo, cardsInfo])
 .then(([USER, CARDS]) => {
    CARDS.forEach((card) => {
      card.userID = USER['_id'];
      renderCard(card, false);
    });
  })
  .catch((err) => console.log(err));


//----------------------------------------------------------------------------
//  добавление слушателей на кнопки и попапы

profileEditButtonOpen.addEventListener('click', openProfileEditPopup); //открытие попапа редактирования профиля по кнопке

avatarEditButtonOpen.addEventListener('click', openAvatarEditPopup); //открытие попапа редактирования профиля по кнопке

newCardButtonOpen.addEventListener('click', openNewCardPopup);//открытие попапа добавления новой карточки по кнопке

placesList.addEventListener('click', openImgPopup);//открытие попапа с просмотром картинки по клику на список карточек

//попап редактирования профиля
profileEditPopup.addEventListener('mousedown', closeModalEvt); //для оверлея 
profileEditPopup.addEventListener('click', closeModalEvt); //для для всего остального 

//попап редактирования аватара профиля
avatarEditPopup.addEventListener('mousedown', closeModalEvt); //для оверлея 
avatarEditPopup.addEventListener('click', closeModalEvt); //для для всего остального 

//попап новой карточки
newCardPopup.addEventListener('mousedown', closeModalEvt); //для оверлея 
newCardPopup.addEventListener('click', closeModalEvt); //для для всего остального 

//попап просмотра картинки
imgPopup.addEventListener('mousedown', closeModalEvt); //для оверлея 
imgPopup.addEventListener('click', closeModalEvt); //для для всего остального 

//попап удаления карточки
deleteCardPopup.addEventListener('mousedown', closeModalEvt); //для оверлея 
deleteCardPopup.addEventListener('click', closeModalEvt); //для для всего остального 


//----------------------------------------------------------------------------
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', handleFormEditProfile); 
formNewAvatar.addEventListener('submit', handleFormEditAvatar); 
formNewPlace.addEventListener('submit', handleFormNewPlace); 
formDeleteCard.addEventListener('submit', handleSubmitDelete); 


//----------------------------------------------------------------------------
//включение валидации форм
enableValidation(validationConfig); 


