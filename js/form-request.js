import { closeForm } from './form.js';
import { isEscapeKey } from './util.js';

const body = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('section');
const errorMessageTemplate = body.querySelector('#error').content.querySelector('section');

const removeLastChildFromBody = () => {
  body.removeChild(body.lastChild);
};

const isMessageInnerElement = (element) => {
  return element.classList.contains('success__inner') || element.classList.contains('error__inner');
};

const handleBodyInteraction = (evt) => {
  const clickElem = evt.target;

  if (isMessageInnerElement(clickElem)) {
    return;
  }

  if (evt.type === 'click' || (evt.type === 'keydown' && isEscapeKey(evt))) {
    closeMessage();
  }
};

const closeMessage = () => {
  body.removeEventListener('click', handleBodyInteraction);
  document.removeEventListener('keydown', handleBodyInteraction);
  removeLastChildFromBody();
};

const createMessage = (messageTemplate) => messageTemplate.cloneNode(true);

const setupMessageEventListeners = () => {
  document.addEventListener('keydown', handleBodyInteraction);
  body.addEventListener('click', handleBodyInteraction);
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

