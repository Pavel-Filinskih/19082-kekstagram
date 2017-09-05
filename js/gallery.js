'use strict';

window.gallery = (function () {

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var photoContainer = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = document.querySelector('.gallery-overlay-close');

  /* подключаем обработчики откр и закр превьюшки */

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

  document.addEventListener('keydown', function (evt) {
    if (!galleryOverlay.classList.contains('hidden')) {
      if (evt.keyCode === ESCAPE_KEY_CODE) {
        hideElement(galleryOverlay);
      }
    }
  });

  photoContainer.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      evt.preventDefault();
      var focusPic = evt.target.querySelector('img');
      window.preview.previewPhoto(focusPic);
      showElement(galleryOverlay);
    }
  });

  photoContainer.addEventListener('click', function (evt) {
    if (evt.target.src) {
      var clickPic = evt.target;
      window.preview.previewPhoto(clickPic);
      showElement(galleryOverlay);
      evt.preventDefault();
    }
  }, true);

  return {
    showElement: function (elem) {
      showElement(elem);
    },
    hideElement: function (elem) {
      hideElement(elem);
    }
  };

})();
