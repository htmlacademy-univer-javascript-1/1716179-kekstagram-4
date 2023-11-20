function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function generateName() {
  const dataName = [
    'Михаил', 'Александр', 'Максим', 'Марк', 'Артём', 'Лев', 'Матвей',
    'София', 'Анна', 'Мария', 'Ева', 'Виктория', 'Полина', 'Варвара'
  ];

  return dataName[getRandomInteger(0, dataName.length - 1)];
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';


export {getRandomInteger, createRandomIdFromRangeGenerator, generateName,
  isEscapeKey, isEnterKey};
