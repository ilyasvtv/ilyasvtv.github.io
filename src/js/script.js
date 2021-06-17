window.addEventListener('DOMContentLoaded', () => {
    const sliderButton = document.querySelector ('.hamburger__circle'),
          hamburger = document.querySelector ('.hamburger'),
          arrow = document.getElementById ('arrow'),
          rightArea = document.querySelector ('.right-area'),
          leftArea = document.querySelector ('.left-area');
    console.log(window.innerWidth)
    sliderButton.addEventListener('click', () => {
        if (hamburger.classList.value === 'hamburger') {
            arrow.style.transform = 'translate(-50%, -50%) scale(-1)';
            if (window.innerWidth > 1500) {
                rightArea.style.width = '95.42%';
                leftArea.style.width = '4.58%';
            } else {
                rightArea.style.width = '90.42%';
                leftArea.style.width = '9.58%';
            }

        } else {       
            arrow.style.transform = 'translate(-50%, -50%) scale(1)';
            if (window.innerWidth > 1500) {
                rightArea.style.width = '81.72%';
                leftArea.style.width = '18.28%';
            } else {
                rightArea.style.width = '60%';
                leftArea.style.width = '40%';
            }
        }
        hamburger.classList.toggle('closed');
    })

































})