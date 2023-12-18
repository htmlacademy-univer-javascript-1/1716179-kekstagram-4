export const Effects = {
  none: 0,
  chrome: {
    filter: 'grayscale',
    range: { min: 0, max: 1 },
    step: 0.1,
    measurementUnit: ''
  },
  sepia: {
    filter: 'sepia',
    range: { min: 0, max: 1 },
    step: 0.1,
    measurementUnit: ''
  },
  marvin: {
    filter: 'invert',
    range: { min: 0, max: 100 },
    step: 1,
    measurementUnit: '%'
  },
  phobos: {
    filter: 'blur',
    range: { min: 0, max: 3 },
    step: 0.1,
    measurementUnit: 'px'
  },
  heat: {
    filter: 'brightness',
    range: { min: 1, max: 3 },
    step: 0.1,
    measurementUnit: ''
  }
};
