import { isEscapeKey, isEnterKey } from './util.js';


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFileForm();
  }
};

const overlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const closeForm = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('.img-upload__input');
const imageForm = document.querySelector('.img-upload__form');
const hashTag = imageForm.querySelector('.text__hashtags');
const comment = imageForm.querySelector('.text__description');

function openFileForm() {
  overlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
}

function closeFileForm() {
  if (!(document.activeElement === hashTag || document.activeElement === comment)) {
    uploadFile.value = '';
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
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
