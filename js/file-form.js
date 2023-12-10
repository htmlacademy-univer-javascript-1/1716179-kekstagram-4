import { isEscapeKey, isEnterKey } from './util.js';


const overlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const closeForm = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('.img-upload__input');
const imageForm = document.querySelector('.img-upload__form');
const hashTag = imageForm.querySelector('.text__hashtags');
const comment = imageForm.querySelector('.text__description');
export const preview = imageForm.querySelector('.img-upload__preview img');
const effectsPreview = imageForm.querySelectorAll('.effects__preview');
const scaleSmaller = imageForm.querySelector('.scale__control--smaller');
const scaleBigger = imageForm.querySelector('.scale__control--bigger');
const scaleValue = imageForm.querySelector('.scale__control--value');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFileForm();
  }
};

const plusScale = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.min(Number(scaleValue.value.slice(0, -1)) + 25, 100)}%`;
  scaleImage(scaleValue.value);
};

const minusScale = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.max(Number(scaleValue.value.slice(0, -1)) - 25, 25 )}%`;
  scaleImage(scaleValue.value);
};


function openFileForm() {
  const urlImg = URL.createObjectURL(uploadFile.files[0]);
  overlay.classList.remove('hidden');
  effectsPreview.forEach((element) => {
    element.style.backgroundImage = `url(${  urlImg  })`;
  });
  preview.setAttribute('src', urlImg);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  scaleBigger.addEventListener('click', plusScale);
  scaleSmaller.addEventListener('click', minusScale);
}

function scaleImage(value) {
  preview.style.transform = `scale(${  Number(Number(value.slice(0, -1)) / 100)  })`;
}

function closeFileForm() {
  if (!(document.activeElement === hashTag || document.activeElement === comment)) {
    uploadFile.value = '';
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
    scaleBigger.removeEventListener('click', plusScale);
    scaleSmaller.removeEventListener('click', minusScale);
  }
}

closeForm.addEventListener('click', () => {
  closeFileForm();
});

closeForm.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeFileForm();
  }
});

fileInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openFileForm();
});
