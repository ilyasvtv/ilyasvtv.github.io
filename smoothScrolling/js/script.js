document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');

    //page's scrolling
    function scrollPage() {
        content.style.transform = `translate3d(0px, -${scrollY}px, 0px)`
    }

    scrollPage();
    //scroll page on scroll event
    window.addEventListener('scroll', () => {
        scrollPage();
    });

    function setBodyHeight() {
        document.body.style.height = window.getComputedStyle(content).height;
    }

    setBodyHeight();

    window.addEventListener('resize', () => {
        setBodyHeight();
    })
    
    //logo's animation
    const logo = document.querySelector('.logo');
    let newLogo = '';
    [...logo.innerText].forEach(el => {
        newLogo += `<div>${el}</div>`
    });
    logo.innerHTML = newLogo;
    
    let logoAnimationDelay = false;
    function logoAnimation() {
        if (logoAnimationDelay) return;
        logoAnimationDelay = true;
        let distanceBot = -2.5;
        let distanceTop = 2.5;
        let timer = 100;
        [...logo.children].forEach(el => {
            el.style.transform = `translateY(${distanceBot}px)`;
            el.style.transition = '0.2s';
            distanceBot += 0.5;
            setTimeout(() => {
                el.style.transform = `translateY(${distanceTop}px)`;
                distanceTop -= 0.5
            }, timer)
            setTimeout(() => {
                el.style.opacity = '0';
            }, timer)
            timer += 20;
            setTimeout(() => {
                el.style.opacity = '1';
            }, timer + 150)
            setTimeout(() => {
                el.style.transform = `translateY(0px)`;
            }, timer + 200)
        });

        setTimeout(() => {
            logoAnimationDelay = false;
        }, 700)
    }

    logo.addEventListener('mouseenter', () => {
        logoAnimation()
    })
    // end the logo's animation
    
    //4-buttons circle
    const circle = document.querySelector('.promo__selector');
    const quarts = document.querySelectorAll('.quart');
    const buttonShadows = {
        0 : '#3aff6b',
        1 : '#1cf7ff',
        2 : '#963aff',
        3 : '#ffde24',
    }
    let circleButtonsDelay = false;
    quarts.forEach((el, i) => {
        el.addEventListener('click', () => {
            if (circleButtonsDelay) return;
            circle.style.transform = 'rotate(360deg)';
            circle.style.transition = '0.35s ease';
            quarts[0].style.boxShadow = `-30px -30px 90px 10px ${buttonShadows[i]}`;
            quarts[1].style.boxShadow = `30px -30px 90px 10px ${buttonShadows[i]}`;
            quarts[2].style.boxShadow = `-30px 30px 90px 10px ${buttonShadows[i]}`;
            quarts[3].style.boxShadow = `30px 30px 90px 10px ${buttonShadows[i]}`;
            circleButtonsDelay = true;
            let prevText = el.children[0].innerText;
            el.children[0].innerText = 'Clicked';
            setTimeout(() => {
                el.children[0].innerText = prevText;
                circle.removeAttribute('style');
                quarts.forEach(el => {
                    el.removeAttribute('style');
                })
                circleButtonsDelay = false;
            }, 500)
        })
    })

    //parallax
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');
    window.addEventListener('scroll', () => {
        if (scrollY > 300) {
            document.body.style.background = '#000';
            document.body.style.transition = 'all 1s';
        } else {
            document.body.style.background = '';
        }
        if (scrollY > 1130 && scrollY < parseInt(window.getComputedStyle(rightSide).height) + 1300) {
            leftSide.style.transform = `translateY(${scrollY - 1130}px)`;
            leftSide.style.transition = '0.1s linear';
        }
    })

    //product-section
    const authors = document.querySelectorAll('.author');
    const infoAboutAuthors = document.querySelectorAll('.authors-info');
    const underlines = document.querySelectorAll('.underline')

    authors.forEach((author, i) => {
        author.addEventListener('click', () => {
            //hide all underlines
            authors.forEach((author, i) => {
                underlines[i].classList.remove('underline-shifted');
            })
            //hide all block with info
            infoAboutAuthors.forEach(info => {
                info.classList.remove('info-show');
            })
            //show certain info
            infoAboutAuthors.forEach((info, g) => {
                if (i === g) info.classList.add('info-show');
            })
            //certain underline
            underlines[i].classList.add('underline-shifted');
        })
    })



    // animation (appearing of text)
    const animationItems = document.querySelectorAll('.toAnimate');
    if (animationItems.length > 0) {
        window.addEventListener('scroll', animateOnScroll);
        function animateOnScroll() {
            for (let i = 0; i < animationItems.length; i++) {
                const animationItem = animationItems[i];
                const animationItemOffset = animationItem.getBoundingClientRect().top + window.scrollY;
                
                if (scrollY > animationItemOffset - window.innerHeight + 50 && !animationItem.classList.contains('animated')) {
                    animationItem.classList.add('animated');
                }
            }
        }
        setTimeout(() => {
            animateOnScroll();
        }, 300);
    }

    //accordeon
    const accordBtns = document.querySelectorAll('.contacts-accordeon__btn');
    const accordTexts = document.querySelectorAll('.contacts-accordeon__text');
    const arrows = document.querySelectorAll('.arrow');
    const textHeightsArr = [];

    accordBtns.forEach((el, i) => {
        //get max height of the el and add it to array
        textHeightsArr.push(accordTexts[i].clientHeight);
        //set height to inline (without this, the first click on the accord item goes without a smooth transition)
        accordTexts[i].style.height = '0px';
        el.addEventListener('click', () => {
            if (accordTexts[i].clientHeight === 0) {
                accordTexts[i].style.height = `${textHeightsArr[i]}px`;
            } else {
                accordTexts[i].style.height = '0px';
            }
            //rotate arrows on click
            arrows[i].style.transform = accordTexts[i].clientHeight === 0 ? 'rotate(90deg)' : 'rotate(0deg)';
        })
    })

    window.addEventListener('resize', () => {
        //responsive for accordeon
        setTimeout(() => {
            accordBtns.forEach((el, i) => {
                //get last height before changing height
                let lastHeight = accordTexts[i].clientHeight;
                //set height of each elem in the accordeon to fit-content
                accordTexts[i].style.height = 'fit-content';
                //change all max heights of all elements in the array to new max heights
                textHeightsArr[i] = accordTexts[i].clientHeight;
                //return previous condition of each elem of the accordeon (to 0 px or to new height in px)
                accordTexts[i].style.height = lastHeight === 0 ? '0px' : `${accordTexts[i].clientHeight}px`;
            })
        }, 10)
    })



























})