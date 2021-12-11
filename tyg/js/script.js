document.addEventListener('DOMContentLoaded', () => {
    // animation (appearing of text)
    const animationItems = document.querySelectorAll('.toAnimate');
    if (animationItems.length > 0) {
        window.addEventListener('scroll', animateOnScroll);
        function animateOnScroll() {
            for (let index = 0; index < animationItems.length; index++) {
                const animationItem = animationItems[index];
                const animationItemHeight = animationItem.offsetHeight;
                const animationItemOffset = offset(animationItem).top;
                const animationStart = 20;

                let animationItemPoint = window.innerHeight - animationItemHeight / animationStart;
                if (animationItemHeight > window.innerHeight) {
                    animationItemPoint = window.innerHeight - window.innerHeight / animationStart;
                }
                
                if ((pageYOffset > animationItemOffset - animationItemPoint) && pageYOffset < (animationItemOffset + animationItemHeight)) {
                    animationItem.classList.add('active-animation');
                } else if (!animationItem.classList.contains('one-time-animation')) {
                    animationItem.classList.remove('active-animation');
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
            animateOnScroll();
        }, 300);
    }

    //modal window
    const modal = document.querySelector('.modal');
    const button = document.querySelectorAll('.btn');
    const closeModal = document.querySelector('.msg__close');

    button.forEach(el => {
        el.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
    })

    closeModal.addEventListener('click', () => {
        modal.style.display = '';
        document.body.style.overflow = '';
    })

    const bouncingCircle = document.querySelector('.header__promo');
    let bouncingAnimationDelay = false;

    bouncingCircle.addEventListener('click', () => {
        if (bouncingAnimationDelay) {
            return;
        }
        bouncingAnimationDelay = true;
        bouncingCircle.style.animation = 'jumpingCircle 4s'
        setTimeout(()=> {
            bouncingAnimationDelay = false;
            bouncingCircle.style.animation = '';
        }, 4000)
    })

})