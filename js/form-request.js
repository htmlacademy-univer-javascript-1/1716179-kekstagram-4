import { closeForm } from './form.js';
import { isEscapeKey } from './util.js';

const body = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('section');
const errorMessageTemplate = body.querySelector('#error').content.querySelector('section');

const isMessageInnerElement = (element) => element.classList.contains('success__inner') || element.classList.contains('error__inner');

const onBodyClick = (evt) => {
  const clickElem = evt.target;

  if (isMessageInnerElement(clickElem)) {
    return;
  }
  (() => {
    body.removeEventListener('click', onBodyClick);
    document.removeEventListener('keydown', onBodyKeyDown);
    (() => {
      body.removeChild(body.lastChild);
    })();
  })();
};

const onBodyKeyDown = (evt) => {
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    (() => {
      body.removeEventListener('click', onBodyClick);
      document.removeEventListener('keydown', onBodyKeyDown);
      (() => {
        body.removeChild(body.lastChild);
      })();
    })();
  }
};

const createMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(true);
  message.style.zIndex = 100;
  return message;
};

const setupMessageEventListeners = () => {
  document.addEventListener('keydown', onBodyKeyDown);
  body.addEventListener('click', onBodyClick);
};

const appendMessageToBody = (message) => {
  body.appendChild(message);
};

const showMessage = (messageTemplate) => {
  const message = createMessage(messageTemplate);
  setupMessageEventListeners();
  appendMessageToBody(message);
};

const onSuccess = () => {
  closeForm();
  showMessage(successMessageTemplate);
};

const onFail = () => {
  showMessage(errorMessageTemplate);
};

export { onSuccess, onFail };
