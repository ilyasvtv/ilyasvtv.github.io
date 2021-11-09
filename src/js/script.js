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
    getWidthOffset();
    let offset = 0;

    function getWidthOffset () {
        if (innerWidth >= 500) {
            width = +width.slice(0, width.length - 2) + 20;
        } else {
            width = +width.slice(0, width.length - 2) + 25;
        }
        return width;
    }

    slidesField.style.width = 100 * slides.length + '%';

    next.addEventListener('click', () => {
        offset += width;
        if (offset === width * (slides.length - 2)) {
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
        if (offset !== width * (slides.length - 2)) {
            next.classList.remove('hide-arrow');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    })

    //show/hide arrow-buttons
    function checkButtons() {
        if (slidesField.children.length <= 3 || innerWidth < 500) {
            prev.classList.add('hide-arrow');
            next.classList.add('hide-arrow');  
        } else if (innerWidth >= 500 && offset === 0) {
            next.classList.remove('hide-arrow');
            prev.classList.add('hide-arrow');
        } else if (innerWidth >= 500) {
            next.classList.remove('hide-arrow');
            prev.classList.remove('hide-arrow');
        }
    }

    checkButtons();
    window.addEventListener('resize', () => {
        width = window.getComputedStyle(slides[0]).width;
        getWidthOffset();
        checkButtons();
    })

    //touch evenet on mobile
    let touchstartX, touchendX;
    document.body.addEventListener('touchstart', (e) => {
        touchstartX = e.changedTouches[0].screenX;
    }, false);
    
    document.body.addEventListener('touchend', (e) => {
        touchendX = e.changedTouches[0].screenX;
        swipeCards();
    }, false);
    
    //swipe cards on mobile
    function swipeCards() {
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


    //change "pages"
    const allScreens = document.querySelectorAll('.slide');
    const products = document.querySelector('.products');
    const hiring = document.querySelector('.hiring');
    const roller = document.getElementById('roller');
    let up, down;
    let currentScreen = 0;

    function changeClass(up, down) {
        allScreens.forEach(el => {
            el.classList.remove('active');
        })
        if (currentScreen !== 0 && down) {
            currentScreen--;
        }
        if (currentScreen !== allScreens.length - 1 && up) {
            currentScreen++;
        }
        allScreens[currentScreen].classList.add('active');
        for (let i = 0; i < 4; i++) {
            document.body.classList.remove(`screen${i}`)
        }
        document.body.classList.add(`screen${currentScreen}`)
        if (currentScreen === 0) {
            roller.style.width = '0px';
            roller.style.left = '0px';
        } else if (currentScreen === 1 || currentScreen === 2) {
            roller.style.width = `${hiring.clientWidth + 17}px`;
            roller.style.left = '0px';
        } else if (currentScreen === 3) {
            roller.style.width = `${hiring.clientWidth + 6}px`
            roller.style.left = `calc(100% - ${hiring.clientWidth + 6}px)`
        }
    }

    let animationDelay = false;
    window.addEventListener('wheel', (e) => {
        if (animationDelay) {
            return;
        }
        animationDelay = true;
        if (e.deltaY > 0) {
            up = true;
            down = false;
        } else if (e.deltaY < 0) {
            up = false;
            down = true;
        }
        changeClass(up, down);
        setTimeout(() => {
            animationDelay = false;
        }, 1000)
    })

    products.addEventListener('click', () => {
        allScreens.forEach(el => {
            el.classList.remove('active');
        })
        allScreens[1].classList.add('active');
        for (let i = 0; i < 4; i++) {
            document.body.classList.remove(`screen${i}`);
        }
        document.body.classList.add(`screen${1}`);
        currentScreen = 1;
        roller.style.width = `${hiring.clientWidth + 17}px`;
        roller.style.left = '0px';
    })

    hiring.addEventListener('click', () => {
        allScreens.forEach(el => {
            el.classList.remove('active');
        })
        allScreens[3].classList.add('active');
        for (let i = 0; i < 4; i++) {
            document.body.classList.remove(`screen${i}`);
        }
        document.body.classList.add(`screen${3}`);
        currentScreen = 3;
        roller.style.width = `${hiring.clientWidth}px`
        roller.style.left = `calc(100% - ${hiring.clientWidth}px)`
    })







})