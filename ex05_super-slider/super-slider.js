const newSlider = document.querySelector('.super-slider');

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
  for(let i =0; i < bullets.children.length; i++) {
    const bullet = bullets.children[i];
    if (parseInt(bullet.dataset.index) === index){
      bullet.classList.add('active');
    } else {
      bullet.classList.remove('active');
    }
  }

}

/**
 * @param imgElement {Element}
 * @param newWidth {number}
 * @returns {Element}
 */
function resizeImg(imgElement, newWidth) {
  // set imgElement.syle.width and -height
  // set imgElement.width and height
  const originalWidth = imgElement.clientWidth;
  const originalHeight = imgElement.clientHeight
  const outerHeight = (newWidth * originalHeight / originalWidth) + 'px';
  imgElement.style.width = newWidth + 'px';
  imgElement.style.height = outerHeight;

}

/**
 * @param element {Element}
 * @param containerWidth {number}
 * @returns {NodeListOf<Element>}
 */
function resizeImages(element, containerWidth) {
  // resizeImg for all images
  // return images
  // loop all images
  const images = element.querySelectorAll ('img');
  for (let i = 0; i < images.length; i++){
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
  // create ssSlide (see html document for correct structure)
  // add classes and index
  // append all images
  // return ssSlide

  // document.creatElement('div');
  // add class add data index

  const ssSlide = document.createElement('div');
  ssSlide.classList.add('ss-slide');
  ssSlide.dataset.index ='0';
  ssSlide.style.width = (element.clientWidth * images.length) + 'px';
  for(let i = 0; i < images.length; i++) {
    const image = images[i];
    ssSlide.appendChild(image);
  }
  ssSlide.style.width = element.clientHeightWidth

  return ssSlide;
}

/**
 * @param leftRight {string}
 * @returns {Element}
 */
function makeArrow(leftRight) {
  // make new arrow (left or right)
  // add classes and font-awesome icon
  // see html
  // return the arrow

  // const arrow = document
    const arrow = document.createElement('div');
    arrow.classList.add('ss-arrow', 'ss-' + leftRight);
    arrow.innerHTML ='<i class="fas fa-angle-' + leftRight + ' fa-5x"></i>';
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
  const bulltContainer = document.createElement('div');
  bulltContainer.classList.add('ss-bullets');
  for (let i = 0; i< count; i++){
    const bullet = document.createElement('div');
    if (i===0) {
      bullet.classList.add('active');
    }
    bullet.classList.add('ss-bullet');
    bullet.dataset.index = i;
  bulltContainer.appendChild(bullet);

  }
  
  return bulltContainer;
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
  const images  = resizeImages(element, containerWidth);
  const ssSlide = element.appendChild(makeSsSlide(element, images));
  const leftArrow = element.appendChild(makeArrow('left'));
  const rightArrow = element.appendChild(makeArrow('right'));
  const bullets = element.appendChild(makeBullets(images.length))
  //const ssSlide = element appenchChiled(makeSssSlide(element, images));
  leftArrow.addEventListener('click' , function () {
    if (parseInt(ssSlide.dataset.index) > 0) {

    const newIndex = parseInt(ssSlide.dataset.index) - 1;
      console.log(ssSlide.dataset.index);
      slide(ssSlide, bullets, containerWidth, newIndex);

  }
});
rightArrow.addEventListener('click' , function() {
  if (parseInt(ssSlide.dataset.index) < images.length - 1) {
    const newIndex = parseInt(ssSlide.dataset.index) + 1;
    slide(ssSlide, bullets, containerWidth, newIndex);
  }
});
bullets.addEventListener('click', function(event) {
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


document.addEventListener('DOMContentLoaded', function () {
  superSlider(newSlider);
});
