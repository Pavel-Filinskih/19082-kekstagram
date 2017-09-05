'use strict';

window.picture = (function () {

  var MAXPHOTOS = 26; // фоток в папке photos - 26!
  var photoContainer = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture-template');

  /* генерируем dom элементы */

  function getElementPic(arrPhoto) {
    var elementTemplate = photoTemplate.content.cloneNode(true);

    elementTemplate.querySelector('img').src = arrPhoto.url;
    elementTemplate.querySelector('.picture-likes').textContent = arrPhoto.likes;
    elementTemplate.querySelector('.picture-comments').textContent = arrPhoto.comments.length;

    return elementTemplate;
  }

  function includePhotos() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAXPHOTOS; i++) {
      fragment.appendChild(getElementPic(window.data[i]));
    }

    photoContainer.appendChild(fragment);
  }

  includePhotos();

})();
