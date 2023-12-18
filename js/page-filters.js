import { debounce, shuffle } from './utils.js';
import {pictures} from './main.js';
import {createPictures, removePictures} from './gallery.js';

const RANDOM_PICTURES_MAX = 10;

const filtersForm = document.querySelector('.img-filters__form');
let activeButton = document.querySelector('.img-filters__button--active');

const filters = {
  'filter-default': () => pictures.slice(),
  'filter-random': () => shuffle(pictures.slice()).slice(0, RANDOM_PICTURES_MAX),
  'filter-discussed': () => pictures.slice().sort((first, second) => second.comments.length - first.comments.length ),
};

const applyFilters = (id) =>{
  removePictures();
  createPictures(filters[id]());
};


const toogleButtons = (evt) => {
  activeButton.classList.remove('img-filters__button--active');
  activeButton = evt.target;
  activeButton.classList.add('img-filters__button--active');
};

const onFilterFormClick = debounce((evt) => {
  evt.preventDefault();
  if(evt.target.type === 'button'){
    applyFilters(evt.target.id);
    toogleButtons(evt);
  }
});

const initFilters = () => {
  filtersForm.addEventListener('click', onFilterFormClick);
};

export{initFilters};
