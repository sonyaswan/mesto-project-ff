// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

const profileEditButtonOpen = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

const newCardButtonOpen = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imgPopup = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим форму редактирования профиля в DOM и ее поля
const formEditProfile = document.querySelector('div.popup_type_edit .popup__form'); // Воспользуйтесь методом querySelector()
const nameInput = formEditProfile.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formEditProfile.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Находим форму добавления карточки в DOM и ее поля
const formNewPlace = document.forms['new-place']; 
const placeNameInput = formNewPlace.elements['place-name']; 
const placeUrlInput = formNewPlace.elements.link;

export {cardTemplate, 
        placesList, 
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
        placeUrlInput}; 