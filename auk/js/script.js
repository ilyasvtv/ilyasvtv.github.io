document.addEventListener('DOMContentLoaded', () => {
    const circleArea = document.getElementById('ca'),
          cx = circleArea.getContext('2d');

    let widthOfCircleArea = innerWidth / 4 * 3;
    let heightOfCircleArea = innerHeight - 5;

    circleArea.width = widthOfCircleArea;
    circleArea.height = heightOfCircleArea;

    let xMiddle = widthOfCircleArea / 2,
        yMiddle = heightOfCircleArea / 2;

    let radius = Math.min(heightOfCircleArea, widthOfCircleArea) / 2 - 50;

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
        {name: "Satisfied", count: 250, color: "rgb(155, 155, 155)"},
        {name: "Neutral", count: 250, color: "rgb(15, 155, 155)"},
        {name: "Unsatisfied", count: 250, color: "rgb(155, 55, 155)"},
        {name: "No commenqqczxczxct1111111111", count: 250, color: "rgb(155, 155, 15)"},
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
        lots.push({name: key, count: +localStorage.getItem(key), color: arrayOfColors[i]});
        i++;
      }
    }

    addColorToSet();
    addLotsToArray();
    console.log(lots);

    let total = lots.reduce((sum, {count}) => sum + count, 0);

    function drawCircle(rotation = 0, r = 0, g = 0, b = 0) {
      //Clean the canvas
      cx.clearRect(0, 0, widthOfCircleArea, heightOfCircleArea);
      //Color the canvas with the color of the part of the pie
      cx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      cx.fillRect(0, 0, widthOfCircleArea, heightOfCircleArea);
      //White outline around the pie
      cx.save();
      cx.beginPath();
      cx.arc(xMiddle, yMiddle, radius + 1, 0,  2 * Math.PI);
      cx.fillStyle = "#fff";
      cx.fill();
      //Draw the pie
      let currentAngle = 0;
      for (let piePart of lots) {
        //Print the winner on the screen
        if (piePart.color === `rgb(${r}, ${g}, ${b})`) {
          cx.textAlign = "center";
          cx.fillStyle = "#fff";
          cx.font = "bold 25px Times New Roman";
          cx.fillText(piePart.name, xMiddle, yMiddle - radius - 25);
        }
        //Draw the parts of the pie
        let sliceAngle = piePart.count / total;
        cx.beginPath();
        cx.arc(xMiddle, yMiddle, radius, (currentAngle + rotation) * 2 * Math.PI, (currentAngle + sliceAngle + rotation) * 2 * Math.PI);
        cx.lineTo(xMiddle, yMiddle);
        cx.fillStyle = piePart.color;
        cx.fill();
        //Print name of each part of the pie
        cx.save();
        cx.translate(xMiddle, yMiddle);
        cx.fillStyle = "#000";
        cx.rotate((currentAngle + sliceAngle / 2 + rotation) * 2 * Math.PI);
        cx.textAlign = "left";
        cx.textBaseline = "middle";
        cx.font = "bold 35px Times New Roman";
        let text = piePart.name;
        cx.fillText(text.slice(0,9), 50, 0);
        cx.restore();
        //Increase the angle for the next part of the pie
        currentAngle += sliceAngle;
      }
      //Draw triangle at the top of the pie
      cx.beginPath();
      cx.strokeStyle = "#000";
      cx.fillStyle = "#fff";
      cx.moveTo(xMiddle - 10, yMiddle - radius - 5);
      cx.lineTo(xMiddle + 10, yMiddle - radius - 5);
      cx.lineTo(xMiddle, yMiddle - radius + 5);
      cx.closePath();
      cx.stroke();
      cx.fill();
    }

    // just note
    // 1 rad = 180 / PI = 57deg17'45"
    // 1 deg = PI / 180 = 0.017453 rad

    drawCircle();

    let timeOfRolling = 3_000;
    let delayWhenRotation = false;
    const inputTimer = document.querySelector('.inputTimer');
    const btnTimer = document.querySelector('.btnTimer');

    btnTimer.addEventListener('click', () => {
      //Remove clicking while rotating
      if(delayWhenRotation) {
        return;
      }
      //Remove negative numbers and zero
      if (inputTimer.value <= 0 && inputTimer.value !== "") {
        return;
      }
      delayWhenRotation = true;
      timeOfRolling = inputTimer.value !== "" ? +(inputTimer.value + "000") : 3_000;
      rolling();
      //Enable clicing when the end of rotation
      setTimeout(() => {
        delayWhenRotation = false;
      }, timeOfRolling)
    })
    
    function rolling() {
      let maxSpins = Math.min(Math.max(3, timeOfRolling / 1000 - Math.floor(Math.random() * 3 + 1)), timeOfRolling / 1000) + Math.random();
      let numberOfSteps = timeOfRolling / 10;
      let step = maxSpins / numberOfSteps / numberOfSteps * 16;
      let counterOfSpins = 0;
      let decreaseSpeed = 0;
      let increaseSpeed = 0;
      let speed = 0;
      const timerId = setInterval(()=> {
        //increasing/decreasing speed of rotating
        counterOfSpins++;
        if (counterOfSpins <= numberOfSteps / 4) {
          increaseSpeed += step;
          speed += increaseSpeed;
        } else {
          increaseSpeed -= step;
          if (increaseSpeed > 0) {
            speed += increaseSpeed;
          }
        }
        //Get the color (rgb), from pixel above center
        let r = cx.getImageData(xMiddle, yMiddle - radius + 10, 1, 1).data[0];
        let g = cx.getImageData(xMiddle, yMiddle - radius + 10, 1, 1).data[1];
        let b = cx.getImageData(xMiddle, yMiddle - radius + 10, 1, 1).data[2];
        drawCircle(speed, r, g, b);
        //End of rotating
        setTimeout(() => {
          clearInterval(timerId);
        }, timeOfRolling)
      }, 10)
    }

    //responsivness
    // window.addEventListener('resize', () => {
    //   // setTimeout(() => {
    //     widthOfCircleArea = innerWidth / 4 * 3;
    //     heightOfCircleArea = innerHeight - 5;
    //     xMiddle = widthOfCircleArea / 2;
    //     yMiddle = heightOfCircleArea / 2;
    //     radius = Math.min(heightOfCircleArea, widthOfCircleArea) / 2 - 50;
    //     cx.clearRect(0, 0, widthOfCircleArea, heightOfCircleArea);
    //   // }, 500)
    //   // setTimeout(() => {
    //     drawCircle();
    //   // }, 1000)
    // })
})