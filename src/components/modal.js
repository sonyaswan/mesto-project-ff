import {cardTemplate, 
  placesList, 
  profileEditButtonOpen, 
  profileEditPopup, 
  newCardButtonOpen,
  newCardPopup,
  imgPopup,
  deleteCardPopup,
  deleteCardButton,
  profileTitle,
  profileDescription,
  profileImage,
  formEditProfile,
  nameInput,
  jobInput,
  formNewPlace,
  placeNameInput,
  placeUrlInput} from '../components/dom.js'; 


/**
 * Открытие модального окна 
 * @param {HTMLElement} popup DOM попапа
 */
function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened')
  }, 0);
  document.addEventListener('keydown', closeModalEvt);
}

/**
 * закрытие модального окна
 * @param {HTMLElement} popup DOM попапа
 */
function closeModal(popup) { // закрытие модального окна
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated')
  }, 600);
  document.removeEventListener('keydown', closeModalEvt);
}

/**
 * закрытие модального окна по событию
 * @param {Event} evtClose событие
 */
function closeModalEvt(evtClose) { // событие закрытия
  
  if ((evtClose.type === 'click' &&
        evtClose.target.classList.contains('popup__close')) ||          // кликом по крестику
    (evtClose.type === 'mousedown' && 
        evtClose.target.classList.contains('popup_is-opened')) ||       // ПКМ на оверлей
    (evtClose.key === "Escape") ||                                      // нажатием на Esc
    (evtClose.type === 'submit' &&
        evtClose.target.classList.contains('popup__form')))             // кликом по submit
    {
      closeModal(document.querySelector('.popup_is-opened')); 
  }
}


/**
 * функция Открытие модального окна с большой картинкой
 * @param {HTMLElement} popupSource картинка, которая будет открыта в попапе
 */
function openImgPopup(popupSource) {
  if (popupSource.target.classList.contains('card__image')) {
    const evtCard = popupSource.target.closest('.card');
    const evtCardImg = popupSource.target;
    const evtCardText = evtCard.querySelector('.card__title');
    const bigImgPopup = imgPopup;
    const bigImgPopupImg = bigImgPopup.querySelector('.popup__image');
    const bigImgPopupText = bigImgPopup.querySelector('.popup__caption');

    bigImgPopupImg.src = evtCardImg.src;
    bigImgPopupImg.alt = evtCardImg.alt;
    bigImgPopupText.textContent = evtCardText.textContent;

    openModal(bigImgPopup);
  }
}

export {openModal, closeModalEvt, openImgPopup};

