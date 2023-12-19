import { isMessageInnerElement, body, onBodyKeyDown } from './form-request.js';

export const onBodyClick = (evt) => {
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
