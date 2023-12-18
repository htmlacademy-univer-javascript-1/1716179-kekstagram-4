import { isEscapeKey } from './util.js';

const commentTemplate = document.querySelector('#comments').content.querySelector('li');
const body = document.body;
const bigPictureForm = document.querySelector('.big-picture');
const bigPictureImage = bigPictureForm.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureForm.querySelector('.big-picture__social .likes-count');
const bigPictureDescription = bigPictureForm.querySelector('.big-picture__social .social__caption');
const bigPictureCommentsCount = bigPictureForm.querySelector('.social__comment-count');
const socials = document.querySelector('.social__comments');
const closeButton = document.querySelector('#picture-cancel');
const COMMENTS_STEP = 5;
const loader = document.querySelector('.comments-loader');
let currentComments = [];
let visibleCommentsCount;

const closeBigPicture = () => {
  bigPictureForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  loader.removeEventListener('click', onLoadNewComments);
};

const renderComment = (comment) => {
  const currentComment = commentTemplate.cloneNode(true);
  currentComment.querySelector('.social__picture').src = comment.avatar;
  currentComment.querySelector('.social__picture').alt = comment.name;
  currentComment.querySelector('.social__text').textContent = comment.message;
  return currentComment;
};

const renderComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((element) => {
    commentFragment.append(renderComment(element));
  });
  return commentFragment;
};

const updateLoaderVisibility = () => {
  if (currentComments.length <= COMMENTS_STEP || visibleCommentsCount >= currentComments.length) {
    loader.classList.add('hidden');
  } else {
    loader.classList.remove('hidden');
  }
};

const updateCommentsCountText = () => {
  bigPictureCommentsCount.textContent = `${visibleCommentsCount} из ${currentComments.length} комментариев`;
};

const createComments = () => {
  socials.innerHTML = '';
  visibleCommentsCount = Math.min(visibleCommentsCount, currentComments.length);
  const commentsSelected = currentComments.slice(0, visibleCommentsCount);
  updateLoaderVisibility();
  updateCommentsCountText();
  socials.append(renderComments(commentsSelected));
};

const onLoadNewComments = (evt) => {
  evt.preventDefault();
  visibleCommentsCount += COMMENTS_STEP;
  createComments();
};

const renderBigPicture = (data) => {
  bigPictureImage.src = data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureDescription.textContent = data.description;
  bigPictureCommentsCount.textContent = data.comments.length;
};

const handleKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const displayImageAndComments = (data) => {
  renderBigPicture(data);
  createComments();
};

const showBigPicture = (picture) => {
  bigPictureForm.classList.remove('hidden');
  body.classList.add('modal-open');
  currentComments = picture.comments.slice();
  visibleCommentsCount = COMMENTS_STEP;
  displayImageAndComments(picture);
  document.addEventListener('keydown', handleKeyDown);
  closeButton.addEventListener('click', closeBigPicture);
  loader.addEventListener('click', onLoadNewComments);
};

export { showBigPicture };
