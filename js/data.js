import {getRandomInteger, createRandomIdFromRangeGenerator, generateName} from './util.js';

function generateMessages() {
  const messageData = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const messages = [];
  const countMessages = getRandomInteger(1, 2);
  const generateMessageId = createRandomIdFromRangeGenerator(1, countMessages);
  for (let i = 0; i < countMessages; i++) {
    messages.push(messageData[generateMessageId() - 1]);
  }
  return messages.join(' ');
}

function generateComments(count) {
  const comments = [];
  const generateCommentId = createRandomIdFromRangeGenerator(1, 200);

  for (let i = 0; i < count; i++) {
    comments.push({
      id: generateCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: generateMessages(),
      name: generateName()
    });
  }

  return comments;
}

function generateObject(generatePhotoId) {
  const itemId = generatePhotoId();
  const minLikes = 15;
  const maxLikes = 200;
  const countComments = getRandomInteger(0, 30);

  return {
    id: `photo_id/${  itemId}`,
    url: itemId,
    description: 'Фото',
    likes: getRandomInteger(minLikes, maxLikes),
    comments: generateComments(countComments)
  };
}

function generateData(number = 25) {
  const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);

  const data = [];
  for (let i = 0; i < number; i++) {
    data.push(generateObject(generatePhotoId));
  }

  return data;
}

export {generateData};

