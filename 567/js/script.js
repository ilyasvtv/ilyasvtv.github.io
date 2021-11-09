document.addEventListener('DOMContentLoaded', () => {
    //change text on second screen
    const textOnScreen2 = document.getElementById('textOnScreen2');
    const oldTextForScreen2 = textOnScreen2.innerHTML;
    const newTextForScreen2 = (textOnScreen2.innerText.split("").splice(0, 67)).join('') + "...";


    window.addEventListener('resize', () => {
        if (innerHeight <= 500) {
            textOnScreen2.innerHTML = newTextForScreen2;
        } else if (innerHeight > 500) {
            textOnScreen2.innerHTML = oldTextForScreen2;
        }
    })

    
    //card-slider
    const slides = document.querySelectorAll('[data-anim="cards"]'),
          slidesField = document.querySelector('.hiring-cards'),
          next = document.getElementById('hiring-slider-forward'),
          prev = document.getElementById('hiring-slider-backward');

    let width = window.getComputedStyle(slides[0]).width;
        width = +width.slice(0, width.length - 2) + 20;
    let offset = 0;

    slidesField.style.width = 100 * slides.length + '%';

    next.addEventListener('click', () => {
        offset += width;
        if (offset === width * (slides.length - 3)) {
            next.classList.add('hide-arrow');
        } 
        if (offset !== 0) {
            prev.classList.remove('hide-arrow');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    })

    prev.addEventListener('click', () => {
        offset -= width;
        if (offset === 0) {
            prev.classList.add('hide-arrow');
        }
        if (offset !== width * (slides.length - 3)) {
            next.classList.remove('hide-arrow');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    })

    //show/hide arrow-buttons
    function checkButtons() {
        if (slidesField.children.length <= 3 || innerWidth < 450) {
            prev.classList.add('hide-arrow');
            next.classList.add('hide-arrow');  
        } else if (innerWidth > 450 && offset === 0) {
            next.classList.remove('hide-arrow');
            prev.classList.add('hide-arrow');
        } else if (innerWidth > 450) {
            next.classList.remove('hide-arrow');
            prev.classList.remove('hide-arrow');
        }
    }

    checkButtons();
    window.addEventListener('resize', () => {
        width = window.getComputedStyle(slides[0]).width;
        width = +width.slice(0, width.length - 2) + 20;
        checkButtons();
    })

    //touch evenet on mobile
    document.body.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX;
        touchstartY = e.changedTouches[0].screenY;
    }, false);
    
    document.body.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX;
        touchendY = e.changedTouches[0].screenY;
        handleGesture();
    }, false);
    
    //swipe cards on mobile
    function handleGesture() {
        const screen4 = document.querySelector('.screen-4');
        if (screen4.classList.contains('active') && touchendX < touchstartX) {
            if (offset === width * (slides.length - 1)) {
                return;
            }
            offset += width;
            slidesField.style.transform = `translateX(-${offset}px)`;
        }
    
        if (screen4.classList.contains('active') && touchendX > touchstartX) {
            if (offset === 0) {
                return;
            }
            offset -= width;
            slidesField.style.transform = `translateX(-${offset}px)`;
        }
    }
})