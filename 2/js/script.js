window.addEventListener('DOMContentLoaded', () => {
    const sliderButton = document.querySelector ('.hamburger__circle'),
          hamburger = document.querySelector ('.hamburger'),
          arrow = document.querySelector('.arrowbtn'),
          rightArea = document.querySelector ('.right-area'),
          leftArea = document.querySelector ('.left-area'),
          switchTheme = document.getElementById ('checkbox'),
          activeSection = document.querySelectorAll ('.hamburger__item'),
          active = document.querySelectorAll ('.linkto');

    window.addEventListener('change', () => {
        if (window.innerWidth <= 1440) {
            leftArea.style.width = 'width: 19.1%';
            rightArea.style.width = 'width: 80.9%';
        }
    })
    /////
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

    /////
    //switch theme
    switchTheme.addEventListener('change', () => {
        document.body.classList.toggle('dark')
    })

    ///////

    // activeSection.forEach ((e) => {
    //     e.addEventListener('click', () => {
    //         active.forEach ((e) => {
    //             if (e.classList.value === 'linkto active') {
    //                 e.classList.value = 'linkto';
    //             }
    //         })
    //         e.classList.value = 'linkto active';
    //     })
    // })
    console.log(window.innerWidth);
    //open and close hamburger    
    sliderButton.addEventListener('click', () => {
        if (hamburger.classList.value === 'hamburger') {
                rightArea.style.width = '95.42%';
                leftArea.style.width = '4.58%';
        } else {
            if (window.innerWidth>1441){
                rightArea.style.width = '81.72%';
                leftArea.style.width = '18.28%';
            } else if (window.innerWidth<1442) {
                rightArea.style.width = '80.9%';
                leftArea.style.width = '19.1%';
            }
            
        }
        hamburger.classList.toggle('closed');
    })

































})