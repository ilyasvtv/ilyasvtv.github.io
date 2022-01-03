document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelectorAll('.btn'),
          buttons = document.querySelectorAll('.buttons');

    const joinedContent = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9Z" stroke="#6D6D6D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2301 6.83013C12.523 6.53724 12.523 6.06237 12.2301 5.76947C11.9372 5.47658 11.4624 5.47658 11.1695 5.76947L8.9998 7.93914L6.83013 5.76947C6.53724 5.47658 6.06237 5.47658 5.76947 5.76947C5.47658 6.06237 5.47658 6.53724 5.76947 6.83013L7.93914 8.9998L5.76947 11.1695C5.47658 11.4624 5.47658 11.9372 5.76947 12.2301C6.06237 12.523 6.53724 12.523 6.83013 12.2301L8.9998 10.0605L11.1695 12.2301C11.4624 12.523 11.9372 12.523 12.2301 12.2301C12.523 11.9372 12.523 11.4624 12.2301 11.1695L10.0605 8.9998L12.2301 6.83013Z" fill="#6D6D6D"/>
                                </svg>
                                LEAVE`;

    const notJoinedContent = `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.0493 9C18.0493 13.5559 14.3534 17.25 9.79309 17.25C5.23281 17.25 1.53687 13.5559 1.53687 9C1.53687 4.44414 5.23281 0.75 9.79309 0.75C14.3534 0.75 18.0493 4.44414 18.0493 9Z" stroke="#6D6D6D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.9708 8.25027C5.55644 8.25027 5.22054 8.58594 5.22054 9C5.22054 9.41406 5.55644 9.74973 5.9708 9.74973L9.04165 9.74973L9.04165 12.8184C9.04164 13.2325 9.37754 13.5682 9.7919 13.5682C10.2063 13.5682 10.5422 13.2325 10.5422 12.8184V9.74973L13.613 9.74974C14.0274 9.74974 14.3633 9.41406 14.3633 9C14.3633 8.58594 14.0274 8.25026 13.613 8.25026L10.5422 8.25027V5.18158C10.5422 4.76752 10.2063 4.43184 9.7919 4.43184C9.37754 4.43184 9.04164 4.76751 9.04165 5.18158L9.04165 8.25027L5.9708 8.25027Z" fill="#6D6D6D"/>
                                </svg>
                                JOIN`;


    btn.forEach((el, i) => {
        el.addEventListener("click", () => {
            if (el.innerText.indexOf('LEAVE')) {
                buttons[i].children[0].style.display = 'block';
                buttons[i].children[1].innerHTML = joinedContent;
            } else {
                buttons[i].children[0].style.display = 'none';
                buttons[i].children[1].innerHTML = notJoinedContent;
            }
        })
    })
    
})