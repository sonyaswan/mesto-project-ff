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
  document.addEventListener('keydown', closeModalEsc);
}

/**
 * закрытие модального окна
 * @param {HTMLElement} popup DOM попапа
 */
function closeModal(popup) { // закрытие модального окна
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}

/**
 * закрытие модального окна по событию нажатием на Esc
 * @param {Event} evtClose событие
 */
function closeModalEsc(evtClose) { // событие закрытия
    if (evtClose.key === "Escape") {
      closeModal(document.querySelector('.popup_is-opened'));
    }
  }


function loadImage(imageUrl, imageElement) {
    return new Promise(function (resolve, reject) {
      const image = document.createElement('img');
      image.src = imageUrl;
      image.onload = resolve;
      image.onerror = reject;
    });
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
    loadImage(evtCardImg.src, bigImgPopupImg.src)
    .then((res) => {
      bigImgPopupImg.src = evtCardImg.src;
      bigImgPopupImg.classList.remove('popup__image_error-loading')
    })
    .catch(() => {
      bigImgPopupImg.src = '';
      bigImgPopupImg.classList.add('popup__image_error-loading')
      console.log('Ошибка загрузки изображения');
    })
    .finally(() => {
      bigImgPopupImg.alt = evtCardImg.alt;
      bigImgPopupText.textContent = evtCardText.textContent;
      openModal(imgPopup);
    })
  }
}

export {openModal, closeModal, openImgPopup};

