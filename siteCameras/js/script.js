window.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider1__img'),
          slidesWrapper = document.querySelector('.slider1__slider'),
          slidesField = document.querySelector('.slider1__inner'),
          width = window.getComputedStyle(slidesWrapper).width,
          next = document.querySelector('.slider1__next'),
          prev = document.querySelector('.slider1__prev'),
          lineElement = document.querySelectorAll('.slider1__line-item'),
          sliderInfo = document.querySelectorAll('.slider1-info');

    let slideIndex = 0;
    let offset = 0;

    // Получаем общую ширину слайдера
    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => {
        slide.style.width = width;
    })

    // Смена фотографии при нажатии на правую полоину слайдера
    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 0;
            // Смена кнопки
            lineElement[slideIndex].style.background = `red`;
            lineElement[slides.length-1].style.background = `white`;
            // Смена блока с информацией
            sliderInfo[slideIndex].style.display = `block`;
            sliderInfo[slides.length-1].style.display = `none`;
        } else {
            offset += +width.slice(0, width.length - 2);
            slideIndex++;
            // Смена кнопки
            lineElement[slideIndex].style.background = `red`;
            lineElement[slideIndex-1].style.background = `white`;
            // Смена блока с информацией
            sliderInfo[slideIndex].style.display = `block`;
            sliderInfo[slideIndex-1].style.display = `none`;
        }

    // Смена фотографии на слайдере
       slidesField.style.transform = `translateX(-${offset}px)`;

    })

    // Смена фотографии при нажатии на левую половину слайдера
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            slideIndex = slides.length-1;
            // Смена кнопки
            lineElement[slideIndex].style.background = `red`;
            lineElement[0].style.background = `white`;
            // Смена блока с информацией
            sliderInfo[slideIndex].style.display = `block`;
            sliderInfo[0].style.display = `none`;
        } else {
            offset -= +width.slice(0, width.length - 2);
            slideIndex--;
            // Смена кнопки
            lineElement[slideIndex].style.background = `red`;
            lineElement[slideIndex+1].style.background = `white`;
            // Смена блока с информации
            sliderInfo[slideIndex].style.display = `block`;
            sliderInfo[slideIndex+1].style.display = `none`;
        }

     // Смена фотографии
       slidesField.style.transform = `translateX(-${offset}px)`;
    })

    // Смена фотографии по кнопке на нижней панели
    function changePhoto(value) {
        // Обесцвечиваем кнопки
        lineElement.forEach(item => {
            item.style.background = `white`;
        })

        //Убираем блоки с информацией
        sliderInfo.forEach(item => {
            item.style.display = `none`;
        })

        // Красим кнопку, на которую нажали
        lineElement[value].style.background = `red`;

        // Отображаем блок с информацией текущего слайда
        sliderInfo[value].style.display = `block`;

        // Меняем фотографию на слайдере
        offset = +width.slice(0, width.length - 2) * (value);
        slidesField.style.transform = `translateX(-${offset}px)`;

        // Меняем значение переменной для корректной работы
        slideIndex = value;

    }

    //Обработчик события на каждую кнопку, которая вызывают функцию по смене фотографии
    lineElement.forEach(item => {
        item.addEventListener('click', () => {
            changePhoto(item.dataset.line);
        })
    })
































})