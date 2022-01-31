document.addEventListener('DOMContentLoaded', () => {
    const circleArea = document.getElementById('ca'),
          cx = circleArea.getContext('2d');

    let widthOfCircleArea = circleArea.clientWidth;

    let centerPoint = widthOfCircleArea / 2;

    let colors = new Set();
  
    const arrayOfColors = [];

    //Call this function to add uniq color for new item
    function addColorToSet() {
      for (let i = 0; i < localStorage.length; i++) {
        let prevSize = colors.size;
        while (prevSize === colors.size) {
          let newColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
          colors.add(newColor);
        }
      }
      for (let color of colors) {
        arrayOfColors.push(color)
      }
    }

    let lots = [];

    if (localStorage.length === 0) {
      lots = [
        {name: "1Satisfied", count: 250, color: "rgb(155, 155, 155)", angleStart : 0, angleEnd : 0},
        {name: "2Neutral", count: 250, color: "rgb(15, 155, 155)", angleStart : 0, angleEnd : 0},
        {name: "3Unsatisfied", count: 250, color: "rgb(155, 55, 155)", angleStart : 0, angleEnd : 0},
        {name: "4No c4455ommenqqczxczxct1111111111", count: 250, color: "rgb(155, 155, 15)", angleStart : 0, angleEnd : 0},
      ]
    } else {
      lots = [];
    }

    
    function addLotsToArray() {
      let i = 0;
      for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue;
        }
        lots.push({name: key, count: +localStorage.getItem(key), color: arrayOfColors[i], angleStart : 0, angleEnd : 0});
        i++;
      }
    }

    addColorToSet();
    addLotsToArray();

    let total = lots.reduce((sum, {count}) => sum + count, 0);

    function drawCircle() {
      let cutText = Math.floor(centerPoint / 14);
      //Clean the canvas
      cx.clearRect(0, 0, widthOfCircleArea, widthOfCircleArea);
      //Draw the pie
      let currentAngle = 0;
      let index = 0;
      for (let piePart of lots) {
        //Draw the parts of the pie
        let sliceAngle = piePart.count / total;
        let angleStart = currentAngle * 2 * Math.PI;
        let angleEnd = (currentAngle + sliceAngle) * 2 * Math.PI;
        cx.beginPath();
        cx.arc(centerPoint, centerPoint, centerPoint, angleStart, angleEnd);
        lots[index].angleStart = angleStart.toFixed(5);
        lots[index].angleEnd = angleEnd.toFixed(5);
        cx.lineTo(centerPoint, centerPoint);
        cx.fillStyle = piePart.color;
        cx.fill();
        //Print name of each part of the pie
        if (lots[index].angleEnd - lots[index].angleStart > 0.2490) {
          cx.save();
          cx.translate(centerPoint, centerPoint);
          cx.fillStyle = "#000";
          cx.rotate((currentAngle + sliceAngle / 2) * 2 * Math.PI);
          cx.textAlign = "left";
          cx.textBaseline = "middle";
          cx.font = "18px Times New Roman";
          let text = piePart.name;
          cx.fillText(text.slice(0, cutText), 50, 0);
          cx.restore();
        }
        //Increase the angle for the next part of the pie
        currentAngle += sliceAngle;
        index++;
      }
    }

    drawCircle();
    let timeOfRolling = 3000;
    let delayWhenRotation = false;
    let rotation = 0;
    let winner = false;
    const inputTimer = document.querySelector('.inputTimer');
    const btnTimer = document.querySelector('.btnTimer');

    const startRotate = () => {
      //Remove clicking while rotating
      if(delayWhenRotation) return;
      //Remove negative numbers and zero
      if (inputTimer.value <= 0 && inputTimer.value !== "") return;
      delayWhenRotation = true;
      timeOfRolling = inputTimer.value !== "" ? +(inputTimer.value + "000") : 3000;
      rolling();
      //Enable clicing when the end of rotation
      setTimeout(() => {
        delayWhenRotation = false;
      }, timeOfRolling)
    }

    btnTimer.addEventListener('click', startRotate);
    addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        startRotate();
      }
    })
  
    const winnerField = document.querySelector('.winner');
    function rolling() {
      let numberOfSpins = (Math.max(3, timeOfRolling / 1000) + Math.random() * 6.2832) * 10;
      let x = (timeOfRolling / 60).toFixed(3);
      let change = numberOfSpins / x / 3;
      let decrease = change / x;
      let prevName;
      const rollingTimer = setInterval(() => {
        let prev = -Infinity;
        rotation += change;
        circleArea.style.transition = '0.06s';
        circleArea.style.transform = `translate3d(0px, 0px, 0px) rotate(${rotation}rad)`;
        lots.forEach(el => {
          el.angleStart = (+el.angleStart + change).toFixed(5);
          el.angleEnd = (+el.angleEnd + change).toFixed(5);
          if (el.angleEnd % 6.2832 > prev && Math.floor(el.angleStart / 6.2832) < Math.floor(el.angleEnd / 6.2832)) {
            prev = el.angleEnd % 6.2832;
            prevName = el.name;
          }
        })
        winner = prevName;
        change -= decrease;
        winnerField.innerText = winner ? winner : "spin";
      }, 60)
      
      setTimeout(() => {
        clearInterval(rollingTimer);
      }, timeOfRolling)
    }


    //Just note
    //                                 angle (rad) * 180
    //   rad to deg =>   angle (deg) = -----------------
    //                                         PI
    //
    //
    //                                 angle (deg) * PI
    //   deg to rad =>   angle (rad) = -----------------
    //                                         180
    //
    //
    // 1 rad = 180 / PI = 57deg17'45"
    // 1 deg = PI / 180 = 0.017453 rad

    //triangle
    const triangleArea = document.getElementById('trng'),
          cx2 = triangleArea.getContext('2d');

    let triangleAreaHeight = triangleArea.clientHeight;
    let triangleAreaWidth = triangleArea.clientWidth;

    cx2.beginPath();
    cx2.strokeStyle = "#000";
    cx2.fillStyle = "#fff";
    cx2.moveTo(triangleAreaWidth / 2 - 10, triangleAreaHeight / 2 - 20);
    cx2.lineTo(triangleAreaWidth / 2 + 10, triangleAreaHeight / 2 - 20);
    cx2.lineTo(triangleAreaWidth / 2, triangleAreaHeight / 2 - 10);
    cx2.closePath();
    cx2.stroke();
    cx2.fill();

    addEventListener('beforeunload', () => {
      localStorage.clear();
    })
})