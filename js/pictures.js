'use strict';

var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');
var OverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
var OverlayLike = galleryOverlay.querySelector('.likes-count');
var OverlayComment = galleryOverlay.querySelector('.comments-count');
var photoContainer = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture-template');

var INDEXPHOTO = 0;
var MAXPHOTOS = 25;

var MINLIKES = 15;
var MAXLIKES = 200;

/* задаем параметры фоткам */

var userPhotos = [];

var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function randomLikes(min, max) {
  return (Math.random() * (max - min) + min).toFixed(0);
}

function randomComments(arr) {
  return (Math.floor(Math.random() * arr.length - 1)).toFixed(0);
}

var userPhotoOptions = function () {
  userPhotos[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: randomLikes(MINLIKES, MAXLIKES),
    comments: randomComments(userComments)
  };

  return userPhotos;
};

for (var i = 0; i < MAXPHOTOS; i++) {
  userPhotoOptions();
}

/* генерируем dom элементы */

function getElementPic(photo) {
  var element = photoTemplate.content.cloneNode(true);
  var pic = element.querySelector('img');
  pic.src = userPhotos[i].url;
  return element;
}

var cloneSlider = function (numbSlider) {
  for (i = 0; i < numbSlider; i++) {
    photoContainer.appendChild(getElementPic(userPhotos[i]));
  }
};

cloneSlider(MAXPHOTOS);

/* генерируем превьюшку */

function showGalleryPreview(item, index) {
  OverlayImage.src = item[index].url;
  OverlayLike.textContent = item[index].likes;
  OverlayComment.textContent = item[index].comments;
}

showGalleryPreview(userPhotos, INDEXPHOTO);

uploadOverlay.classList.add('hidden');
galleryOverlay.classList.remove('hidden');
