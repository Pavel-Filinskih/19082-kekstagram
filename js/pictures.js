'use strict';

var ENTER_KEY_CODE = 13;
var ESCAPE_KEY_CODE = 27;

var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryClose = document.querySelector('.gallery-overlay-close');
var overlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
var overlayLike = galleryOverlay.querySelector('.likes-count');
var overlayComment = galleryOverlay.querySelector('.comments-count');
var photoContainer = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture-template');

var INDEXPHOTO = 0;
var MAXPHOTOS = 26; // фоток в папке photos - 26!

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
  element.querySelector('.picture-likes').textContent = photo.likes;
  element.querySelector('.picture-comments').textContent = photo.comments.length;
  return element;
}

var cloneSlider = function (numbSlider) {
  for (i = 0; i < numbSlider; i++) {
    photoContainer.appendChild(getElementPic(userPhotos[i]));
  }
};

cloneSlider(MAXPHOTOS);

/* генерируем превьюшку */

var showGalleryPreview = function (item, index) {
  overlayImage.src = item[index].url;
  overlayLike.textContent = item[index].likes;
  overlayComment.textContent = item[index].comments;
};

showGalleryPreview(userPhotos, INDEXPHOTO);

/* выводим в превью лайки, коменты */

var previewPhoto = function (pic) {
  overlayImage.src = pic.src;
  overlayLike.textContent = pic.parentNode.querySelector('.picture-likes').textContent;
  overlayComment.textContent = pic.parentNode.querySelector('.picture-comments').textContent;
};

photoContainer.addEventListener('click', function (evt) {
  if (evt.target.src) {
    var clickPic = evt.target;
    previewPhoto(clickPic);
    showElement(galleryOverlay);
    evt.preventDefault();
  }
}, true);

/* подключаем обработчики откр и закр превью */

var showElement = function (elem) {
  elem.classList.remove('hidden');
};

var hideElement = function (elem) {
  elem.classList.add('hidden');
};

galleryClose.addEventListener('click', function () {
  hideElement(galleryOverlay);
});

galleryClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    hideElement(galleryOverlay);
  }
});

galleryClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE) {
    showElement(galleryClose);
  }
});

photoContainer.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    evt.preventDefault();
    var focusPic = evt.target.querySelector('img');
    previewPhoto(focusPic);
    showElement(galleryOverlay);
  }
});

document.addEventListener('keydown', function (evt) {
  if (!galleryOverlay.classList.contains('hidden')) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      hideElement(galleryOverlay);
    }
  }
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESCAPE_KEY_CODE && galleryOverlay.classList.contains('hidden') === false) {
    hideElement(galleryOverlay);
  }
});

hideElement(uploadOverlay);
