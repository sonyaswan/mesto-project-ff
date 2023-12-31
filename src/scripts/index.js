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
  popups,
  profileEditPopup,
  newCardPopup,
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

import {validationConfig, enableValidation, clearValidation, setError, toggleButtonStateByCheck} from '../components/validation.js';

import {projectAPI} from '../components/api.js';

//объект для временного хранения информации карточки, которую надо удалить
const cardIdObj = {
  cardId: '',
  cardDom:  '',
};

//залогиненный пользователь
let userId;


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
 * @param {string} cardId id карточки 
 * @param {string} cardDom DOM карточки 
 */
function openсardDeletePopup (cardId, cardDom) {
  cardIdObj.cardId = cardId;
  cardIdObj.cardDom = cardDom;
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
    deleteItem(cardIdObj.cardDom); //удаление карточки из разметки
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
      formEditProfileSubmit.textContent = 'Сохранение...';
      profileTitle.textContent = newInf.name;
      profileDescription.textContent = newInf.about;
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
      formNewAvatarSubmit.textContent =  'Сохранение...';
      profileImage.src = res.avatar;
      setTimeout(() => {
        closeModal(avatarEditPopup);
      }, 300);
    })
    .catch((err) =>  console.log(err));
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
      formNewPlaceSubmit.textContent = 'Сохранение...';
      card.userId = userId;
      renderCard(card, true);
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
    userId = USER['_id'];
    CARDS.forEach((card) => {
      card.userId = userId;
      renderCard(card, false);
    });
  })
  .catch((err) => console.log(err));

//----------------------------------------------------------------------------
//  добавление слушателей на кнопки и попапы

profileEditButtonOpen.addEventListener('click', openProfileEditPopup); 

avatarEditButtonOpen.addEventListener('click', openAvatarEditPopup); 

newCardButtonOpen.addEventListener('click', openNewCardPopup);

placesList.addEventListener('click', openImgPopup);

/*слушатели закрытия попапов
разнесено на два вида слушателей*/

popups.forEach((popup) => {
  /*оверлей выделен отдельно mousedown для более приятного пользовательского опыта. 
например если пользователь будет выделять 
мышкой текст в каком либо инпуте не очень аккуратно, и при этом движение мышки 
закончилось где-то не внутри попапа, а на оверлее - то поп ап закроется, это 
явно не то, что ожидаемо от интерфейса.*/
  popup.addEventListener('mousedown', (evtClose) => {                  // ПКМ на оверлей - оставно после ревью (серый коммент)
    if (evtClose.target.classList.contains('popup_is-opened')){
      closeModal(popup);
    }
  })

  popup.addEventListener('mouseup', (evtClose) => {                      // по крестику
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
