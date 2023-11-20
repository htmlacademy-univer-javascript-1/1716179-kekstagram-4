import { data } from './paint.js';
import { bigPictureImage } from './big-picture.js';

export function renderComments(image) {
  const thumbnailId = image.target.id;
  const comments = data.find((i) => i.id === thumbnailId)['comments'];
  const commentTemplate = document.querySelector('#comment').content;
  const commentsList = document.querySelector('.social__comments');
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').setAttribute('src', comment.avatar);
    newComment.querySelector('.social__picture').setAttribute('alt', comment.alt);
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(newComment);
  });
  commentsList.appendChild(commentsListFragment);
}
export function renderImage(image) {
  const likesCount = image.target.parentElement.querySelector('.picture__likes').textContent;
  const commentsCount = image.target.parentElement.querySelector('.picture__comments').textContent;
  bigPictureImage.querySelector('.big-picture__img img').setAttribute('src', image.target.currentSrc);
  bigPictureImage.querySelector('.social__caption').textContent = image.target.alt;
  bigPictureImage.querySelector('.likes-count').textContent = likesCount;
  bigPictureImage.querySelector('.comments-count').textContent = commentsCount;
}
