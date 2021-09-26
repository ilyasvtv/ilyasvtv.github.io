document.addEventListener('DOMContentLoaded', () => {
    let loaded = false;
    //animation of title

    const letters = document.querySelectorAll('.title__letter');
    const title = document.querySelector('.title');

    let offsetX = 0;
    let offsetValueX;
    let offsetY;
    //distance between letters on mobile
    if (innerWidth < 650) {
        offsetValueX = Math.round(window.innerWidth * 0.05);
        offsetY = Math.round(window.innerHeight * 0.3);
    } else {
        offsetValueX = Math.round(window.innerWidth * 0.18);
        offsetY = Math.round(window.innerHeight * 0.3);
    } 
    
    letters.forEach(e => {
        e.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        offsetX += offsetValueX;
    })
    offsetX -= offsetValueX;
    title.style.transform = `translateX(-${offsetX/2}px)`;

    //appearing of logo
    setTimeout(() => {
        let opacityTimer = 0.2;
        letters.forEach(e => {
            opacityTimer += 0.75;
            e.style.transition = `all ${opacityTimer}s ease-out`;
            e.style.opacity = '1';
        })
    }, 1000)
    //appearing and animation of letters
    setTimeout(() => {
        title.style.transition = 'all 0.55s ease-out';
        title.style.transform = 'translate(0)';
        letters.forEach(e => {
            e.style.transition = 'all 0.55s ease-out';
            e.style.transform = `translate(0px, ${offsetY}px)`;
        })
    }, 3500)

    setTimeout(() => {
        letters.forEach(e => {
            e.style.transition = 'all 0.55s ease-out';
            e.style.transform = `translate(0px, 0px)`;
            e.style.fontSize = `25px`;
        })
    }, 4100)

    //end of title's animation

    const hidden = document.querySelectorAll('.hidden');
    setTimeout(() => {
        hidden.forEach(e => {
            e.classList.remove('hidden');
        })
    }, 5000)

    //appearing of logo and hamburger
    const logo = document.querySelector('.logo');
    const hamburger = document.querySelector('.hamburger');
    setTimeout(() => {
        hamburger.classList.remove('hidden');
        logo.style.transform = 'scaleX(1) translateY(0)';
    }, 5050)

    // function of getting circle area's width
    const getWidth = () => {
        widthOfCircleArea = [...window.getComputedStyle(document.querySelector('.info__circle')).width];
        widthOfCircleArea.splice(widthOfCircleArea.length-2, 2);
        widthOfCircleArea = +widthOfCircleArea.join('');
        return widthOfCircleArea;
    }
    //appearing of info-section
    const info = document.querySelector('.info');
    let widthOfCircleArea
    setTimeout(() => {
        info.style.display = 'flex';
        getWidth();
        loaded = true;
    }, 5200)

    window.addEventListener('resize', () => {
        getWidth();
    })

    //animation of circle
    const circle = document.querySelector('.circle');

    window.addEventListener('mousemove', (e) => {
        if (loaded) {
            if (innerWidth / 2 + widthOfCircleArea / 2 < e.clientX) {//right side 
                circle.style.transform = `translateX(${widthOfCircleArea / 2 - 16}px) scale(0.75)`;
                logo.style.transform = `translateX(-${((widthOfCircleArea / 2) * 0.04)}%) rotateY(${((widthOfCircleArea / 2) * 0.1533)}deg) translateZ(${((widthOfCircleArea / 2) * 0.014)}px)`
            } else if (innerWidth / 2 - widthOfCircleArea / 2 > e.clientX) {//left side
                circle.style.transform = `translateX(-${widthOfCircleArea / 2 - 16}px) scale(0.75)`;
                logo.style.transform = `translateX(${((widthOfCircleArea / 2) * 0.04)}%) rotateY(-${((widthOfCircleArea / 2) * 0.1533)}deg) translateZ(${((widthOfCircleArea / 2) * 0.014)}px)`
            } else if (e.clientX > innerWidth / 2) { //right side
                circle.style.transform = `translateX(${e.clientX - innerWidth / 2 - 16}px) scale(1)`;
                logo.style.transform = `translateX(-${((e.clientX - innerWidth / 2) * 0.04)}%) rotateY(${((e.clientX - innerWidth / 2) * 0.1533)}deg) translateZ(${((e.clientX - innerWidth / 2) * 0.014)}px)`
            } else if (e.clientX < innerWidth / 2) { //left side
                circle.style.transform = `translateX(-${innerWidth / 2 - e.clientX - 16}px) scale(1)`;
                logo.style.transform = `translateX(${((innerWidth / 2 - e.clientX) * 0.04)}%) rotateY(-${((innerWidth / 2 - e.clientX) * 0.1533)}deg) translateZ(${((innerWidth / 2 - e.clientX) * 0.014)}px)`
            }
        }
    })

    //click on hamburger
    const hamburgerInner = document.querySelector('.hamburger__inner');
    const hamburgerClick = document.querySelector('.hamburger-click');
    const topLine = document.querySelector('.top-line');
    const bottomLine = document.querySelector('.bottom-line');
    const firstLine = document.querySelector('.first-line');
    const secondLine = document.querySelector('.second-line');
    const thirdLine = document.querySelector('.third-line');

    hamburgerClick.addEventListener('mouseover', () => {
        hamburgerInner.style.transform = 'translate(-50%, -50%) scale(1.1)';
        topLine.style.transform = 'translateY(5px) rotate(45deg)';
        bottomLine.style.transform = 'translateY(-5px) rotate(-45deg)';
    })

    hamburgerClick.addEventListener('mouseout', () => {
        hamburgerInner.style.transform = 'translate(-50%, -50%) scale(1)';
        topLine.style.transform = 'translateY(0px) rotate(0deg)';
        bottomLine.style.transform = 'translateY(0px) rotate(0deg)';
    })

    hamburgerClick.addEventListener('click', () => {
        firstLine.classList.toggle('show');
        secondLine.classList.toggle('show');
        thirdLine.classList.toggle('show');
        logo.classList.toggle('hidden');
        info.classList.toggle('hidden');
        if (logo.classList.contains('hidden')) {
            hamburgerInner.style.width = '5000px';
            hamburgerInner.style.height = '5000px';
        } else {
            hamburgerInner.style.width = '35px';
            hamburgerInner.style.height = '35px';
            getWidth();
        }
        
    })

    
    





















})