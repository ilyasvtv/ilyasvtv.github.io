window.addEventListener('DOMContentLoaded', () => {

	const   cells = document.querySelectorAll('.cell'),
			button = document.querySelector('.button');

	let count = 0;

	function toogleClasses(item) {
		const cellBlockMiddle = document.getElementById(`${item}`),
		      cellBlockRight = document.getElementById(`${+item+1}`),
		      cellBlockLeft = document.getElementById(`${item-1}`),
		      cellBlockTop = document.getElementById(`${item-10}`),
		      cellBlockBottom = document.getElementById(`${+item+10}`);

		if (cellBlockMiddle!=null)  cellBlockMiddle.classList.toggle('changed');
		if (cellBlockRight!=null)  cellBlockRight.classList.toggle('changed');
		if (cellBlockLeft!=null)  cellBlockLeft.classList.toggle('changed');
		if (cellBlockTop!=null)  cellBlockTop.classList.toggle('changed');
		if (cellBlockBottom!=null)  cellBlockBottom.classList.toggle('changed');

		count++;
	}

	function checkWin() {
		for (let i = 0; i < cells.length; i++) {
			if (cells[i].classList.value === "cell")  {
				return false;
			}
		}
		showMessage();
	}

	function showMessage() {
		if (count === 1) {
			alert(`Completed in ${count} click`);
		} else {
			alert(`Completed in ${count} clicks`);
		}
		count = -1; //refresh count
	}

	function refreshGame() {
		for (let i = 0; i < cells.length; i++) {
			cells[i].classList.remove('changed')
		}
		count=0;
	}


    cells.forEach(item => {
    	item.addEventListener('click', () => {
    		toogleClasses((item.id));
    		checkWin();
    	})
    })

    button.addEventListener('focus', () => {
    	refreshGame();
    })
})