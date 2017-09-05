'use strict';

window.data = (function () {
  var MAXPHOTOS = 26; // фоток в папке photos - 26!
  var MINLIKES = 15;
  var MAXLIKES = 200;

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
    for (var i = 0; i < MAXPHOTOS; i++) {
      userPhotos[i] = {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: randomLikes(MINLIKES, MAXLIKES),
        comments: randomComments(userComments)
      };
    }
    return userPhotos;
  };

  userPhotoOptions();

  return userPhotos;

})();
