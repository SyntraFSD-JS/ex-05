/**
 * @param ssSlide {Element}
 * @param bullets {Element}
 * @param width {number}
 * @param index {number}
 */
function slide(ssSlide, bullets, width, index) {
  // make the image slide:
  // change index of ssSlide
  // change left of ssSlide
  // set active class on correct .ss-bullet
  ssSlide.style.left = -(width * index) + 'px';
  ssSlide.dataset.index = index;
  for (let i = 0; i < bullets.children.length; i++) {
    const bullet = bullets.children[i];
    if (parseInt(bullet.dataset.index) === index) {
      bullet.classList.add('active');
    } else {
      bullet.classList.remove('active');
    }
  }
}

/**
 * @param imgElement {HTMLElement}
 * @param newWidth {number}
 * @returns {HTMLElement}
 */
function resizeImg(imgElement, newWidth) {
  // see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
  const originalWidth = imgElement.clientWidth;
  const originalHeight = imgElement.clientHeight;
  // original css => background-color
  // in js => style.backgroundColor
  imgElement.style.width = newWidth + 'px';
  imgElement.style.height = (newWidth * originalHeight / originalWidth) + 'px';
}

/**
 * @param element {HTMLElement}
 * @param containerWidth {number}
 * @returns {NodeListOf<HTMLElement>}
 */
function resizeImages(element, containerWidth) {
  const images = element.querySelectorAll('img');
  // images.forEach(function (img) {
  //   resizeImg(img, containerWidth);
  // });
  for (let i = 0; i < images.length; i++) {
    resizeImg(images[i], containerWidth);
  }
  return images;
}

/**
 * @param element {Element}
 * @param images {NodeListOf<Element>}
 * @returns {Element}
 */
function makeSsSlide(element, images) {
  const ssSlide = document.createElement('div');
  ssSlide.classList.add('ss-slide');
  ssSlide.dataset.index = '0';
  ssSlide.style.width = (element.clientWidth * images.length) + 'px';
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    ssSlide.appendChild(image);
  }

  return ssSlide;
}

/**
 * @param leftRight {string}
 * @returns {Element}
 */
function makeArrow(leftRight) {
  const arrow = document.createElement('div');
  arrow.classList.add('ss-arrow', 'ss-' + leftRight);
  arrow.innerHTML = '<i class="fas fa-angle-' + leftRight + ' fa-5x"></i>';
  // same result ->
  // const i = document.createElement('i');
  // i.classList.add('fa', 'fa-angle-left', 'fa-5x');
  // arrow.appendChild(i);
  return arrow;
}

/**
 * @param count {number}
 * @returns {Element}
 */
function makeBullets(count) {
  // make .ss-bullets
  // fill with count * .ss-bullet
  // see html
  // return bullets
  const bulletContainer = document.createElement('div');
  bulletContainer.classList.add('ss-bullets');
  for (let i = 0; i < count; i++) {
    const bullet = document.createElement('div');
    bullet.classList.add('ss-bullet');
    if (i === 0) {
      bullet.classList.add('active');
    }
    bullet.dataset.index = i;
    bulletContainer.appendChild(bullet);
  }
  return bulletContainer;
}

/**
 * @param element {Element}
 */
function init(element) {
  // remove loading class from element
  // resize images
  // append ssSlide, left and right arrow and bullets
  // add event listeners
  element.classList.remove('loading');
  const containerWidth = element.clientWidth;
  const images = resizeImages(element, containerWidth);
  const ssSlide = element.appendChild(makeSsSlide(element, images));
  const leftArrow = element.appendChild(makeArrow('left'));
  const rightArrow = element.appendChild(makeArrow('right'));
  const bullets = element.appendChild(makeBullets(images.length));
  // const ssSlide = element.appendChild(makeSsSlide(element, images));

  leftArrow.addEventListener('click', function () {
    if (parseInt(ssSlide.dataset.index) > 0) {
      const newIndex = parseInt(ssSlide.dataset.index) - 1;
      console.log(ssSlide.dataset.index);
      slide(ssSlide, bullets, containerWidth, newIndex);
    } else {
      slide(ssSlide, bullets, containerWidth, images.length - 1);
    }
  });

  rightArrow.addEventListener('click', function () {
    if (parseInt(ssSlide.dataset.index) < images.length - 1) {
      const newIndex = parseInt(ssSlide.dataset.index) + 1;
      console.log(ssSlide.dataset.index);
      slide(ssSlide, bullets, containerWidth, newIndex);
    } else {
      slide(ssSlide, bullets, containerWidth, 0);
    }
  });


  bullets.addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target.matches('.ss-bullet')) {
      slide(ssSlide, bullets, containerWidth, parseInt(event.target.dataset.index));
    }
  });
}

/**
 * @param element {Element}
 */
function preLoad(element) {
  // add loading icon when images are still loading
  // no need to edit
  element.classList.add('ss-container', 'loading');
}

/**
 * @param element {Element}
 */
function superSlider(element) {
  // checks if all images are loaded then initiates superSlider
  // no need to edit
  preLoad(element);
  const images = element.querySelectorAll('img');
  let imagesLoaded = 0;
  images.forEach(function (img) {
    if (img.complete) {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        init(element);
      }
    } else {
      img.addEventListener('load', function () {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
          init(element);
        }
      });
    }
  });
}

const newSlider = document.querySelector('.super-slider');

superSlider(newSlider);






