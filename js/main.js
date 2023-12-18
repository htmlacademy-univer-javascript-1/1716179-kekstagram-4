import { createPictures } from './gallery.js';
import './big-picture.js';
import './hashtag-rules.js';
import { openForm } from './form.js';
import { getData } from './rest-api.js';

let pictures = [];

const onSuccess = (data) => {
  pictures = data.slice();
  createPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

};

const onFail = () =>{
  const errorMesage = document.createElement('div');
  errorMesage.style.position = 'absolute';
  errorMesage.style.left = 0;
  errorMesage.style.top = 0;
  errorMesage.style.right = 0;

  errorMesage.style.fontSize = '20px';
  errorMesage.style.backgroundColor = '#e60b17';
  errorMesage.style.padding = '15px';

  errorMesage.style.textAlign = 'center';
  errorMesage.textContent = 'Ошибка при загрузке изображений';
  document.body.append(errorMesage);

};


getData(onSuccess, onFail);
openForm();
