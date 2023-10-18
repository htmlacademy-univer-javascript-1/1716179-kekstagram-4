import {getRandomNumber, comments, names} from './util.js';

// Генерация комментариев
function generateRandomComment() {

  const randomComment = getRandomNumber(0, comments.length - 1);
  const comment = comments[randomComment];

  const randomName = getRandomNumber(0, names.length - 1);
  const name = names[randomName];
  const usedIds = [];
  let id = getRandomNumber(1, 1000000);

  while (usedIds.includes(id)) {
    id = getRandomNumber(1, 1000000);
  }
  usedIds.push(id);

  return {
    id: getRandomNumber(1, 1000000),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: comment,
    name: name
  };
}

// Генерация объектов от 1 до 25
function generatePhotoArray() {
  const photoArray = [];
  for (let i = 1; i <= 25; i++) {
    const numComments = getRandomNumber(0, 30);
    const comment = [];

    for (let j = 0; j < numComments; j++) {
      comment.push(generateRandomComment());
    }

    const photoObject = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: comment
    };

    photoArray.push(photoObject);
  }

  return photoArray;
}

const mekePhotoArray = () => generatePhotoArray();

export{mekePhotoArray};

