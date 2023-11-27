const imageForm = document.querySelector('.img-upload__form');

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;


const pristine = new Pristine(imageForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);


function validateHashTag(value) {
  if (value.length === 0) {
    return true;
  }
  const valueArr = value.split(' ');
  const existHashs = [];
  if (valueArr.length > 5) {
    return false;
  }
  valueArr.forEach((element) => {
    if (!regexp.test(element) || element in existHashs) {
      return false;
    }
    existHashs.push(element);
  });
  if (existHashs.length === 0) {
    return false;
  }
  return true;
}

function validateComment(value) {
  return value.length <= 140;
}

pristine.addValidator(
  imageForm.querySelector('.text__hashtags'),
  validateHashTag,
  'не правильно введены хэштеги'
);

pristine.addValidator(
  imageForm.querySelector('.text__description'),
  validateComment,
  'введено больше 140 символов'
);

imageForm.addEventListener('submit', (evt) => {
  const valid = pristine.validate();
  if (valid) {
    return true;
  }
  else {
    evt.preventDefault();
  }
});
