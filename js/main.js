// Генерация случайного числа
const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Генерация комментариев
function generateRandomComment() {
  const comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  const randomComment = getRandomNumber(0, comments.length - 1);
  const comment = comments[randomComment];


  const names = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];

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
    const comments = [];

    for (let j = 0; j < numComments; j++) {
      comments.push(generateRandomComment());
    }

    const photoObject = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Описание фотографии',
      likes: getRandomNumber(15, 200),
      comments: comments
    };

    photoArray.push(photoObject);
  }

  return photoArray;
}

const photos = generatePhotoArray();
console.log(photos);
