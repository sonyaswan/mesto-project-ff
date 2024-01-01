import {
  imgPopup,
  bigImgPopupImg,
  bigImgPopupText,
} from '../components/dom.js'; 


/**
 * Открытие модального окна 
 * @param {HTMLElement} popup DOM попапа
 */
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', (evt) => closeModalESC(evt, popup));
}

/**
 * закрытие модального окна
 * @param {HTMLElement} popup DOM попапа
 */
function closeModal(popup) { // закрытие модального окна
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', (evt) => closeModalESC(evt, popup));
}

/**
 * закрытие модального окна по событию нажатием на Esc
 * @param {Event} evtClose событие
 * @param {HTMLElement} popup DOM попапа, который нужно закрыть
 */
function closeModalESC(evtClose, popup) { // событие закрытия
    if (evtClose.key === "Escape") {
      closeModal(popup);
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

    bigImgPopupImg.src = evtCardImg.src;
    bigImgPopupImg.alt = evtCardImg.alt;
    bigImgPopupText.textContent = evtCardText.textContent;

    openModal(imgPopup);
  }
}

export {openModal, closeModal, openImgPopup};

