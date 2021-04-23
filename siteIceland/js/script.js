window.addEventListener('DOMContentLoaded', () => {
    const photo = document.querySelectorAll('.photo'),
          circles = document.querySelectorAll('.circles'),
          buttonRight = document.querySelector('.button-right'),
          buttonLeft = document.querySelector('.button-left'),
          hamburger = document.querySelector('.hamburger'),
          hidden_menu = document.querySelector('.hidden-menu');

    let i = 0,
        count = -1,
        value = 0;

    function switchSlidesRight(){
        if (i==count) {
            photo[0].classList.add ('show');
            photo[i].classList.remove('show');
            circles[0].classList.add('paint');
            circles[i].classList.remove('paint');
        }
        if (i<count && i>=0) {
            photo[i].classList.remove ('show');
            photo[+i+1].classList.add('show');
            circles[i].classList.remove('paint');
            circles[+i+1].classList.add('paint');
        }
    }

    function switchSlidesLeft() {
        if (i==0) {
            photo[count].classList.add ('show');
            photo[i].classList.remove('show');
            circles[count].classList.add('paint');
            circles[i].classList.remove('paint');
        }
        if (i<=count && i>0) {
            photo[i-1].classList.add ('show');
            photo[i].classList.remove('show');
            circles[i-1].classList.add('paint');
            circles[i].classList.remove('paint');
        }  
    }

    function checkItem() {
        count=-1;
        photo.forEach(item => {
            if (item.classList.value === "photo show") i=(item.dataset.index);
            count++;
        });
        count=-1;
        circles.forEach(item => {
            if (item.classList.value === "circles paint") i=(item.dataset.index);
            count++;
        });
    }


    buttonRight.addEventListener('click', () => {
        checkItem();
        switchSlidesRight();
    })
    
    buttonLeft.addEventListener('click', () => {
        checkItem();
        switchSlidesLeft();
    })

    hamburger.addEventListener('click', () => {
        if (hidden_menu.style.display == 'none') {
            hidden_menu.style.display='block';
        } else {
            hidden_menu.style.display='none';
        }
    })


    function changePhoto(value){
        photo.forEach(item => {
            item.classList.value = 'photo';
            if (item.dataset.index === value) {
                item.classList.value = 'photo show';
            }
        })

        circles.forEach(item => {
            item.classList.value = 'circles';
            if (item.dataset.index === value) {
                item.classList.value = 'circles paint';
            }
        })
    }

    circles.forEach(item => {
        item.addEventListener('click', () => {
        value = item.dataset.index;
        changePhoto(value);
        })
    })

    















})

