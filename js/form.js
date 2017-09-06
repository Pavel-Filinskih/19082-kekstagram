'use strict';

(function () {

  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;
  var MAX_HASH_TAGS = 5;
  var MAX_LENGTH_TAG = 20;
  var STEP_SIZE = 25;
  var MIN_SCALE = '25%';
  var MAX_SCALE = '100%';

  var selectEffect = 'none';
  var currentEffect = null;
  var multiplier = 0;
  var units = '';

  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadResizeShow = document.querySelector('.upload-resize-controls-value');
  var uploadButtonMinus = document.querySelector('.upload-resize-controls-button-dec');
  var uploadButtonPlus = document.querySelector('.upload-resize-controls-button-inc');
  var uploadForm = document.querySelector('.upload-form');
  var uploadLevelVal = document.querySelector('.upload-effect-level-val');
  var uploadLevelLine = document.querySelector('.upload-effect-level-line');
  var uploadSliderPin = document.querySelector('.upload-effect-level-pin');
  var uploadEffectLine = document.querySelector('.upload-effect-level');
  var uploadEffects = document.querySelector('.upload-effect-controls');
  var uploadHashTags = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadDescription = document.querySelector('.upload-form-description');
  var uploadCancelForm = document.querySelector('.upload-form-cancel');
  var uploadFile = document.querySelector('#upload-file');
  var uploadControl = document.querySelector('.upload-control');
  var uploadImagePreview = document.querySelector('.effect-image-preview');

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
    uploadHashTags.setAttribute('style', 'border-width: 2px; border-color: red');
  };

  var notErrorTag = function () {
    uploadHashTags.setAttribute('style', 'background: auto;');
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
    uploadSliderPin.style.left = 0 + 'px';
    uploadLevelVal.style.width = 0 + 'px';
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
        uploadHashTags.setCustomValidity('Теги не должны повторяться!');
        showErrorTag();
        break;
      }
    }
  };

  var checkValueHashTags = function () {
    var tagsFieldValue = uploadHashTags.value;
    var listHashTag = tagsFieldValue.match(/\#[a-zA-Zа-яА-Я0-9\-]+/g);

    uploadHashTags.setCustomValidity('');

    if (tagsFieldValue.length === 0) {
      return;
    }

    if (listHashTag === null) {
      uploadHashTags.setCustomValidity('Первый символ должен быть решеткой');
      showErrorTag();
    } else {
      notErrorTag();

      var lengthListHashTags = listHashTag.length;
      if (lengthListHashTags > MAX_HASH_TAGS) {
        uploadHashTags.setCustomValidity('Нелья добавить больше 5 хеш-тегов');
        showErrorTag();
      } else {
        notErrorTag();
      }
    }

    for (var b = 0; b < lengthListHashTags; b++) {
      if (listHashTag[b].length > MAX_LENGTH_TAG) {
        uploadHashTags.setCustomValidity('Длина 1 тега не должна превышать 20 символов!');
        showErrorTag();
        break;
      }

      if (lengthListHashTags > 1) {
        checkSomeHashTag(listHashTag, b);
      }
    }
  };

  uploadHashTags.addEventListener('input', function () {
    checkValueHashTags();
  });

  /* Ползунок для регулирования (сила) эффекта применяемого к фотке */

  uploadSliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startX = evt.clientX;
    var sliderWidth = uploadLevelLine.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      var left = uploadSliderPin.offsetLeft - shiftX;

      if (left < 0) {
        left = 0;
      } else if (left > sliderWidth) {
        left = sliderWidth;
      }

      var filterValue = Math.round(left / sliderWidth * multiplier * 100) / 100;

      if (selectEffect === 'brightness') {
        filterValue += 1;
      }

      uploadImagePreview.style.filter = selectEffect + '(' + filterValue + units + ')';

      uploadSliderPin.style.left = left + 'px';
      uploadLevelVal.style.width = left + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  /* фильтры для ползунка */

  var switchEffect = function (currentFilter) {
    units = '';
    multiplier = 1;

    switch (currentFilter) {
      case 'chrome':
        selectEffect = 'grayscale';
        break;
      case 'sepia':
        selectEffect = 'sepia';
        break;
      case 'marvin':
        selectEffect = 'invert';
        break;
      case 'phobos':
        selectEffect = 'blur';
        units = 'px';
        multiplier = 10;
        break;
      case 'heat':
        selectEffect = 'brightness';
        multiplier = 3;
        break;
    }
    uploadImagePreview.style.filter = 'none';
    uploadSliderPin.style.left = 0;
  };

  var changeImageEffect = function (effect) {
    uploadImagePreview.classList.remove(currentEffect);
    currentEffect = 'effect-' + effect.value;
    uploadImagePreview.classList.add(currentEffect);
    checkEffects();
    switchEffect(effect.value);
  };

  // смена эффекта у фотки

  uploadEffects.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'input') {
      changeImageEffect(target);
    }
  });

  /* Если фильтр не выбран (оригинал), то ползунок должен быть скрыт */

  window.gallery.hideElement(uploadEffectLine);

  var checkEffects = function () {
    if (uploadImagePreview.classList.contains('effect-none')) {
      window.gallery.hideElement(uploadEffectLine);
    } else {
      window.gallery.showElement(uploadEffectLine);
      uploadLevelVal.style.width = '0%';
    }
  };

})();
