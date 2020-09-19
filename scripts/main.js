var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";
var ESC_KEY = 27;

var currThumb = 0;

function showDetails() {
  "use strict";
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function addPrevClickHandler(prevBtn) {
  "use strict";
  prevBtn.addEventListener("click", function (event) {
    event.preventDefault();
    prev();
  });
}

function addNextClickHandler(nextBtn) {
  "use strict";
  nextBtn.addEventListener("click", function (event) {
    event.preventDefault();
    next();
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var prev = document.querySelector("#prev-btn");
  addPrevClickHandler(prev);

  var next = document.querySelector("#next-btn");
  addNextClickHandler(next);

  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

function next() {
  var thumbArr = getThumbnailsArray();
  var nextThumb = 0;

  if (currThumb < thumbArr.length - 1) {
    currThumb += 1;
  } else {
    currThumb = 0;
  }

  nextThumb = currThumb;

  setDetailsFromThumb(thumbArr[nextThumb]);
  showDetails();
}

function prev() {
  var thumbArr = getThumbnailsArray();
  var nextThumb = 0;

  if (currThumb > 0) {
    currThumb -= 1;
  } else {
    currThumb = 4;
  }

  nextThumb = currThumb;

  setDetailsFromThumb(thumbArr[nextThumb]);
  showDetails();
}

initializeEvents();
