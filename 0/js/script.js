window.addEventListener('DOMContentLoaded', () => {
    const sliderButton = document.querySelector ('.hamburger__circle'),
          hamburger = document.querySelector ('.hamburger'),
          rightArea = document.querySelector ('.right-area'),
          leftArea = document.querySelector ('.left-area'),
          switchTheme = document.getElementById ('checkbox'),
          activeSection = document.querySelectorAll ('.hamburger__item'),
          themeInfo = document.getElementById(('themeinfo')),
          hamburgerSwitch = document.querySelector('.header__swt'),
          hamburgerSwitch2 = document.querySelector('.header__swt2');



    // const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop
    // window.addEventListener('scroll', () => {
    //     if (scrollPosition() >= 400) {
    //         hamburger.style.position = 'fixed';
    //         hamburger.style.width = `${leftArea.width.value}`;
    //     } else {
    //         hamburger.style.position = 'sticky';
    //         hamburger.style.width = '100%';
            
    //     }
    // })

    window.addEventListener('resize', () => {
        if ((window.innerWidth <= 1440) && (window.innerWidth > 768) &&  (hamburger.classList.value === 'hamburger closed') ){
            rightArea.style.width = '100%';
            leftArea.style.width = '100px';  
        } else if ((window.innerWidth <= 1440) && (window.innerWidth > 768) &&  (hamburger.classList.value === 'hamburger') ) {
            rightArea.style.width = '100%';
            leftArea.style.width = '276px';
        } else if ((window.innerWidth >= 1440) &&  (hamburger.classList.value === 'hamburger') ) {
            rightArea.style.width = '81.72%';
            leftArea.style.width = '18.28%';
        } else if ((window.innerWidth >= 1440) &&  (hamburger.classList.value === 'hamburger closed')) {
            rightArea.style.width = '95.42%';
            leftArea.style.width = '4.58%';
        } else if ((window.innerWidth <= 768) && (window.innerWidth > 425) &&  (hamburger.classList.value === 'hamburger') ) {
            rightArea.style.width = '88.26%';
            leftArea.style.width = '50px';
        }
      }, false);

    window.addEventListener('resize', () => {
        if ((window.innerWidth <=425 || window.innerWidth>768) && document.body.classList.value === 'lwr') {
            document.body.classList.remove('lwr');
        }
    })

    //switch theme
    switchTheme.addEventListener('change', () => {
        if (document.body.classList.value === 'light') {
            themeInfo.innerHTML = "Dark";
        } else {
            themeInfo.innerHTML = "Light";
        }
        document.body.classList.toggle('light')
    })

    // change active page
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
    //////
    console.log(window.innerWidth);
    //open and close sidebar  
    sliderButton.addEventListener('click', () => {
        if (window.innerWidth >=425 && window.innerWidth <= 768) {
            if (!(hamburger.classList.contains('closed'))) {
                // hamburger.classList.value === 'hamburger'
                document.body.classList.add('lwr');
            } else {
                document.body.classList.remove('lwr');
            }
        } else if (!(hamburger.classList.contains('closed'))) {
            if (window.innerWidth>1440) {
                rightArea.style.width = '95.42%';
                leftArea.style.width = '4.58%';
            } else if (window.innerWidth > 768) {
                rightArea.style.width = '100%%';
                leftArea.style.width = '100px';
            }
        } else {
            if (window.innerWidth>1440){
                rightArea.style.width = '81.72%';
                leftArea.style.width = '18.28%';
            } else if (window.innerWidth>768) {
                rightArea.style.width = '100%';
                leftArea.style.width = '276px';
            }      
        }
        hamburger.classList.toggle('closed');
        console.log(window.innerWidth);
    })


///mobile hamburger open/close button

window.addEventListener('resize', () => {
    if (window.innerWidth <=425 && hamburger.style.transform !== "translateY(-150%)") {
        hamburger.style.transform = "translateY(-150%)";
    } else if ((window.innerWidth >425) && (getComputedStyle(hamburgerSwitch).display === 'block') && (hamburger.style.transform !== "translateY(-150%)")) {
        hamburger.style.transform = "translateY(-150%)";
    } else if (window.innerWidth >425 && hamburger.style.transform !== "translateY(0%)"){
        hamburger.style.transform = "translateY(0%)";
    }
  }, false);

hamburgerSwitch.addEventListener ('click', () => {
    if (hamburger.style.transform === "translateY(-150%)") {
        hamburger.style.transform = "translateY(0%)";
        hamburgerSwitch2.style.opacity = '0';
        hamburgerSwitch.style.opacity = '1';
    } else {
        hamburger.style.transform = "translateY(-150%)";
        hamburgerSwitch2.style.opacity = '1';
        hamburgerSwitch.style.opacity = '0';
    }
})

hamburgerSwitch2.addEventListener ('click', () => {
    if (hamburger.style.transform === "translateY(-150%)") {
        hamburger.style.transform = "translateY(0%)";
        hamburgerSwitch2.style.opacity = '1';
        hamburgerSwitch.style.opacity = '0';
    } else {
        hamburger.style.transform = "translateY(-150%)";
        hamburgerSwitch2.style.opacity = '0';
        hamburgerSwitch.style.opacity = '1';
    }
})




// animation

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


















})