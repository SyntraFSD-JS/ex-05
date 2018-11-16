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

    // we moeten de children updaten om bullet active te zetten
    for(let i = 0; i < bullets.children.length; i++) {
        const bullet = bullets.children[i];
        // wanneer class index? wanneer index bullet gelijk is aan index in functie (=index image)
        if (parseInt(bullet.dataset.index) === index) { //overloopt de children en kijkt naar index ervan
            // parseint omdat dataset een string returnt
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
    const originalWidth = imgElement.width;
    const originalHeight = imgElement.height;
    imgElement.style.width = newWidth + 'px';
    imgElement.style.height = (newWidth * originalHeight / originalWidth) + 'px';
}

/**
 * @param element {Element}
 * @param containerWidth {number}
 * @returns {NodeListOf<Element>}
 */
function resizeImages(element, containerWidth) {
    // resizeImg for all images
    // return images

//wrm 'img en niet de class super-slider? omdat hij zoekt in element en niet in document
// en element is beneden gedefinieerd als 'super-slider'
    /*images.foreach (function (img) {
        resizeImg(img, containerWidth);
    }) foreach: loopen over hetgeen voor '.foreach' staat;
    function = nieuwe functie die de foreach moet doen;
    moet op img w toegepast
    */
    const images = element.querySelectorAll('img');
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
    // create ssSlide (see html document for correct structure)
    // add classes and index
    // append all images
    // return ssSlide

    const ssSlide = document.createElement('div'); // we maken nieuwe div
    ssSlide.classList.add('ss-slide'); // voegen er class en index aan toe
    ssSlide.dataset.index = 0;
    ssSlide.style.width = (element.clientWidth * images.length) + 'px';

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        ssSlide.appendChild(image); //we add new image to child
    }

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
    // const arrow (div)... return arrow
    const arrow = document.createElement('div');
    arrow.classList.add('ss-arrow', 'ss-' + leftRight);
    arrow.innerHTML = '<i class = "fas fa-angle-' + leftRight + ' fa-5x"></i>';
    //innerHTML = welke code zit er in dat element? bij nieuw element is dat leeg, kunt daar insteken wat je wil
    // same reult -->
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
    //removeclass from element
    element.classList.remove('loading');
    const containerWidth = element.clientWidth;
    const images = resizeImages(element, containerWidth);
    const ssSlide = element.appendChild(makeSsSlide(element, images));
    const leftArrow = element.appendChild(makeArrow('left'));
    const rightArrow = element.appendChild(makeArrow('right'));
    const bullets = element.appendChild(makeBullets(images.length));
    leftArrow.addEventListener('click', function () {
        if (parseInt(ssSlide.dataset.index) > 0) {
            const newIndex = parseInt(ssSlide.dataset.index) - 1;
            console.log(ssSlide.dataset.index);
            slide(ssSlide, bullets, containerWidth, newIndex);
        }
    });
    rightArrow.addEventListener('click', function () {
        if (parseInt(ssSlide.dataset.index) < images.length - 1) {
            const newIndex = parseInt(ssSlide.dataset.index) + 1;
            console.log(ssSlide.dataset.index);
            slide(ssSlide, bullets, containerWidth, newIndex);
        }
    });
    bullets.addEventListener('click', function (event) {
        console.log(event.target); // kijk in inspect en dan zie je op welke index je geklikt hebt
        if (event.target.matches('.ss-bullet')){
            slide(ssSlide, bullets, containerWidth, parseInt(event.target.dataset.index));
        }
    })
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

/* die 'else' moet erbij omdat als de images nog niet geladen zijn
(zoals bijna altijd) de if statement false zal zijn en de images dus niet zullen geladen worden
en dus de functie ook niet) WANT de functie wordt pas geladen wnr de html is geladen (addeventlistener documentloaded)*/


document.addEventListener('DOMContentLoaded', function () {
    superSlider(newSlider);
});
