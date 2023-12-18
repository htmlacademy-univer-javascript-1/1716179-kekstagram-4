const MAX_HASHTAGS_LENGTH = 20;
const MAX_HASHTAGS_COUNT  = 5;

const formUpload = document.querySelector('.img-upload__form');
const submitBtn = document.querySelector('#upload-submit');

const unspoilt = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
}, true);


const inputHashtag = document.querySelector('.text__hashtags');

let errorMessage = '';

const error = () => errorMessage;

const hashtagHandler = (value) =>{
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  if(inputArray.length === 0){
    return true;
  }

  const hashtagRules = [
    {
      rule: inputArray.some((item) => item.indexOf('#', 1) > 0),
      error: 'Хэш-теги должны разделяться пробелами',
    },
    {
      rule: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа # (решётка)',
    },
    {
      rule: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',
    },
    {
      rule: inputArray.some((item) => item.length > MAX_HASHTAGS_LENGTH),
      error: `Максимальная длина одного хэш-тега ${MAX_HASHTAGS_LENGTH} символов, включая решётку`,
    },
    {
      rule: inputArray.length > MAX_HASHTAGS_COUNT ,
      error: `Нельзя указать больше ${MAX_HASHTAGS_COUNT } хэш-тегов`,
    },
    {
      rule: inputArray.some((item) => item.length === 1 || item[0] !== '#'),
      error: 'Хеш-тег не может состоять только из одной решётки',
    },
    {
      rule: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хэш-тег содержит недопустимые символы',
    },
  ];
  return hashtagRules.every((rule) => {
    const isInvalid = rule.rule;
    if(isInvalid){
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const validateInput = () =>{
  if(unspoilt.validate()){
    submitBtn.disabled = false;
  }
  else{
    submitBtn.disabled = true;
  }
};


unspoilt.addValidator(inputHashtag, hashtagHandler, error, 2, false);

inputHashtag.addEventListener('input', validateInput);
formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  unspoilt.validate();
});

export {unspoilt};
