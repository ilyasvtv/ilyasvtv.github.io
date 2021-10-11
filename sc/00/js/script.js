//check all rows and find short rows and change items of these rows
//also the preferable size of scroller is 600px
function changeWidthOfRowElem() {
    const rows = document.querySelectorAll('.sa__row'),
          scrollerArea = document.querySelector('.sa');

    rows.forEach(row => { //find the row with short width
        if (row.clientWidth < scrollerArea.clientWidth * 2) {
            let width = (scrollerArea.clientWidth * 2) / row.children.length; //get desirable width
            for (let i = 0; i < row.children.length; i++) {
                row.children[i].style.width = `${width}px`; //set desirable width to all items in a row
            }
        }
    })
}
//call function on page reload
setTimeout(() => {
    changeWidthOfRowElem();
}, 0)