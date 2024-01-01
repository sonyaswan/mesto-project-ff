import '../pages/index.css'; // добавьте импорт главного файла стилей 

//import {initialCards} from '../components/cards.js';

import {createCard, deleteItem, likeItem} from '../components/card.js';

import {
  openModal, 
  closeModal,
  openImgPopup
} from '../components/modal.js';

import {
  placesList,
  profileEditButtonOpen,
  newCardButtonOpen,
  avatarEditButtonOpen,
  profileEditPopup,
  newCardPopup,
  imgPopup,
  сardDeletePopup,
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
  formNewAvatarSubmit
} from '../components/dom.js'; 

import {validationConfig, enableValidation, clearValidation} from '../components/validation.js';

import {projectAPI} from '../components/api.js';

//объект для временного хранения информации карточки, которую надо удалить
const cardIdObj = {
  cardId: '',
  cardDOM:  '',
};

//залогиненный пользователь
let userID;


//----------------------------------------------------------------------------
/**
 * функция отображение карточки
 * @param {object} cardContent данные карточки
 * @param {boolean} prepEnd добавление карточки в начало / конец списка
 */
function renderCard (cardContent, prepEnd) {
  const newCard = createCard(cardContent, deleteItem, likeItem, openсardDeletePopup);
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
function openсardDeletePopup (cardID, cardDOM) {
  cardIdObj.cardId = cardID;
  cardIdObj.cardDOM = cardDOM;
  formDeleteCardSubmit.textContent = 'Да';
  openModal(сardDeletePopup);  
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
  formNewPlaceSubmit.textContent = 'Создать';
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
  evt.preventDefault();

  projectAPI.deleteCard(cardIdObj.cardId) //удаление карточки с сервера
  .then((res) => {
    formDeleteCardSubmit.textContent = 'Удаление...';
    deleteItem(cardIdObj.cardDOM); //удаление карточки из разметки
    setTimeout(() => {
      closeModal(сardDeletePopup);
    }, 300);
  })
  .catch((err) => console.log(err));
}

/**
 * Обработчик «отправки» формы изменения информации о пользователе
 * @param {Event} evt событие
 */
function handleFormEditProfile(evt) {
  evt.preventDefault();
  const newInf = {
    name: nameInput.value,
    about: jobInput.value
  }
  projectAPI.updateProfile(newInf) //Редактирование профиля
    .then((res) => {
      profileTitle.textContent = newInf.name;
      profileDescription.textContent = newInf.about;
      formEditProfileSubmit.textContent = 'Сохранение...';
      setTimeout(() => {
        closeModal(profileEditPopup);
      }, 300);
    })
    .catch((err) => console.log(err));
}

/**
 * Обработчик «отправки» формы Обновление аватара пользователя
 * @param {Event} evt событие
 */
function handleFormEditAvatar(evt) {
  evt.preventDefault();
  const newInf = {
    avatar: avatarUrlInput.value,
  }
  projectAPI.updateAvatar(newInf) //Редактирование аватара
    .then((res) => {
      profileImage.src = res.avatar;
      formNewAvatarSubmit.textContent =  'Сохранение...';
      setTimeout(() => {
        closeModal(avatarEditPopup);
      }, 300);
    })
    .catch((err) => console.log(err));
}


/**
 * Обработчик «отправки» формы добавления новой карточки
 * @param {Event} evt событие
 */
function handleFormNewPlace(evt) {
  evt.preventDefault();
  const newPlace = {
    name: placeNameInput.value,
    link: placeUrlInput.value
  };

  projectAPI.postCard(newPlace) //добавление новой карточки на сервер
    .then((card) => {
      card.userID = userID;
      renderCard(card, true);
      formNewPlaceSubmit.textContent = 'Сохранение...';
      setTimeout(() => {
        closeModal(newCardPopup);
      }, 300)   
    })
    .catch((err) => console.log(err));
}


//----------------------------------------------------------------------------
//рендер страницы с данными из базы
Promise.all([projectAPI.userInfo, projectAPI.cardsInfo])
 .then(([USER, CARDS]) => {
    profileTitle.textContent = USER.name;
    profileDescription.textContent = USER.about;
    profileImage.src = USER.avatar;
    userID = USER['_id'];
    CARDS.forEach((card) => {
      card.userID = userID;
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

/*слушатели закрытия попапов
разнесено на два вида слушателей: 
оверлей выделен отдельно mousedown для более приятного пользовательского опыта. 
например если закрытие по оверлею будет по click и пользователь будет выделять 
мышкой текст в каком либо инпуте не очень аккуратно, и при этом движение мышки 
закончилось где-то не внутри попапа, а на оверлее - то поп ап закроется, это 
явно не то, что ожидаемо от интерфейса.*/

[profileEditPopup,
avatarEditPopup,
newCardPopup,
imgPopup,
сardDeletePopup].forEach((popup) => {

  popup.addEventListener('mousedown', (evtClose) => {                  // ПКМ на оверлей
    if (evtClose.target.classList.contains('popup_is-opened')){
      closeModal(popup);
    }
  })

  popup.addEventListener('click', (evtClose) => {                      // кликом по крестику
    if (evtClose.target.classList.contains('popup__close')){
      closeModal(popup);
    }
  })
})


//----------------------------------------------------------------------------
// Прикрепляем обработчики к формам:
formEditProfile.addEventListener('submit', handleFormEditProfile); 
formNewAvatar.addEventListener('submit', handleFormEditAvatar); 
formNewPlace.addEventListener('submit', handleFormNewPlace); 
formDeleteCard.addEventListener('submit', handleSubmitDelete); 


//----------------------------------------------------------------------------
//включение валидации форм
enableValidation(validationConfig); 


