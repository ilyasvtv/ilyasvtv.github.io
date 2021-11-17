document.addEventListener('DOMContentLoaded', () => {
    const statusBar = document.getElementsByName("theme-color");
    const fadeBlock = document.querySelector('.screens');
    //change text on second screen
    const textOnScreen2 = document.getElementById('textOnScreen2');
    const textOnScreen3 = document.getElementById('textOnScreen3');
    const oldTextForScreen2 = textOnScreen2.innerHTML;
    const newTextForScreen2 = (textOnScreen2.innerText.split("").splice(0, 67)).join('') + "...";
    const oldTextForScreen3 = textOnScreen3.innerHTML;
    const newTextForScreen3 = (textOnScreen3.innerText.split("").splice(0, 67)).join('') + "...";
    const numberOfOffers = document.getElementById('numberOfOffers');
    
    //card-slider
    const slides = document.querySelectorAll('[data-anim="cards"]'),
          slidesField = document.querySelector('.hiring-cards'),
          next = document.getElementById('hiring-slider-forward'),
          prev = document.getElementById('hiring-slider-backward'),
          sliderWrapper = document.getElementById('hiring-slider');

    let width = 0;
    let offset = 0;
    let slidesFieldWidth = 0;
    let clicked = 0;
    let totalNumberOfClicks = 0;
    let sliderWrapperWidth = 0;
    let currentScreen = 0;

    function setNumberOfOffers() {
        numberOfOffers.innerHTML = slides.length;
    }

    function getShortText() {
        if (innerHeight <= 500) {
            textOnScreen2.innerHTML = newTextForScreen2;
            textOnScreen3.innerHTML = newTextForScreen3;
        } else if (innerHeight > 500) {
            textOnScreen2.innerHTML = oldTextForScreen2;
            textOnScreen3.innerHTML = oldTextForScreen3;
        }
    }

    function getWidthOffset () {
        width = window.getComputedStyle(slides[0]).width;
        let marginRight = window.getComputedStyle(slides[0]).getPropertyValue("margin-right");
        marginRight = +marginRight.slice(0, marginRight.length - 2);
        width = +width.slice(0, width.length - 2) + marginRight;
        slidesFieldWidth = width * slides.length;
        slidesField.style.width = slidesFieldWidth + 'px';
    }
    
    function resetClicks () {
        if (offset === 0) {
            clicked = 0;
        }
    }
    function countSlidesToSwitch() {
        sliderWrapperWidth = window.getComputedStyle(sliderWrapper).width;
        sliderWrapperWidth = +sliderWrapperWidth.slice(0, sliderWrapperWidth.length - 2);
        totalNumberOfClicks = slidesFieldWidth - sliderWrapperWidth;
        totalNumberOfClicks = Math.ceil(totalNumberOfClicks / 360);
    }

    setNumberOfOffers();
    getWidthOffset();
    countSlidesToSwitch();
    getShortText();
    checkButtons();
    
    next.addEventListener('click', () => {
        offset += width;
        clicked++;
        if (totalNumberOfClicks === clicked) {
            next.classList.remove('show-arrow');
        } 
        if (offset !== 0) {
            prev.classList.add('show-arrow');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    })

    prev.addEventListener('click', () => {
        offset -= width;
        clicked--;
        if (offset === 0) {
            prev.classList.remove('show-arrow');
        }
        if (totalNumberOfClicks !== clicked) {
            next.classList.add('show-arrow');
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    })

    //show/hide arrow-buttons
    function checkButtons() {
        if (currentScreen !== 3) {
            fadeBlock.classList.remove('fade');
            next.classList.remove('show-arrow');
            prev.classList.remove('show-arrow');
            return;
        }
        fadeBlock.classList.add('fade');
        if (slidesField.children.length <= 3 || innerWidth < 500) {
            offset = 0;
            slidesField.style.transform = `translateX(-${offset}px)`;
            prev.classList.remove('show-arrow');
            next.classList.remove('show-arrow');  
        } else if (innerWidth >= 500 && offset === 0) {
            next.classList.add('show-arrow');
            prev.classList.remove('show-arrow');
        } else if(offset !== 0 && innerWidth >= 500) {
            offset = 0;
            slidesField.style.transform = `translateX(-${offset}px)`;
            next.classList.add('show-arrow');
            prev.classList.remove('show-arrow');
        }
    }

    window.addEventListener('transitionend', () => {
        resetClicks();
    })
    
    window.addEventListener('resize', () => {
        getShortText();
        setTimeout(() => {
            getWidthOffset();
            countSlidesToSwitch();
            checkButtons();
            resetClicks();
        }, 500)
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
        if (innerWidth >= 500) {
            return;
        }
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
    const arrowDown = document.querySelector('.arrow-down');

    let up, down;

    function changePages(up, down) {
        allScreens.forEach(el => {
            el.classList.remove('active');
        })
        if (currentScreen !== 0 && down) {
            currentScreen--;
        }
        if (currentScreen !== allScreens.length - 1 && up) {
            currentScreen++;
        }
        checkButtons();
        allScreens[currentScreen].classList.add('active');
        for (let i = 0; i < 4; i++) {
            document.body.classList.remove(`screen${i}`)
        }
        if (currentScreen === 0 || currentScreen === 3) {      
            statusBar[0].setAttribute("content", "#f3275b")
        }
        if (currentScreen === 1) {      
            statusBar[0].setAttribute("content", "#a35dc9")
        }
        if (currentScreen === 2) {      
            statusBar[0].setAttribute("content", "#53a2c9")
        }
        document.body.classList.add(`screen${currentScreen}`)
        if (currentScreen === 0) {
            arrowDown.classList.remove('hide-arrow');
            roller.style.width = '0px';
            roller.style.left = '0px';
        } else if (currentScreen === 1 || currentScreen === 2) {
            arrowDown.classList.add('hide-arrow');
            roller.style.width = `${products.clientWidth}px`;
            roller.style.left = '0px';
        } else if (currentScreen === 3) {
            arrowDown.classList.add('hide-arrow');
            roller.style.width = `${hiring.clientWidth}px`
            roller.style.left = `calc(100% - ${hiring.clientWidth}px)`
        }
    }

    arrowDown.addEventListener('click', () => {
        changePages(true, false);
        arrowDown.classList.add('hide-arrow');
    })

    let animationDelay = false;
    const wheelEvent = 'onwheel' in document ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
    window.addEventListener(wheelEvent, (e) => {
        if (animationDelay) {
            return;
        }
        animationDelay = true;
        let delta = Math.max(-1, Math.min(1, (e.deltaY || -e.detail)));
        if (delta > 0) {
            up = true;
            down = false;
        } else if (delta < 0) {
            up = false;
            down = true;
        }
        changePages(up, down);
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
        statusBar[0].setAttribute("content", "#a35dc9");
        arrowDown.classList.add('hide-arrow');
        roller.style.width = `${products.clientWidth}px`;
        roller.style.left = '0px';
        checkButtons();
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
        statusBar[0].setAttribute("content", "#f3275b");
        arrowDown.classList.add('hide-arrow');
        roller.style.width = `${hiring.clientWidth}px`
        roller.style.left = `calc(100% - ${hiring.clientWidth}px)`
        checkButtons();
    })

    let touchstartY, touchendY, angle;
    document.body.addEventListener('touchstart', (e) => {
        touchstartY = e.changedTouches[0].screenY;
    }, false);
    
    document.body.addEventListener('touchend', (e) => {
        touchendY = e.changedTouches[0].screenY;
        changePagesOnMobile();
    }, false);

    function changePagesOnMobile() { 
        if (animationDelay) {
            return;
        }
        //safe from undesirable swipes with cards
        if (touchendY > touchstartY) {
            angle = Math.atan2(touchendY, touchstartY);
        } else {
            angle = Math.atan2(touchstartY, touchendY);
        }
        if (angle < 0.85) {
            return;
        }
        animationDelay = true;
        if (touchendY < touchstartY) {
            up = true;
            down = false;
        } else if (touchendY > touchstartY) {
            up = false;
            down = true;
        }
        changePages(up, down);
        setTimeout(() => {
            animationDelay = false;
        }, 1000)
    }
})