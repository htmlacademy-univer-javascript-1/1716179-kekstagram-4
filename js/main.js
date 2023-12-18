import { createPictures } from './gallery.js';
import './big-picture.js';
import './hashtag-rules.js';
import { openForm } from './form.js';
import { getData } from './rest-api.js';
import { initFilters } from './page-filters.js';

let pictures = [];

const displayErrorMessage = () => {
  const errorMessage = document.createElement('div');
  errorMessage.style.position = 'absolute';
  errorMessage.style.left = 0;
  errorMessage.style.top = 0;
  errorMessage.style.right = 0;

  errorMessage.style.fontSize = '20px';
  errorMessage.style.backgroundColor = '#e60b17';
  errorMessage.style.padding = '15px';

  errorMessage.style.textAlign = 'center';
  errorMessage.textContent = 'Ошибка при загрузке изображений';
  document.body.append(errorMessage);
};

const loadData = () => {
  const onSuccess = (data) => {
    pictures = data.slice();
    createPictures(pictures);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  const onFail = () => {
    displayErrorMessage();
  };

  getData(onSuccess, onFail);
};

const initializeApp = () => {
  loadData();
  openForm();
  initFilters();
};

initializeApp();

export{pictures};
