'use strict';

window.preview = (function () {

  var overlayImage = document.querySelector('.gallery-overlay-image');
  var overlayLike = document.querySelector('.likes-count');
  var overlayComment = document.querySelector('.comments-count');

  var INDEX_PHOTO = 0;

  /* генерируем превьюшку */

  var showGalleryPreview = function (item, index) {
    overlayImage.src = item[index].url;
    overlayLike.textContent = item[index].likes;
    overlayComment.textContent = item[index].comments;
  };

  /* выводим в превьюшку лайки, коменты */

  var previewPhoto = function (pic) {
    overlayImage.src = pic.src;
    overlayLike.textContent = pic.parentNode.querySelector('.picture-likes').textContent;
    overlayComment.textContent = pic.parentNode.querySelector('.picture-comments').textContent;
  };

  return {
    previewPhoto: function (pic) {
      previewPhoto(pic);
    },
    showGalleryPreview: function (item, index) {
      showGalleryPreview(window.userPhotos, INDEX_PHOTO);
    }
  };

})();
