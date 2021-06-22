window.addEventListener('DOMContentLoaded', () => {
    const sliderButton = document.querySelector ('.button-circle'),
          leftAreaID = document.getElementById ('leftArea'),
          hamburger = document.querySelector ('.hamburger'),
          hamburgerLinks = document.querySelector('.hamburger__links'),
          rightArea = document.querySelector ('.right-area'),
          leftArea = document.querySelector ('.left-area'),
          switchTheme = document.getElementById ('checkbox'),
          activeSection = document.querySelectorAll ('.hamburger__item'),
          headerSwitch = document.querySelector('.header__switch'),
          themeInfo = document.getElementById(('themeinfo')),
          footer = document.querySelector('.footer'),
          hamburgerSwitch = document.querySelector('.header__swt'),
          hamburgerSwitch2 = document.querySelector('.header__swt2');



    //change of left and right areas on change size of window
    window.addEventListener('resize', () => {
        if ((window.innerWidth <= 1440) && (window.innerWidth > 768) &&  (hamburger.classList.contains('closed')) ){
            rightArea.style.width = '100%';
            leftArea.style.width = '100px';  
        } else if ((window.innerWidth <= 1440) && (window.innerWidth > 768) &&  (!hamburger.classList.contains('closed')) ) {
            rightArea.style.width = '100%';
            leftArea.style.width = '276px';
        } else if ((window.innerWidth >= 1440) &&  (!hamburger.classList.contains('closed')) ) {
            rightArea.style.width = '81.72%';
            leftArea.style.width = '18.28%';
        } else if ((window.innerWidth >= 1440) &&  (hamburger.classList.contains('closed'))) {
            rightArea.style.width = '95.42%';
            leftArea.style.width = '4.58%';
        } else if ((window.innerWidth <= 768) && (window.innerWidth > 425) &&  (!hamburger.classList.contains('closed')) ) {
            rightArea.style.width = '88.26%';
            leftArea.style.width = '60px';
        }
      }, false);

      window.addEventListener('resize', () => {
        if ((window.innerWidth <= 768) && (window.innerWidth > 425) && hamburger.classList.contains('closed') && !document.body.classList.contains('lwr')){
            hamburger.classList.remove('closed');
            leftAreaID.classList.remove('closedButton');
        }
      }, false);

    //sidebar at full-screen between 425px and 768px
    window.addEventListener('resize', () => {
        if ((window.innerWidth <=425 || window.innerWidth>768) && document.body.classList.contains('lwr')) {
            document.body.classList.remove('lwr');
            footer.classList.remove('ccc');
        }
    })

    //switch light and dark themes
    switchTheme.addEventListener('change', () => {
        if (document.body.classList.contains('light')) {
            themeInfo.innerHTML = "Dark";
        } else {
            themeInfo.innerHTML = "Light";
        }
        document.body.classList.toggle('light')
    })

    // change active page at side-bar
    let elemToPaint = 0;
    activeSection.forEach (item => {
        item.addEventListener ('click', () => {
            elemToPaint = item;
            activeSection.forEach (item => {
                item.classList.remove ('active');
            })
            elemToPaint.classList.add ('active');
        })
    })


    //open and close sidebar 
    sliderButton.addEventListener('click', () => {
        if (window.innerWidth >=425 && window.innerWidth <= 768) {
            if (!(hamburger.classList.contains('closed'))) {
                document.body.classList.add('lwr');
                footer.classList.add('ccc');
            } else {
                document.body.classList.remove('lwr');
                footer.classList.remove('ccc');
            }
        } else if (!(hamburger.classList.contains('closed'))) {
            if (window.innerWidth>1440) {
                rightArea.style.width = '95.42%';
                leftArea.style.width = '4.58%';
                footer.classList.add('nnn');
            } else if (window.innerWidth > 768) {
                rightArea.style.width = '100%';
                leftArea.style.width = '100px';
                footer.classList.add('nnn');
            }
        } else {
            if (window.innerWidth>1440){
                rightArea.style.width = '81.72%';
                leftArea.style.width = '18.28%';
                footer.classList.remove('nnn');
            } else if (window.innerWidth>768) {
                rightArea.style.width = '100%';
                leftArea.style.width = '276px';
                footer.classList.remove('nnn');
            }      
        }
        hamburger.classList.toggle('closed');
        leftAreaID.classList.toggle('closedButton');
    })


//open and close side-bar on mobile
hamburgerSwitch2.addEventListener ('click', () => {
    if (!hamburger.classList.contains('yyy')) {
        hamburger.classList.add('yyy');
        hamburgerSwitch2.classList.add('lll');
        hamburgerSwitch.classList.remove('lll');
        headerSwitch.classList.add('lll-');
    } else {
        hamburger.classList.remove('yyy');
        hamburgerSwitch2.classList.remove('lll');
        hamburgerSwitch.classList.add('lll');
        headerSwitch.classList.remove('lll-');
    }
})



// animation (appearing of text)
const animItems = document.querySelectorAll('.anim-items');


if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 20;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('active-animation');
            } else if (!animItem.classList.contains('one-time-animation')) {
                animItem.classList.remove('active-animation');
            }
        }
    }
    function offset (el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}




//scroll wheel on side-bar at height of window below 669px
window.addEventListener('resize', () => {
    if (window.innerHeight<669 && !hamburger.classList.contains('zzz')) {
        hamburger.classList.add('zzz');
        sliderButton.classList.add('kkk');
        hamburgerLinks.classList.add('ooo');
    } else if (window.innerHeight>669 && hamburger.classList.contains('zzz')) {
        hamburger.classList.remove('zzz');
        sliderButton.classList.remove('kkk');
        hamburgerLinks.classList.remove('ooo');
    }
})

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0 && !hamburger.classList.contains('zzz-zzz') && window.innerHeight<669) {
        hamburger.classList.add('zzz-zzz');
    } else if (window.pageYOffset === 0 && hamburger.classList.contains('zzz-zzz') && window.innerHeight<669){
        hamburger.classList.remove('zzz-zzz');
    }
})

window.addEventListener('resize', () => {
    if (window.innerHeight>669 && hamburger.classList.contains('zzz-zzz')) {
        hamburger.classList.remove('zzz-zzz');
    } else if (window.innerHeight<=669 && !hamburger.classList.contains('zzz-zzz')) {
        hamburger.classList.add('zzz-zzz');
    }
})


setTimeout(() => {
    if ((window.innerWidth <= 1440) && (window.innerWidth > 768) &&  (hamburger.classList.contains('closed')) ){
        rightArea.style.width = '100%';
        leftArea.style.width = '100px';  
    } else if ((window.innerWidth <= 1440) && (window.innerWidth > 768) &&  (!hamburger.classList.contains('closed')) ) {
        rightArea.style.width = '100%';
        leftArea.style.width = '276px';
    }
    if (window.innerHeight<669 && !hamburger.classList.contains('zzz')) {
        hamburger.classList.add('zzz');
        sliderButton.classList.add('kkk');
        hamburgerLinks.classList.add('ooo');
    } else if (window.innerHeight>669 && hamburger.classList.contains('zzz')) {
        hamburger.classList.remove('zzz');
        sliderButton.classList.remove('kkk');
        hamburgerLinks.classList.remove('ooo');
    }
    if (window.pageYOffset > 0 && !hamburger.classList.contains('zzz-zzz') && window.innerHeight<669) {
        hamburger.classList.add('zzz-zzz');
    } else if (window.pageYOffset === 0 && hamburger.classList.contains('zzz-zzz') && window.innerHeight<669){
        hamburger.classList.remove('zzz-zzz');
    }
}, 100)











})