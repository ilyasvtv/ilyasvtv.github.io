window.addEventListener('DOMContentLoaded', () => {
    const sliderButton = document.querySelector ('.header__swt0'),
          sliderButton0 = document.querySelector ('.header__swt000'),
          hamburger = document.querySelector ('.hamburger'),
          hamburgerLinks = document.querySelector('.hamburger__links'),
          rightArea = document.querySelector ('.right-area'),
          switchTheme = document.getElementById ('checkbox'),
          switchTheme0 = document.getElementById ('checkbox0'),
          activeSection = document.querySelectorAll ('.hamburger__item'),
          header = document.querySelector ('.header'),
          footer = document.querySelector('.footer__block'),
          hamburgerSwitch = document.querySelector('.header__swt'),
          hamburgerSwitch0 = document.querySelector('.header__swt111'),
          hamburgerButton1 = document.getElementById ('13'),
          subLinksItem = document.querySelectorAll ('.item-link'),
          subLinksto = document.querySelector('.subLinksto'),
          settings = document.getElementById('19');


    
    //change of left and right areas on change size of window
    // window.addEventListener('resize', () => {
    //     if ((window.innerWidth <= 1440) && (window.innerWidth > 768) &&  (hamburger.classList.contains('closed')) ){
    //         rightArea.classList.add('closedMain');
    //         hamburger.classList.add('closed');
    //     } else if ((window.innerWidth <= 1440) && (window.innerWidth > 768) &&  (!hamburger.classList.contains('closed')) ) {
    //         rightArea.style.width = '100%';
    //         leftArea.style.width = '276px';
    //         footerSpace.style.width = '276px';
    //         footerArea.style.width = '100%';
    //     } else if ((window.innerWidth >= 1440) &&  (!hamburger.classList.contains('closed')) ) {
    //         rightArea.style.width = '81.72%';
    //         leftArea.style.width = '18.28%';
    //         footerSpace.style.width = '18.28%';
    //         footerArea.style.width = '81.72%';
    //     } else if ((window.innerWidth >= 1440) &&  (hamburger.classList.contains('closed'))) {
    //         rightArea.style.width = '95.42%';
    //         leftArea.style.width = '4.58%';
    //         footerSpace.style.width = '4.58%';
    //         footerArea.style.width = '95.42%';
    //     } else if ((window.innerWidth <= 768) && (window.innerWidth > 425) &&  (!hamburger.classList.contains('closed')) ) {
    //         rightArea.style.width = '86.26%';
    //         leftArea.style.width = '60px';
    //         footerSpace.style.width = '60px';
    //         footerArea.style.width = '86.26%';
    //     }
    //   }, false);

    //   window.addEventListener('resize', () => {
    //     if ((window.innerWidth <= 768) && (window.innerWidth > 425) && footerArea.classList.contains('nnn')){
    //         footerArea.classList.remove('nnn');
    //     }
    //   }, false);

      window.addEventListener('resize', () => {
        if ((window.innerWidth <= 768) && (window.innerWidth > 425) && hamburger.classList.contains('closed') && !rightArea.classList.contains('lwr')){
            hamburger.classList.remove('closed');
            hamburger.classList.remove('closedButton');
        }
      }, false);

    //sidebar at full-screen between 425px and 768px
    window.addEventListener('resize', () => {
        if ((window.innerWidth <=425 || window.innerWidth>768) && hamburger.classList.contains('closed') && !rightArea.classList.contains('lwr')) {
            rightArea.classList.add('lwr');
            footer.classList.add('ccc');
        }
    })

    //switch light and dark themes
    switchTheme.addEventListener('change', () => {
        document.body.classList.toggle('light')
    })
    switchTheme0.addEventListener('change', () => {
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
            if(!elemToPaint.classList.contains("nn")){
                elemToPaint.classList.add ('active');
            }
        })
    })

    subLinksItem.forEach(item => {
        item.addEventListener('click', () => {
            elemToPaint = item;
            subLinksItem.forEach (item => {
                item.classList.remove ('kkkkk');
            })
            elemToPaint.classList.add ('kkkkk'); 
        })
    })

    //open and close sidebar 
    sliderButton.addEventListener('click', () => {
        if (window.innerWidth >=425 && window.innerWidth <= 768) {
            if (!(hamburger.classList.contains('closed'))) {
                rightArea.classList.add('lwr');
                footer.classList.add('ccc');
            } else {
                rightArea.classList.remove('lwr');
                footer.classList.remove('ccc');
            }
        }
        hamburger.classList.toggle('closed');
        hamburger.classList.toggle('closedButton');
        rightArea.classList.toggle('closedMain');
        footer.classList.toggle('closedMain');
        sliderButton.classList.toggle('obb');
        sliderButton0.classList.toggle('obb');
    })

    sliderButton0.addEventListener('click', () => {
        if (window.innerWidth >=425 && window.innerWidth <= 768) {
            if (!(hamburger.classList.contains('closed'))) {
                rightArea.classList.add('lwr');
                footer.classList.add('ccc');
            } else {
                rightArea.classList.remove('lwr');
                footer.classList.remove('ccc');
            }
        }
        hamburger.classList.toggle('closed');
        hamburger.classList.toggle('closedButton');
        rightArea.classList.toggle('closedMain');
        footer.classList.toggle('closedMain');
        sliderButton.classList.toggle('obb');
        sliderButton0.classList.toggle('obb');
    })

    
    settings.addEventListener('click', () => {
        if (hamburger.classList.contains('closed') && window.innerWidth > 768 ) {
            hamburger.classList.remove('closed');
            hamburger.classList.remove('closedButton');
            rightArea.classList.remove('closedMain');
            footer.classList.remove('closedMain');
        } else if (window.innerWidth >=425 && window.innerWidth <= 768) {
            rightArea.classList.add('lwr');
            footer.classList.add('ccc');
            hamburger.classList.add('closed');
            hamburger.classList.add('closedButton');
            rightArea.classList.add('closedMain');
            footer.classList.add('closedMain');
        }
    })


    hamburgerButton1.addEventListener('click', () => {
        subLinksto.classList.toggle('oo');
    })

//open and close side-bar on mobile
hamburgerSwitch.addEventListener ('click', () => {
    if (!hamburger.classList.contains('yyy')) {
        hamburger.classList.add('yyy');
    } else {
        hamburger.classList.remove('yyy');
    }
    hamburgerSwitch.style.display = "none";
    hamburgerSwitch0.style.display = "block";
})

hamburgerSwitch0.addEventListener ('click', () => {
    if (!hamburger.classList.contains('yyy')) {
        hamburger.classList.add('yyy');
    } else {
        hamburger.classList.remove('yyy');
    }
    hamburgerSwitch0.style.display = "none";
    hamburgerSwitch.style.display = "block";
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
    if (window.innerHeight<720 && !hamburger.classList.contains('zzz')) {
        hamburger.classList.add('zzz');
        sliderButton.classList.add('kkk');
        hamburgerLinks.classList.add('ooo');
    } else if (window.innerHeight>720 && hamburger.classList.contains('zzz')) {
        hamburger.classList.remove('zzz');
        sliderButton.classList.remove('kkk');
        hamburgerLinks.classList.remove('ooo');
    }
})


let lastScroll = 0;
const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
    if(scrollPosition() > lastScroll && !hamburger.classList.contains('zzz-zzz')) {
        hamburger.classList.add('zzz-zzz');
        header.classList.add('zzz-ooo');
    } else if(scrollPosition() < lastScroll && hamburger.classList.contains('zzz-zzz')) {
        hamburger.classList.remove('zzz-zzz');
        header.classList.remove('zzz-ooo');
    }
    lastScroll = scrollPosition();
})

setTimeout(() => {
    if (window.innerHeight<669 && !hamburger.classList.contains('zzz')) {
        hamburger.classList.add('zzz');
        sliderButton.classList.add('kkk');
        hamburgerLinks.classList.add('ooo');
    } else if (window.innerHeight>669 && hamburger.classList.contains('zzz')) {
        hamburger.classList.remove('zzz');
        sliderButton.classList.remove('kkk');
        hamburgerLinks.classList.remove('ooo');
    }
}, 100)











})