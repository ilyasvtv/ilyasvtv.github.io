
document.addEventListener('DOMContentLoaded', () => {
    //left section
    const primaryButton = document.querySelector('.add-btn');
    const container = document.querySelector('.lot-container');
    const helpInfo = document.querySelectorAll('.icon-q');
    const infoSection = document.querySelector('.info-section');
    const checkbox = document.querySelector('.checkbox');
    const totalBank = document.querySelector('.total-bank');
    let deleteButtons = document.querySelectorAll('.lot__delete');
    let addPriceButtons = document.querySelectorAll('.lot__plus');
    let totalPriceFields = document.querySelectorAll('.lot__total');
    let addPriceFields = document.querySelectorAll('.lot__addingPrice');
    let lotNameFields = document.querySelectorAll('.lot__name');
    let checked = false;

    const removeLot = (e) => {
        let el = e.currentTarget.parentNode;
        el.style.position = 'relative';
        el.style.zIndex = '-99999';
        for (let i = el.id; i < deleteButtons.length; i++) {
            deleteButtons[i].parentNode.style.transition = '0.3s';
            deleteButtons[i].parentNode.style.transform = 'translateY(-65px)';
        }
        primaryButton.style.transition = '0.3s';
        primaryButton.style.transform = 'translateY(-65px)';
        if (container.children.length === 3) {
            infoSection.style.display = "none";
        }
        setTimeout(() => {
            deleteButtons.forEach(el => {
                el.parentNode.style = "";
            })
            primaryButton.style = "";
            deleteButtons[el.id].parentNode.remove();
            changeArrays();
            deleteFromLocalStorage(el);
            countTotalBank();
        }, 300)
    }

    function countTotalBank() {
        let sum = 0;
        totalPriceFields.forEach(el => {
            sum += +el.value;
        })
        totalBank.innerText = `Total bank: ${sum}`;
    }

    const addPrice = (e) => {
        let elem = e.currentTarget.parentNode;
        if (elem.children[2].value.trim().length === 0) {
            return;
        }
        if (+elem.children[2].value < 0 && elem.children[1].value.trim().length === 0) {
            return;
        }
        if (checked && +elem.children[2].value > 0) {
            totalSeconds += 60;
            changeTime();
        }
        elem.children[1].value = +elem.children[1].value + +elem.children[2].value;
        addToLocalStorage(elem);
        checkLotPlace(elem);
        countTotalBank();
        elem.children[2].value = "";
    }

    const changePriceManually = (e) => {
        let elem = e.currentTarget.parentNode;
        if (checked && +elem.children[1].value > 0) {
            totalSeconds += 60;
            changeTime();
        }
        addToLocalStorage(elem);
        checkLotPlace(elem);
        countTotalBank();
    }

    function changeArrays() {
        deleteButtons = document.querySelectorAll('.lot__delete');
        addPriceButtons = document.querySelectorAll('.lot__plus');
        totalPriceFields = document.querySelectorAll('.lot__total');
        addPriceFields = document.querySelectorAll('.lot__addingPrice');
        lotNameFields = document.querySelectorAll('.lot__name');

        deleteButtons.forEach((el, i) => {
            el.parentNode.id = `${i}`;
        })
    }

    let bottom = 65
    function checkLotPlace(el) {
        if (+el.children[1].value >= 0 && +el.children[2].value >= 0) {
            for (let i = 0; i < totalPriceFields.length; i++) {
                if (+el.children[1].value > +totalPriceFields[i].value || totalPriceFields[i].value.trim().length === 0) {
                    bottom = 65;
                    el.style.transition = '0.35s';
                    for (let g = totalPriceFields[i].parentNode.id; g < el.id; g++) {
                        totalPriceFields[g].parentNode.style.transition = '0.35s';
                        totalPriceFields[g].parentNode.style.transform = 'translateY(65px)';
                        totalPriceFields[el.id].parentNode.style.transform = `translateY(-${bottom}px)`;
                        bottom += 65;
                    }
                    if (checked && i === 0) {
                        totalSeconds += 60;
                        changeTime();
                    }
                    setTimeout(() => {
                        for (let i = 0; i < totalPriceFields.length; i++) {
                            totalPriceFields[i].parentNode.style = "";
                        }
                        container.insertBefore(el, totalPriceFields[i].parentNode);
                        changeArrays()
                    }, 350)
                    break;
                }
            }
        } else {
            for (let i = totalPriceFields.length - 1; i >= 0; i--) {
                if (totalPriceFields[i].value.trim().length === 0) {
                    continue;
                }
                if (+el.children[1].value <= +totalPriceFields[i].value) {
                    bottom = 0;
                    el.style.transition = '0.35s';
                    for (let g = el.id; g <= totalPriceFields[i].parentNode.id; g++) {
                        totalPriceFields[g].parentNode.style.transition = '0.35s';
                        totalPriceFields[g].parentNode.style.transform = 'translateY(-65px)';
                        totalPriceFields[el.id].parentNode.style.transform = `translateY(${bottom}px)`;
                        bottom += 65;
                    }
                    setTimeout(() => {
                        for (let i = 0; i < totalPriceFields.length; i++) {
                            totalPriceFields[i].parentNode.style = "";
                        }
                        container.insertBefore(el, totalPriceFields[i].parentNode.nextSibling);
                        changeArrays()
                    }, 350)
                    break;
                }
            }
        }        
    }

    function addEvents() {
        changeArrays()

        deleteButtons.forEach(el => {
            el.addEventListener('click', removeLot)
        })
    
        addPriceButtons.forEach(el => {
            el.addEventListener('click', addPrice)
        })

        lotNameFields.forEach(el => {
            el.addEventListener("keydown", (e) => {
                if (e.code === 'Enter') {
                    addPrice(e);
                }  
            })
        })

        addPriceFields.forEach(el => {
            el.addEventListener("keydown", (e) => {
                if (e.code === 'Enter') {
                    addPrice(e);
                }
            })
        })

        totalPriceFields.forEach(el => {
            el.addEventListener('change', changePriceManually);
        })

        checkbox.addEventListener('change', (e) => {
            checked = e.currentTarget.checked;
        })
    }

    //add event at the start
    addEvents();

    //new lot
    const lotBlock = `
        <input class="lot__name" type="text">
        <input class="lot__total" type="number">
        <input class="lot__addingPrice" type="number">
        <button class="lot__plus" aria-label="lot plus"></button>
		<button class="lot__delete" aria-label="lot delete"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
    `
    //event on add button
    primaryButton.addEventListener('click', () => {
        let newLot = document.createElement('div');
        newLot.classList.add('lot');
        newLot.innerHTML = lotBlock;
        newLot.style.transform = 'translateX(-1000px)'
        newLot.style.transition = '0.2s';
        container.insertBefore(newLot, primaryButton);
        setTimeout(() => {
            newLot.style.transform = 'translateX(0px)';
            setTimeout(() => {
                newLot.style = "";
                if (container.children.length === 3) {
                    infoSection.style = "";
                }
            }, 200)
        })
        //add event on new lots
        addEvents();
    })

    helpInfo.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            e.currentTarget.parentNode.children[1].style.display = 'flex';
        })
        
        el.addEventListener('mouseleave', (e) => {
            e.currentTarget.parentNode.children[1].style= "";
        })
    })

    //localstorage
    function addToLocalStorage(el) {
        if (el.children[0].value.trim().length === 0) {
            return;
        }
        localStorage.setItem(el.children[0].value, el.children[1].value);
        if (el.children[1].value < 0) {
            localStorage.removeItem(el.children[0].value);
        }
    }

    function deleteFromLocalStorage(el) {
        if (el.children[0].value.trim().length === 0) {
            return;
        }
        localStorage.removeItem(el.children[0].value);
    }

    

    //timer
    const timer = document.querySelector('.timer');
    const timerMS = document.querySelector('.timerMS')
    const runTimer = document.querySelector('.run-btn');
    const stopTimer = document.querySelector('.stop-btn');
    const plusBtn = document.querySelector('.plus-btn');
    const doublePlus = document.querySelector('.plus-plus-btn');
    const minusBtn = document.querySelector('.minus-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const clearStorage = document.querySelector('.clear-storage');
    let stopped = true;
    let running = false;
    let clicked = false;
    let totalMinutes = +timer.innerText.split(':')[0];
    let totalSeconds = +timer.innerText.split(':')[1] + totalMinutes * 60;
    let newMinutes, newSeconds, newMilliseconds;

    function changeTime() {
        //idk how the next conditional is necessary, maybe it is pointless, i'm not sure
        if (totalSeconds < 0) {
            totalSeconds = 0
        }
        //i have no idea how i have to get a bug without these strokes of code, but let them be
        newSeconds = String(totalSeconds % 60);
        newMinutes = String(Math.floor(totalSeconds / 60));
        while (newMinutes.length < 2) {
            newMinutes = [...newMinutes];
            newMinutes.unshift('0');
            newMinutes = newMinutes.join('');
        }
        while (newSeconds.length < 2) {
            newSeconds = [...newSeconds];
            newSeconds.unshift('0');
            newSeconds = newSeconds.join('');
        }
        timer.innerText = `${newMinutes}:${newSeconds}`;
    }

    //event on run-button
    runTimer.addEventListener('click', () => {
        stopped = false;
        if (running) {
            return;
        }
        running = true;
        //run timer without 1s delay (only 1s)
        totalSeconds--;
        newMilliseconds = 999;
        let timerMillisecondsStart = setInterval(() => {
            if (stopped || timer.innerText === "00:00") {
                clearInterval(timerMillisecondsStart);
                timerMS.innerText = '.000';
                running = false;
                return;
            }
            newMilliseconds-=17;
            if (newMilliseconds < 0) {
                newMilliseconds = 0;
            }
            newMilliseconds = String(newMilliseconds);
            while (newMilliseconds.length < 3) {
                newMilliseconds = [...newMilliseconds];
                newMilliseconds.unshift('0');
                newMilliseconds = newMilliseconds.join('');
            }
            timerMS.innerText = `.${newMilliseconds}`;
        }, 17)
        setTimeout(() => {
            clearInterval(timerMillisecondsStart);
        }, 1000)
        changeTime();
        //run timer in 1s
        let timerStart = setInterval(() => {
            totalSeconds--;
            newMilliseconds = 999;
            let timerMillisecondsStart = setInterval(() => {
                if (stopped || timer.innerText === "00:00") {
                    clearInterval(timerStart);
                    clearInterval(timerMillisecondsStart);
                    running = false;
                    timerMS.innerText = '.000';
                    return;
                }
                newMilliseconds-=17;
                if (newMilliseconds < 0) {
                    newMilliseconds = 0;
                }
                newMilliseconds = String(newMilliseconds);
                while (newMilliseconds.length < 3) {
                    newMilliseconds = [...newMilliseconds];
                    newMilliseconds.unshift('0');
                    newMilliseconds = newMilliseconds.join('');
                }
                timerMS.innerText = `.${newMilliseconds}`;
            }, 17)
            setTimeout(() => {
                clearInterval(timerMillisecondsStart);
            }, 1000)
            changeTime();
        }, 1000)
    })

    stopTimer.addEventListener('click', () => {
        stopped = true;
        running = false;
    })

    clearBtn.addEventListener('click', () => {
        totalSeconds = 0;
        stopped = true;
        running = false;
        changeTime();
    })

    plusBtn.addEventListener('click', () => {
        if (clicked) {
            return;
        }
        totalSeconds+=60;
        if (stopped) {
            running = false;
        }
        changeTime();
        clicked = true;
        setTimeout(() => {
            clicked = false;
        }, 200)
    })

    doublePlus.addEventListener('click', () => {
        if (clicked) {
            return;
        }
        totalSeconds+=120;
        if (stopped) {
            running = false;
        }
        changeTime();
        clicked = true;
        setTimeout(() => {
            clicked = false;
        }, 200)
    })

    minusBtn.addEventListener('click', () => {
        if (clicked) {
            return;
        }
        totalSeconds-=60;
        if (totalSeconds <= 0) {
            totalSeconds = 0;
            running = false;
            stopped = true;
        }
        changeTime();
        clicked = true;
        setTimeout(() => {
            clicked = false;
        }, 200)
    })

    const globalTimer = document.querySelector('.global-timer');
    let newGlobalSeconds, newGlobalMinutes, newGlobalHours, totalGlobalSeconds = 0;
    setInterval(() => {
        newGlobalSeconds = String(totalGlobalSeconds % 60);
        newGlobalMinutes = String(Math.floor(totalGlobalSeconds / 60) % 60);
        newGlobalHours = String(Math.floor(totalGlobalSeconds / 3600) % 60);
        while (newGlobalHours.length < 2) {
            newGlobalHours = [...newGlobalHours];
            newGlobalHours.unshift('0');
            newGlobalHours = newGlobalHours.join('');
        }
        while (newGlobalMinutes.length < 2) {
            newGlobalMinutes = [...newGlobalMinutes];
            newGlobalMinutes.unshift('0');
            newGlobalMinutes = newGlobalMinutes.join('');
        }
        while (newGlobalSeconds.length < 2) {
            newGlobalSeconds = [...newGlobalSeconds];
            newGlobalSeconds.unshift('0');
            newGlobalSeconds = newGlobalSeconds.join('');
        }
        globalTimer.innerText = `Total time: ${newGlobalHours}:${newGlobalMinutes}:${newGlobalSeconds}`;
        totalGlobalSeconds++;
    }, 1000)

    clearStorage.addEventListener('click', () => {
        localStorage.clear();
    })

})
