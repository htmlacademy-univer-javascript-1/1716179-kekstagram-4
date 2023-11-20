import { isEscapeKey, isEnterKey } from './util.js';
import { picturesList } from './paint.js';
import { renderImage, renderComments } from './gallery.js';

export const bigPictureImage = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImage();
  }
};

function openImage (image) {
  if (image.target.classList.contains('picture__img')){
    bigPictureImage.classList.remove('hidden');
    renderImage(image);
    renderComments(image);
    document.addEventListener('keydown', onDocumentKeydown);
    const commentsCount = bigPictureImage.querySelector('.social__comment-count');
    const commentsLoad = bigPictureImage.querySelector('.comments-loader');
    commentsCount.classList.add('hidden');
    commentsLoad.classList.add('hidden');
    document.body.classList.add('modal-open');
  }

}

function closeImage () {
  bigPictureImage.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

picturesList.addEventListener('click', (evt) => {
  evt.preventDefault();
  openImage(evt);
});


picturesList.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    openImage(evt);
  }
});

bigPictureCloseButton.addEventListener('click', () => {
  closeImage();
});

bigPictureCloseButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeImage();
  }
});
