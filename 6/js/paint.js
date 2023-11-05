// Модуль thumbnailsModule.js
export function renderThumbnails() {
  const pictureTemplate = document.querySelector('#picture');
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  // Ваши временные данные для разработки
  const photos = [
    {
      imageUrl: 'адрес изображения 1',
      description: 'описание изображения 1',
      likes: 10,
      comments: 5,
    },
    {
      imageUrl: 'адрес изображения 2',
      description: 'описание изображения 2',
      likes: 15,
      comments: 8,
    },
    // Дополнительные фотографии...
  ];

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.content.cloneNode(true);

    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = photo.imageUrl;
    imgElement.alt = photo.description;

    const likesElement = pictureElement.querySelector('.picture__likes');
    likesElement.textContent = photo.likes;

    const commentsElement = pictureElement.querySelector('.picture__comments');
    commentsElement.textContent = photo.comments;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}
