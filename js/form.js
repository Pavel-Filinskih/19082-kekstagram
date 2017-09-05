'use strict';

(function () {

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var MAX_HASH_TAGS = 5;
  var MAX_LENGTH_TAG = 20;
  var STEP_SIZE = 25;
  var MIN_SCALE = '25%';
  var MAX_SCALE = '100%';

  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadResizeShow = document.querySelector('.upload-resize-controls-value');
  var uploadButtonMinus = document.querySelector('.upload-resize-controls-button-dec');
  var uploadButtonPlus = document.querySelector('.upload-resize-controls-button-inc');
  var uploadForm = document.querySelector('.upload-form');
  var uploadImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffects = document.querySelector('.upload-effect-controls');
  var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadDescription = document.querySelector('.upload-form-description');
  var uploadCancelForm = document.querySelector('.upload-form-cancel');

  var uploadFile = document.querySelector('#upload-file');
  var uploadControl = document.querySelector('.upload-control');

  /* форма кадрирования загруженого фото */

  uploadCancelForm.addEventListener('click', function () {
    resetForm();
    window.gallery.hideElement(uploadOverlay);
  });

  uploadCancelForm.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      resetForm();
      window.gallery.hideElement(uploadOverlay);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE_KEY_CODE) {
      resetForm();
      window.gallery.hideElement(uploadOverlay);
    }
  });

  uploadFile.addEventListener('change', function (evt) {
    window.gallery.showElement(uploadOverlay);
  });

  uploadControl.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      uploadFile.click();
    }
  });

  var activeDescriptionForm = function () {
    uploadDescription.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESCAPE_KEY_CODE) {
        evt.stopPropagation();
      }
    });
  };

  activeDescriptionForm();

  /* валидация формы */

  var showErrorTag = function () {
    hashTags.setAttribute('style', 'border-width: 2px; border-color: red');
  };

  var notErrorTag = function () {
    hashTags.setAttribute('style', 'background: auto;');
  };

  var showErrorDescription = function (evt) {
    var element = evt.target;
    var description = uploadDescription.value.length;

    if (description < 30) {
      element.setAttribute('style', 'border-width: 2px; border-color: red');
    } else {
      element.setAttribute('style', 'background: auto;');
    }
  };

  uploadDescription.addEventListener('input', showErrorDescription);

  /* сброс значений в полях формы */

  var resetForm = function () {
    uploadDescription.value = '';
    uploadDescription.setAttribute('style', 'box-shadow: none');
    uploadImagePreview.style = 'transform: scale(1)';
    uploadResizeShow.setAttribute('value', '100%');
    uploadForm.reset();
    nonePhotoFilter();
  };

  var filterSearchRemove = function (classFilter) {
    if (uploadImagePreview.classList.contains(classFilter)) {
      uploadImagePreview.classList.remove(classFilter);
    }
  };

  var nonePhotoFilter = function () {
    if (!uploadImagePreview.classList.contains('filter-none')) {
      uploadImagePreview.classList.add('filter-none');

      var effectPhoto = {
        chrome: 'effect-chrome',
        sepia: 'effect-sepia',
        marvin: 'effect-marvin',
        phobos: 'effect-phobos',
        heat: 'effect-heat'
      };

      filterSearchRemove(effectPhoto.chrome);
      filterSearchRemove(effectPhoto.sepia);
      filterSearchRemove(effectPhoto.marvin);
      filterSearchRemove(effectPhoto.phobos);
      filterSearchRemove(effectPhoto.heat);
    }
  };

  /* изменение масштаба фотки */

  var calculateImageSize = function (size, sign) {
    var stepSize;
    var sizeValue;

    if (uploadResizeShow.value !== size) {
      stepSize = sign === 1 ? STEP_SIZE : -STEP_SIZE;
      sizeValue = parseInt(uploadResizeShow.value, 10) + stepSize;
      uploadResizeShow.setAttribute('value', sizeValue + '%');
      uploadImagePreview.style.transform = 'scale(' + sizeValue / 100 + ')';
    }
  };

  var filterMinusBtn = function (evt) {
    calculateImageSize(MIN_SCALE, 0);
  };

  var filterPlusBtn = function (evt) {
    calculateImageSize(MAX_SCALE, 1);
  };

  uploadButtonMinus.addEventListener('click', filterMinusBtn);
  uploadButtonPlus.addEventListener('click', filterPlusBtn);

  /* фильтры для фотки */

  uploadEffects.addEventListener('click', function () {
    var target = event.target;

    if (target.checked) {
      uploadImagePreview.className = 'effect-image-preview effect-' + target.value;
    }
  });

  /* хэштеги фотки */

  var checkSomeHashTag = function (listTags, index) {
    var lengthListTags = listTags.length;

    for (var a = 1; a < lengthListTags; a++) {
      if (listTags[a] === listTags[index] && a !== index) {
        hashTags.setCustomValidity('Теги не должны повторяться!');
        showErrorTag();
        break;
      }
    }
  };

  var checkValueHashTags = function () {
    var tagsFieldValue = hashTags.value;
    var listHashTag = tagsFieldValue.match(/\#[a-zA-Zа-яА-Я0-9\-]+/g);

    hashTags.setCustomValidity('');

    if (tagsFieldValue.length === 0) {
      return;
    }

    if (listHashTag === null) {
      hashTags.setCustomValidity('Первый символ должен быть решеткой');
      showErrorTag();
    } else {
      notErrorTag();

      var lengthListHashTags = listHashTag.length;
      if (lengthListHashTags > MAX_HASH_TAGS) {
        hashTags.setCustomValidity('Нелья добавить больше 5 хеш-тегов');
        showErrorTag();
      } else {
        notErrorTag();
      }
    }

    for (var b = 0; b < lengthListHashTags; b++) {
      if (listHashTag[b].length > MAX_LENGTH_TAG) {
        hashTags.setCustomValidity('Длина 1 тега не должна превышать 20 символов!');
        showErrorTag();
        break;
      }

      if (lengthListHashTags > 1) {
        checkSomeHashTag(listHashTag, b);
      }
    }
  };

  hashTags.addEventListener('input', function () {
    checkValueHashTags();
  });

})();
