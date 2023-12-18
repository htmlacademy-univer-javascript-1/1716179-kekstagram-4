import {showBigPicture} from './big-picture.js';

const pictureFragments = document.createDocumentFragment();
const picturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('a');

const createPicture = (picture) => {
  const currentPicture = picturesTemplate.cloneNode(true);

  currentPicture.querySelector('img').src = picture.url;
  currentPicture.querySelector('img').alt = picture.description;
  currentPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  currentPicture.querySelector('.picture__likes').textContent = picture.likes;


  const onPictureClick = (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  };
  currentPicture.dataset.id = picture.id;
  currentPicture.addEventListener('click', onPictureClick);
  pictureFragments.append(currentPicture);
};

const createPictures = (pictures) => {

  const pictureContainer = document.querySelector('.pictures');
  pictures.forEach((picture) => {
    createPicture(picture);
  });

  pictureContainer.append(pictureFragments);
};

export {createPictures};
