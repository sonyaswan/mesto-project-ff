const validationConfig = {
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorElementName: {type: 'name',
                    suffix: '-error'},
  errorClass: 'popup__error_visible',
  inputImgClass: 'popup__input_type_url-img'
}

/**
 * Переключатель отображения ошибки при заполнении формы
 * @param {HTMLInputElement} inputElement DOM-элемент ввода информации в форме, для которой проводится проверка
 * @param {HTMLInputElement} errorElement DOM-элемент для вывода текста ошибки
 * @param {string} inputErrorClassActive класс элемента ввода, содержит стили для отображения ошибки
 * @param {string} errorClassActive класс элемента для вывода ошибки, содержит стили для отображения ошибки
 * @param {string} errorMessage текст ошибки
 */

const toggleInputError = (inputElement, errorElement, inputErrorClassActive, errorClassActive, errorMessage, validityValid) => {
  if (validityValid) {
    inputElement.classList.remove(inputErrorClassActive);
    errorElement.classList.remove(errorClassActive);
  } else {
    inputElement.classList.add(inputErrorClassActive);
    errorElement.classList.add(errorClassActive);
  }
  errorElement.textContent = errorMessage;
};

/**
 * Проверка поля формы на наличие ошибки
 * @param {HTMLInputElement} inputElement DOM-элемент ввода информации в форме, для которой проводится проверка
 * @param {HTMLInputElement} errorElement DOM-элемент для вывода текста ошибки
 * @param {string} inputErrorClassActive класс элемента ввода, содержит стили для отображения ошибки
 * @param {string} errorClassActive класс элемента для вывода ошибки, содержит стили для отображения ошибки
 */

const checkInputValidity = (inputElement, errorElement, inputErrorClassActive, errorClassActive) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
  inputElement.setCustomValidity('');
  }
  const validityValid = inputElement.validity.valid;
  const errorMessage = !validityValid ? inputElement.validationMessage : ''
  toggleInputError(inputElement, errorElement, inputErrorClassActive, errorClassActive, errorMessage, validityValid);
};

/**
 * Функция проверяет список полей на наличие невалидных значений
 * @param {HTMLInputElement} inputList список DOM-элементов полей ввода для вроерки валидности
 * @returns если хотябы одно поле невалидно - возвращает true
 */

const hasInvalidInput = (inputList) => {
  return inputList.some((listItem) => {
    return !listItem.validity.valid;
  })
}

/**
 * Переключатель статуса кнопки отправки формы при проверке воодимых данных
 * @param {HTMLInputElement} inputListInvalidCheck негативный результат проверки списока DOM-элементов полей на валидность 
 * @param {HTMLButtonElement} buttonElement DOM-элемент кнопки отправки формы
 * @param {string} buttonClassInactive класс кнопки отправки формы, содержит стили для неактивной кнопки
 */

const toggleButtonStateByCheck = (inputListInvalidCheck, buttonElement, buttonClassInactive) => {
  if (inputListInvalidCheck) {
    buttonElement.classList.add(buttonClassInactive);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(buttonClassInactive);
    buttonElement.disabled = false;
  }
}

/**
 * Переключатель статуса кнопки отправки формы при проверке воодимых данных
 * @param {HTMLInputElement} inputList список DOM-элементов полей для проверки на валидность
 * @param {HTMLButtonElement} buttonElement DOM-элемент кнопки отправки формы
 * @param {string} buttonClassInactive класс кнопки отправки формы, содержит стили для неактивной кнопки
 */

const toggleButtonState = (inputList, buttonElement, buttonClassInactive) => {
  toggleButtonStateByCheck(hasInvalidInput(inputList), buttonElement, buttonClassInactive);
}

/**
 * Установка слушателей на поля ввода для проверки данных для всей формы
 * @param {HTMLFormElement} formElement DOM-элемент формы, в которой проводится проверка
 * @param {string} inputSelectorClass класс, по которому будут отбираться DOM-элементы полей ввода внутри формы
 * @param {string} submitButtonSelectorClass класс, по которому будет выибираться DOM-элемент кнопка отправки формы
 * @param {string} buttonClassInactive класс кнопки отправки формы, содержит стили для неактивной кнопки
 * @param {string} inputErrorClassActive класс элемента ввода, содержит стили для отображения ошибки
 * @param {string} errorElementName объект {type, suffix}, содержит суффикс и тип сопоставления (id или name) для составления класса элемента с текстом ошибки, который соответсвует полю ввода
 * @param {string} errorClassActive класс элемента для вывода ошибки, содержит стили для отображения ошибки
 */

const setCheckFormEventListeners = (formElement, inputSelectorClass, 
                                    submitButtonSelectorClass, buttonClassInactive, 
                                    inputErrorClassActive, errorElementName, errorClassActive, imgUrlClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelectorClass));
  const buttonElement = formElement.querySelector(submitButtonSelectorClass);
  
  toggleButtonState(inputList, buttonElement, buttonClassInactive);
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement[errorElementName.type]}${errorElementName.suffix}`);
    inputElement.addEventListener('input', function () {
      const validityValid = inputElement.validity.valid;
      const imgURL = inputElement.classList.contains(imgUrlClass);
      
      if (validityValid && imgURL) {
        const errorMessage = 'Ссылка не ведет на изображение или его невозможно добавить';
        toggleInputError(inputElement, errorElement, inputErrorClassActive, errorClassActive, 'Проверка изображения', false);
        toggleButtonStateByCheck(true, buttonElement, buttonClassInactive);

        fetch(inputElement.value, {
          method: 'HEAD',
          'Content-Type': 'image'
        })
        .then((res) => {
          if (res.ok) {
            console.log(res);
            toggleInputError(inputElement, errorElement, inputErrorClassActive, errorClassActive, '', true);
            toggleButtonStateByCheck(false, buttonElement, buttonClassInactive);
          }
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          toggleInputError(inputElement, errorElement, inputErrorClassActive, errorClassActive, errorMessage, false);
        })   
      }
      else {
        checkInputValidity(inputElement, errorElement, inputErrorClassActive, errorClassActive);
        toggleButtonState(inputList, buttonElement, buttonClassInactive);
      }
    });
  });
};

/**
 * включение валидации вызовом enableValidation
 * @param {object} validationData объект с настройками. все настройки передаются при вызове
 * @param {string} validationData.formSelector - класс, по которому будет искаться DOM-элементы всех форм
 * @param {string} validationData.inputSelector - класс, по которому будет искаться DOM-элементы ввода информации в форме
 * @param {string} validationData.submitButtonSelector - класс, по которому будет выибираться DOM-элемент кнопка отправки формы
 * @param {string} validationData.inactiveButtonClass - класс кнопки отправки формы, содержит стили для неактивной кнопки
 * @param {string} validationData.inputErrorClass - класс элемента ввода, содержит стили для отображения ошибки
 * @param {object} validationData.errorElementName - объект содержит суффикс и тип сопоставления для составления класса элемента с текстом ошибки, который соответсвует полю ввода
 * @param {string} validationData.errorElementName.type - параметр, по которму будет сопоставляться поле ввода и элемент с ошибкой (id или name)
 * @param {string} validationData.errorElementName.name - суффик для составления названия класса
 * @param {string} validationData.errorClass - класс элемента для вывода ошибки, содержит стили для отображения ошибки
 */

const enableValidation = (validationData) => {
  const formList = Array.from(document.querySelectorAll(`.${validationData.formSelector}`));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setCheckFormEventListeners(formElement, 
      `.${validationData.inputSelector}`, 
      `.${validationData.submitButtonSelector}`, 
      validationData.inactiveButtonClass, 
      validationData.inputErrorClass,
      validationData.errorElementName, 
      validationData.errorClass,
      validationData.inputImgClass);
  });
};

/**
 * Очистка отображения ошибок при открытии форм
 * @param {HTMLFormElement} formElement DOM-элемент формы, в которой проводится проверка
 * @param {object} validationData объект с настройками. все настройки передаются при вызове
 * @param {string} validationData.inputSelector - класс, по которому будет искаться DOM-элементы ввода информации в форме
 * @param {string} validationData.inputErrorClass - класс элемента ввода, содержит стили для отображения ошибки
 * @param {object} validationData.errorElementName - объект содержит суффикс и тип сопоставления для составления класса элемента с текстом ошибки, который соответсвует полю ввода
 * @param {string} validationData.errorElementName.type - параметр, по которму будет сопоставляться поле ввода и элемент с ошибкой (id или name)
 * @param {string} validationData.errorElementName.name - суффик для составления названия класса
 * @param {string} validationData.errorClass - класс элемента для вывода ошибки, содержит стили для отображения ошибки
 * @param {string} validationData.submitButtonSelector - класс, по которому будет выибираться DOM-элемент кнопка отправки формы
 * @param {string} validationData.inactiveButtonClass - класс кнопки отправки формы, содержит стили для неактивной кнопки
 */

const clearValidation = (formElement, validationData) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${validationData.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${validationData.submitButtonSelector}`);
  
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement[validationData.errorElementName.type]}${validationData.errorElementName.suffix}`)

    toggleInputError(inputElement, 
      errorElement,
      validationData.inputErrorClass,
      validationData.errorClass,
      '',
      true)
  });

  toggleButtonState(inputList, buttonElement, validationData.inactiveButtonClass);
};

export {validationConfig, enableValidation, clearValidation};