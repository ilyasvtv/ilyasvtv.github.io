window.addEventListener('DOMContentLoaded', () => {
    //slider
    const slides = document.querySelectorAll('.slider__item'),
          slidesField = document.querySelector('.slider__inner');

    setInterval( () => {
        slidesField.style.transform = `translate(-${window.getComputedStyle(slides[0]).width})`;

    }, 3500)

    slidesField.addEventListener('transitionend', () => {
        slidesField.appendChild(slidesField.firstElementChild);
        slidesField.style.transition = 'none';
        slidesField.style.transform = 'translate(0)';
        setTimeout(() => {
            slidesField.style.transition = 'all 0.5s';
        })
    })


    //parallax
    const layer = document.querySelector('.static-bg'),
          titleOfLayer = document.querySelector('.static-bg__title');

    window.addEventListener('scroll', () => {
        if (scrollY >= 877) {
            layer.classList.add('static-fixed')
        }
        if (scrollY <877) {
            layer.classList.remove('static-fixed')
        }

        if (scrollY > 1149 && scrollY < 3480) {
            titleOfLayer.style.opacity = '0.3';
        } else {
            titleOfLayer.style.opacity = '1';
        }
    })

    
































    


    
    // 
    // const scrollbar = document.querySelector('.scrollbar');

    // scrollbar.addEventListener('mouseover', () => {
    //     document.body.classList.add('1')
    // })
    // scrollbar.addEventListener('mouseout', () => {
    //     document.body.classList.remove('1')
    // })
    // 
})
