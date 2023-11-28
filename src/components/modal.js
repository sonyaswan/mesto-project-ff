// Открытие модального окна 

function openModal(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
    popup.classList.add('popup_is-opened')
  }, 0);
  document.addEventListener('keydown', closeModalEvt);
}

// закрытие модального окна

function closeModal(popup) { // закрытие ...
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated')
  }, 600);
  document.removeEventListener('keydown', closeModalEvt);
}

function closeModalEvt(evtClose) { // закрытие ...
  if ((evtClose.target.classList.contains('popup__close')) ||        // кликом по крестику
    (evtClose.target.classList.contains('popup_is-opened')) ||       // кликом на оверлей
    (evtClose.key === "Escape") ||                                   // нажатием на Esc
    (evtClose.target.classList.contains('popup__button')))           // кликом по submit
    {
      closeModal(document.querySelector('.popup_is-opened'));      
  }
}

// функция Открытие модального окна с большой картинкой

function openCloseImgPopup(popupSource){
  const evtCard = popupSource.target.closest('.card');
  const evtCardImg = evtCard.querySelector('.card__image');
  const evtCardText = evtCard.querySelector('.card__title');
  const bigImgPopup = document.querySelector('.popup_type_image');
  const bigImgPopupImg = bigImgPopup.querySelector('.popup__image');
  const bigImgPopupText = bigImgPopup.querySelector('.popup__caption');

  bigImgPopupImg.src = evtCardImg.src;
  bigImgPopupImg.alt = evtCardImg.alt;
  bigImgPopupText.textContent = evtCardText.textContent;

  openModal(bigImgPopup);
  bigImgPopup.addEventListener('click', closeModalEvt);
}

export {openModal, closeModalEvt, openCloseImgPopup};

