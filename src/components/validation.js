const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
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

const toggleInputError = (inputElement, errorElement, inputErrorClassActive, errorClassActive, errorMessage, validity) => {
  if (validity) {
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
  const errorMessage = !validityValid ? inputElement.validationMessage : '';
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
 * @param {object} config объект с настройками. все настройки передаются при вызове
 * @param {string} config.formSelector - класс, по которому будет искаться DOM-элементы всех форм
 * @param {string} config.inputSelector - класс, по которому будет искаться DOM-элементы ввода информации в форме
 * @param {string} config.submitButtonSelector - класс, по которому будет выибираться DOM-элемент кнопка отправки формы
 * @param {string} config.inactiveButtonClass - класс кнопки отправки формы, содержит стили для неактивной кнопки
 * @param {string} config.inputErrorClass - класс элемента ввода, содержит стили для отображения ошибки
 * @param {object} config.errorElementName - объект содержит суффикс и тип сопоставления для составления класса элемента с текстом ошибки, который соответсвует полю ввода
 * @param {string} config.errorElementName.type - параметр, по которму будет сопоставляться поле ввода и элемент с ошибкой (id или name)
 * @param {string} config.errorElementName.name - суффик для составления названия класса
 * @param {string} config.errorClass - класс элемента для вывода ошибки, содержит стили для отображения ошибки
 */

const setCheckFormEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement[config.errorElementName.type]}${config.errorElementName.suffix}`);
    inputElement.addEventListener('input', function () {
      /* базовая валидация проекта */
      checkInputValidity(inputElement, errorElement, config.inputErrorClass, config.errorClass);
      toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);

      /* дополнительное задание проекта:
      Опционально, если хотите потренироваться, можете проверить, что это именно URL на изображение, 
      и он действительный. Для этого вам потребуется сделать запрос с методом HEAD по этому адресу 
      и проверить статус ответа и mime-тип в заголовках. */
      /*const validityValid = inputElement.validity.valid;
      const imgURL = inputElement.classList.contains(config.inputImgClass);
      if (validityValid && imgURL) {
        const errorMessage = 'Ссылка не ведет на изображение или его невозможно добавить';
        toggleInputError(inputElement, errorElement, config.inputErrorClass, config.errorClass, 'Проверка изображения', false);
        toggleButtonStateByCheck(true, buttonElement, config.inactiveButtonClass);

        fetch(inputElement.value, {
          method: 'HEAD'
        })
        .then((res) => {
          const imgOk = res.headers.get('Content-Type').substring(0, 5) === 'image';
          if (res.ok && imgOk) {
            toggleInputError(inputElement, errorElement, config.inputErrorClass, config.errorClass, '', true);
            toggleButtonStateByCheck(false, buttonElement, config.inactiveButtonClass);
          }
          else {
            toggleInputError(inputElement, errorElement, config.inputErrorClass, config.errorClass, errorMessage, false);
            toggleButtonStateByCheck(true, buttonElement, config.inactiveButtonClass);
          }
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
          toggleInputError(inputElement, errorElement, config.inputErrorClass, config.errorClass, errorMessage, false);
          toggleButtonStateByCheck(true, buttonElement, config.inactiveButtonClass);
        })   
      }
      else {
        checkInputValidity(inputElement, errorElement, config.inputErrorClass, config.errorClass);
        toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
      }*/
    });
  });
};

/**
 * включение валидации вызовом enableValidation
 * @param {object} config объект с настройками. все настройки передаются при вызове
 * @param {string} config.formSelector - класс, по которому будет искаться DOM-элементы всех форм
 */
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setCheckFormEventListeners(formElement, config);
  });
};

/**
 * Очистка отображения ошибок при открытии форм
 * @param {HTMLFormElement} formElement DOM-элемент формы, в которой проводится проверка
 * @param {object} config объект с настройками. все настройки передаются при вызове
 * @param {string} config.inputSelector - класс, по которому будет искаться DOM-элементы ввода информации в форме
 * @param {string} config.inputErrorClass - класс элемента ввода, содержит стили для отображения ошибки
 * @param {object} config.errorElementName - объект содержит суффикс и тип сопоставления для составления класса элемента с текстом ошибки, который соответсвует полю ввода
 * @param {string} config.errorElementName.type - параметр, по которму будет сопоставляться поле ввода и элемент с ошибкой (id или name)
 * @param {string} config.errorElementName.name - суффик для составления названия класса
 * @param {string} config.errorClass - класс элемента для вывода ошибки, содержит стили для отображения ошибки
 * @param {string} config.submitButtonSelector - класс, по которому будет выибираться DOM-элемент кнопка отправки формы
 * @param {string} config.inactiveButtonClass - класс кнопки отправки формы, содержит стили для неактивной кнопки
 */

const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement[config.errorElementName.type]}${config.errorElementName.suffix}`);

    toggleInputError(inputElement, 
      errorElement,
      config.inputErrorClass,
      config.errorClass,
      '',
      true);
  });

  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
};

export {validationConfig, enableValidation, clearValidation};