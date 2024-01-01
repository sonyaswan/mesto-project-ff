// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// список карточек с картинками
const placesList = document.querySelector('.places__list');

//кнопка изменения профиля
const profileEditButtonOpen = document.querySelector('.profile__edit-button');
//кнопка добавления новой карточки
const newCardButtonOpen = document.querySelector('.profile__add-button');
//кнопка изменения аватара профиля
const avatarEditButtonOpen = document.querySelector('.profile__image-edit-buttom');

//попап с формой изменения данных профиля
const profileEditPopup = document.querySelector('.popup_type_edit');
//попап с формой добавления новой карточки
const newCardPopup = document.querySelector('.popup_type_new-card');
//попап просмотра картинки
const imgPopup = document.querySelector('.popup_type_image');
const bigImgPopupImg = imgPopup.querySelector('.popup__image'); 
const bigImgPopupText = imgPopup.querySelector('.popup__caption'); 
//попап удаления карточки
const сardDeletePopup = document.querySelector('.popup_type_delete-card');
//попап с формой изменения аватара профиля
const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');


// профиль пользователя
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Находим форму редактирования профиля в DOM и ее поля
const formEditProfile = profileEditPopup.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
const nameInput = formEditProfile.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formEditProfile.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
const formEditProfileSubmit = formEditProfile.querySelector('.popup__button');

// Находим форму добавления карточки в DOM и ее поля
const formNewPlace = document.forms['new-place']; 
const placeNameInput = formNewPlace.elements['place-name']; 
const placeUrlInput = formNewPlace.elements.link;
const formNewPlaceSubmit = formNewPlace.querySelector('.popup__button');

//форма "да" на попапе удаления карточки
const formDeleteCard = сardDeletePopup.querySelector('.popup__form');
const formDeleteCardSubmit = formDeleteCard.querySelector('.popup__button');

// Находим форму добавления карточки в DOM и ее поля
const formNewAvatar = document.forms['new-avatar']; 
const avatarUrlInput = formNewAvatar.elements.link;
const formNewAvatarSubmit = formNewAvatar.querySelector('.popup__button');


export {cardTemplate,
        placesList,
        profileEditButtonOpen,
        newCardButtonOpen,
        avatarEditButtonOpen,
        profileEditPopup,
        newCardPopup,
        imgPopup,
        bigImgPopupImg,
        bigImgPopupText,
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
        formNewAvatarSubmit}; 