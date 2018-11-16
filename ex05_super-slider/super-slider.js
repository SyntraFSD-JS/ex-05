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
  
}

/**
 * @param imgElement {Element}
 * @param newWidth {number}
 * @returns {Element}
 */
function resizeImg(imgElement, newWidth) {
  // set imgElement.syle.width and -height
  // set imgElement.width
  // set imgElement.height
  const originalWidth = imgElement.clientWidth;
  const originalHeight = imgElement.clientHeight;
  imgElement.style.width = newWidth + 'px';
  imgElement.style.height = (newWidth * originalHeight / originalWidth) + 'px';

}

/**
 * @param element {Element}
 * @param containerWidth {number}
 * @returns {NodeListOf<Element>}
 */
function resizeImages(element, containerWidth2) {
  // resizeImg for all images
  // return images
  // loop > all images
  const images = element.querySelectorAll('img');

  for (let i = 0; i < images.length; i++) {
    resizeImg(images[i], containerWidth2);
  }

    // ....

  return images;
}

/**
 * @param element {Element}
 * @param images {NodeListOf<Element>}
 * @returns {Element}
 */
function makeSsSlide(element, images, containerWidth2) {
  // create ssSlide (see html document for correct structure)
  // add classes and index
  // append all images
  // return ssSlide
  const ssSlide = document.createElement('div');

  ssSlide.classList.add('ss-slide');
  ssSlide.dataset.index = '0';
  ssSlide.style.width = images.length * containerWidth2;
  for (let i = 0; i < images.length; i++) {
    ssSlide.appendChild(images[i]);
  }

  // const ssSlide = document.createElement('div');
  // add class add data-index
  // loop images > appendChild

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
  const arrow = document.createElement('div');
  arrow.classList.add("ss-arrow", "ss-" + leftRight);

  const fontAwesome = document.createElement('i');
  fontAwesome.classList.add("fas", "fa-angle-" +leftRight ,"fa-5x");
  arrow.appendChild(fontAwesome); 
  

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
bulletContainer.classList.add("ss-bullets");

  for(let i = 0; i < count; i++){
    const bullet = document.createElement('div');
    if(i == 0){
      bullet.classList.add("active");
    }
    bullet.classList.add("ss-bullet");
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
  //element //remove class
  element.classList.remove('loading');
  const containerWidth1 = element.clientWidth;
  const images = resizeImages(element, containerWidth1);
  element.appendChild(makeArrow("left"));
  element.appendChild(makeArrow("right"));
  const bullet = element.appendChild(makeBullets(images.length));
  const ssSlide = element.appendChild(makeSsSlide(element, images, containerWidth2));

  leftArrow.addEventListener('click', function(event){

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
