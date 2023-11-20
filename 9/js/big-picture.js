import { isEscapeKey, isEnterKey } from './util.js';
import { picturesList } from './paint.js';
import { renderImage, renderComments } from './gallery.js';

export const bigPictureImage = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

let onLoadComments;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImage();
  }
};

function openImage (image) {
  if (image.target.classList.contains('picture__img')){
    bigPictureImage.classList.remove('hidden');
    const commentLoader = bigPictureImage.querySelector('.comments-loader');
    commentLoader.classList.remove('hidden');
    const commentsObj = renderComments(image, 0, commentLoader);
    commentsObj();
    onLoadComments = (evt) => {
      evt.preventDefault();
      commentsObj();
    };
    renderImage(image);
    document.addEventListener('keydown', onDocumentKeydown);
    document.body.classList.add('modal-open');
    commentLoader.addEventListener('click', onLoadComments);
  }

}

function closeImage () {
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';
  bigPictureImage.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  document.querySelector('.comments-loader').removeEventListener('click', onLoadComments);
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

