import { isEscapeKey } from './util.js';
import { unspoilt } from './hashtag-rules.js';
import { initRadios, resetFilters } from './slider-effects.js';
import { postData } from './rest-api.js';
import { onSuccess, onFail } from './form-request.js';

const TYPES_OF_FILE = ['gif', 'jpg', 'jpeg', 'png'];
const body = document.querySelector('body');
const formUpload = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const fileUpload = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__preview');
const mainPicture = document.querySelector('.img-upload__preview img');
const plusButton = document.querySelector('.scale__control--bigger');
const minusButton = document.querySelector('.scale__control--smaller');
const scaleControl = document.querySelector('.scale__control--value');

const Zoom = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const setupFormEventListeners = () => {
  closeButton.addEventListener('click', ((evt) => {
    evt.preventDefault();
    closeForm();
  }));
  document.addEventListener('keydown', ((evt) => {
    if (isEscapeKey(evt) &&
        !evt.target.classList.contains('text__hashtags') &&
        !evt.target.classList.contains('text__description') &&
        !body.querySelector('.error')) {
      evt.preventDefault();
      closeForm();
    }
  }));

  fileUpload.addEventListener('change', (() => {
    uploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    openForm();
    (() => {
      const file = fileUpload.files[0];
      const fileName = file.name.toLowerCase();

      if (TYPES_OF_FILE.some((it) => fileName.endsWith(it))) {
        mainPicture.src = URL.createObjectURL(file);

        effects.forEach((effect) => {
          effect.style.backgroundImage = `url('${mainPicture.src}')`;
        });
      }
    })();
    (() => {
      setupZoomButtons();
      initRadios();
    })();
  }));
  scaleControl.value = '100%';

  formUpload.addEventListener('submit', ((evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    postData(onSuccess, onFail, 'POST', formData);
  }));
};

const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControl.value, 10) + (Zoom.STEP * factor);

  if (size < Zoom.MIN) {
    size = Zoom.MIN;
  }

  if (size > Zoom.MAX) {
    size = Zoom.MAX;
  }

  scaleControl.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
};

const setupZoomButtons = () => {
  minusButton.addEventListener('click', (() => {
    changeZoom(-1);
  }));
  plusButton.addEventListener('click', (() => {
    changeZoom(1);
  }));
};


const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  (() => {
    closeButton.removeEventListener('click', ((evt) => {
      evt.preventDefault();
      closeForm();
    }));
    document.removeEventListener('keydown', ((evt) => {
      if (isEscapeKey(evt) &&
        !evt.target.classList.contains('text__hashtags') &&
        !evt.target.classList.contains('text__description') &&
        !body.querySelector('.error')) {
        evt.preventDefault();
        closeForm();
      }
    }));
    formUpload.removeEventListener('submit', ((evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.target);
      postData(onSuccess, onFail, 'POST', formData);
    }));

    minusButton.removeEventListener('click', (() => {
      changeZoom(-1);
    }));
    plusButton.removeEventListener('click', (() => {
      changeZoom(1);
    }));
  })();

  formUpload.reset();
  unspoilt.reset();

  scaleControl.value = '100%';
  imagePreview.style.transform = 'scale(100%)';

  resetFilters();
};

const openForm = () => {
  setupFormEventListeners();
};

export { openForm, closeForm };
