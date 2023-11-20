import { generateData } from './data.js';


const picturesList = document.querySelector('.pictures');
picturesList.classList.remove('hidden');
const pictureTemplate = document.querySelector('#picture').content;
const data = generateData(25);
const pictureListFragment = document.createDocumentFragment();
data.forEach((element) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').setAttribute('id', element['id']);
  newPicture.querySelector('.picture__img').setAttribute('src', `photos/${  element['url']}.jpg`);
  newPicture.querySelector('.picture__img').setAttribute('alt', element['description']);
  newPicture.querySelector('.picture__likes').textContent = element['likes'];
  newPicture.querySelector('.picture__comments').textContent = element['comments'].length;
  pictureListFragment.appendChild(newPicture);
});
picturesList.appendChild(pictureListFragment);

export {data, picturesList};
