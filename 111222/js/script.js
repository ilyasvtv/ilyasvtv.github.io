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
          sliderWrapper = document.getElementById('hiring-slider'),
          prevArrow = document.getElementById('prevArrow'),
          nextArrow = document.getElementById('nextArrow'),
          collabCardsField = document.querySelector('.collab-cards');

    let width = 0;
    let offset = 0;
    let slidesFieldWidth = 0;
    let clicked = 0;
    let totalNumberOfClicks = 0;
    let sliderWrapperWidth = 0;
    let currentScreen = 0;
    let widthOfCollabCards = 0;
    let offsetOfCollabCards = 0;
    let totSwipes = 0;

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

    function getWidthOffset() {
        width = window.getComputedStyle(slides[0]).width;
        let marginRight = window.getComputedStyle(slides[0]).getPropertyValue("margin-right");
        marginRight = +marginRight.slice(0, marginRight.length - 2);
        if (innerWidth > 500) {
            width = +width.slice(0, width.length - 2) + marginRight;
        } else if (innerWidth <= 500) {
            width = +width.slice(0, width.length - 2) + marginRight - 1;
        }
        slidesFieldWidth = width * slides.length;
        slidesField.style.width = slidesFieldWidth + 'px';

        //for collab-cards
        if (innerWidth > 500) {
            widthOfCollabCards = parseInt(parseInt(window.getComputedStyle(collabCardsField).width) / 2) + 50;
        } else {
            widthOfCollabCards = parseInt(parseInt(window.getComputedStyle(collabCardsField).width) / 3) + 70;
        }
    }
    
    function resetClicks() {
        if (offset === 0) {
            clicked = 0;
        }
    }

    function resetSwipes() {
        currentSwipes = 0;
        curSwipes = 0;
        offsetOfCollabCards = 0;
        collabCardsField.style.transform = `translateX(-${offsetOfCollabCards}px)`;
    }

    function countSlidesToSwitch() {
        sliderWrapperWidth = window.getComputedStyle(sliderWrapper).width;
        sliderWrapperWidth = +sliderWrapperWidth.slice(0, sliderWrapperWidth.length - 2);
        totalNumberOfClicks = slidesFieldWidth - sliderWrapperWidth;
        totalNumberOfClicks = Math.ceil(totalNumberOfClicks / 360);

        //for collab-cards
        if (innerWidth > 500) {
            totSwipes = 1;
        } else {
            totSwipes = 2;
        }
    }

    setNumberOfOffers();
    getWidthOffset();
    countSlidesToSwitch();
    getShortText();
    checkButtons();

    next.addEventListener('mouseover', () => {
        next.classList.add('scale-arrow');
        nextArrow.style.fill = 'rgb(68, 12, 24)';
    })

    next.addEventListener('mouseleave', () => {
        next.classList.remove('scale-arrow');
        nextArrow.style.fill = '#92273f';
    })

    prev.addEventListener('mouseover', () => {
        prev.classList.add('scale-arrow');
        prevArrow.style.fill = 'rgb(68, 12, 24)';
    })

    prev.addEventListener('mouseleave', () => {
        prev.classList.remove('scale-arrow');
        prevArrow.style.fill = '#92273f';
    })
    
    next.addEventListener('click', () => {
        if (totalNumberOfClicks === clicked) {
            return;
        }
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
        if (offset === 0) {
            return;
        }
        offset -= width;
        if (offset < 0) {
            offset = 0;
        }
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
            if (currentScreen === 4) {
                offsetOfCollabCards = 0;
                collabCardsField.style.transform = `translateX(-${offsetOfCollabCards}px)`;
            }
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
        checkSizeOfTabs();
        setTimeout(() => {
            getWidthOffset();
            countSlidesToSwitch();
            checkButtons();
            resetClicks();
            resetSwipes();
            addTabsOnProductsAndHiring();
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
        swipeCollabCards();
    }, false);
    
    //swipe cards on mobile
    let totalSwipes = slides.length - 1;
    let currentSwipes = 0;
    function swipeCards() {
        if (innerWidth >= 777) {
            return;
        }
        const screen4 = document.querySelector('.screen-4');
        if (screen4.classList.contains('active') && touchendX < touchstartX) {
            if (currentSwipes === totalSwipes) {
                return;
            }
            offset += width;
            slidesField.style.transform = `translateX(-${offset}px)`;
            currentSwipes++;
        }
    
        if (screen4.classList.contains('active') && touchendX > touchstartX) {
            if (currentSwipes === 0) {
                return;
            }
            offset -= width;
            if (offset < 0) {
                offset = 0;
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            currentSwipes--;
        }
    }

    //swipe collab-cards on mobile/tablet
    let curSwipes = 0;
    function swipeCollabCards() {
        if (currentScreen !== 4 || innerWidth > 700) {
            return;
        }
        if (touchendX < touchstartX) {
            if (curSwipes === totSwipes) {
                return;
            }
            curSwipes++;
            offsetOfCollabCards += widthOfCollabCards;
            collabCardsField.style.transform = `translateX(-${offsetOfCollabCards}px)`;
        }
        if (touchendX > touchstartX) {
            if (curSwipes === 0) {
                return;
            }
            curSwipes--;
            offsetOfCollabCards -= widthOfCollabCards;
            if (offsetOfCollabCards < 0) {
                offsetOfCollabCards = 0;
            }
            collabCardsField.style.transform = `translateX(-${offsetOfCollabCards}px)`;
        }
    }


    //change "pages"
    const allScreens = document.querySelectorAll('.slide');
    const products = document.querySelector('.products');
    const hiring = document.querySelector('.hiring');
    const business = document.querySelector('.business');
    const roller = document.getElementById('roller');
    const rollerHiring = document.getElementById('rollerHiring');
    const rollerProducts = document.getElementById('rollerProducts');
    const rollerBusiness = document.getElementById('rollerBusiness');
    const arrowDown = document.querySelector('.arrow-down');
    const productsField = document.getElementById('productsField');
    const hiringField = document.getElementById('hiringField');
    const businessField = document.getElementById('businessField');
    const logo = document.querySelector('.logo');

    let up, down;

    function addTabsOnProductsAndHiring() {
        rollerHiring.style.width = `${hiring.clientWidth}px`
        rollerHiring.style.left = `calc(100% - ${(hiring.clientWidth + business.clientWidth + 15)}px)`
        rollerProducts.style.width = `${products.clientWidth}px`;
        rollerProducts.style.left = '0px';
        rollerBusiness.style.width = `${business.clientWidth + 10}px`;
        rollerBusiness.style.left = `calc(100% - ${business.clientWidth - 2}px)`;
    }

    function turnOffOpacityOfTabs() {
        rollerProducts.style.opacity = '0';
        rollerHiring.style.opacity = '0';
        rollerBusiness.style.opacity = '0';
    }

    function checkSizeOfTabs() {
        if (currentScreen === 1 || currentScreen === 2) {
            roller.style.width = `${products.clientWidth}px`;
            roller.style.left = '0px';
        } else if (currentScreen === 3) {
            if (innerWidth > 480) {
                roller.style.width = `${hiring.clientWidth}px`
                roller.style.left = `calc(100% - ${hiring.clientWidth + business.clientWidth + 15}px)`
            } else {
                roller.style.width = `${hiring.clientWidth - 10}px`
                roller.style.left = `calc(100% - ${hiring.clientWidth + business.clientWidth - 9}px)`
            }
        } else if (currentScreen === 4) {
            roller.style.width = `${business.clientWidth + 5}px`;
            roller.style.left = `calc(100% - ${business.clientWidth - 2}px)`;
        }
    }

    checkSizeOfTabs();
    addTabsOnProductsAndHiring();

    setTimeout(() => {
        checkSizeOfTabs();
        addTabsOnProductsAndHiring();
    }, 5000) //can be decreased

    hiringField.addEventListener('mouseover', () => {
        if (innerWidth < 500) {
            return;
        }
        if (currentScreen === 3) {
            roller.style.opacity = '0.7';
        }
        if (currentScreen !== 3) {
            rollerHiring.style.opacity = '0.5';
        }
    })

    hiringField.addEventListener('mouseleave', () => {
        if (innerWidth < 500) {
            return;
        }
        if (currentScreen === 3) {
            roller.style.opacity = '1';
        }
        if (currentScreen !== 3) {
            rollerHiring.style.opacity = '0';
        }
    })

    productsField.addEventListener('mouseover', () => {
        if (innerWidth < 500) {
            return;
        }
        if (currentScreen === 1 || currentScreen === 2) {
            roller.style.opacity = '0.7';
        }
        if (currentScreen !== 1 && currentScreen !== 2) {
            rollerProducts.style.opacity = '0.5';
        }
    })

    productsField.addEventListener('mouseleave', () => {
        if (innerWidth < 500) {
            return;
        }
        if (currentScreen === 1 || currentScreen === 2) {
            roller.style.opacity = '1';
        }
        if (currentScreen !== 1 && currentScreen !== 2) {
            rollerProducts.style.opacity = '0';
        }
    })

    businessField.addEventListener('mouseover', () => {
        if (innerWidth < 500) {
            return;
        }
        if (currentScreen === 4) {
            roller.style.opacity = '0.7';
        }
        if (currentScreen !== 4) {
            rollerBusiness.style.opacity = '0.5';
        }
    })

    businessField.addEventListener('mouseleave', () => {
        if (innerWidth < 500) {
            return;
        }
        if (currentScreen === 4) {
            roller.style.opacity = '1';
        }
        if (currentScreen !== 4) {
            rollerBusiness.style.opacity = '0';
        }
    })

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
        for (let i = 0; i < 5; i++) {
            document.body.classList.remove(`screen${i}`)
        }
        if (currentScreen === 0 || currentScreen === 3 || currentScreen === 4) {      
            statusBar[0].setAttribute("content", "#f3275b")
        }
        if (currentScreen === 1) {      
            statusBar[0].setAttribute("content", "#a35dc9")
        }
        if (currentScreen === 2) {      
            statusBar[0].setAttribute("content", "#53a2c9")
        }
        document.body.classList.add(`screen${currentScreen}`);
        turnOffOpacityOfTabs();
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
            if (innerWidth > 480) {
                roller.style.width = `${hiring.clientWidth}px`
                roller.style.left = `calc(100% - ${hiring.clientWidth + business.clientWidth + 15}px)`
            } else {
                roller.style.width = `${hiring.clientWidth - 10}px`
                roller.style.left = `calc(100% - ${hiring.clientWidth + business.clientWidth - 9}px)`
            }
        } else if (currentScreen === 4) {
            arrowDown.classList.add('hide-arrow');
            roller.style.width = `${business.clientWidth + 5}px`;
            roller.style.left = `calc(100% - ${business.clientWidth - 2}px)`;
        }
    }

    arrowDown.addEventListener('click', () => {
        changePages(true, false);
        arrowDown.classList.add('hide-arrow');
    })

    logo.addEventListener('click', () => {
        currentScreen = 0;
        changePages(false, false);
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
        for (let i = 0; i < 5; i++) {
            document.body.classList.remove(`screen${i}`);
        }
        turnOffOpacityOfTabs();
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
        for (let i = 0; i < 5; i++) {
            document.body.classList.remove(`screen${i}`);
        }
        turnOffOpacityOfTabs();
        document.body.classList.add(`screen${3}`);
        currentScreen = 3;     
        statusBar[0].setAttribute("content", "#f3275b");
        arrowDown.classList.add('hide-arrow');
        if (innerWidth > 480) {
            roller.style.width = `${hiring.clientWidth}px`
            roller.style.left = `calc(100% - ${hiring.clientWidth + business.clientWidth + 15}px)`
        } else {
            roller.style.width = `${hiring.clientWidth - 10}px`
            roller.style.left = `calc(100% - ${hiring.clientWidth + business.clientWidth - 9}px)`
        }
        checkButtons();
    })

    business.addEventListener('click', () => {
        allScreens.forEach(el => {
            el.classList.remove('active');
        })
        allScreens[4].classList.add('active');
        for (let i = 0; i < 5; i++) {
            document.body.classList.remove(`screen${i}`);
        }
        turnOffOpacityOfTabs();
        document.body.classList.add(`screen${4}`);
        currentScreen = 4;     
        statusBar[0].setAttribute("content", "#f3275b");
        arrowDown.classList.add('hide-arrow');
        roller.style.width = `${business.clientWidth + 5}px`;
        roller.style.left = `calc(100% - ${business.clientWidth - 2}px)`;
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