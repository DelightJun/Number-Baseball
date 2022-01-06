var numberArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var startButton = document.querySelector("#startButton");
var restartButton = document.querySelector("#restartButton");
var inputNumber = document.querySelector("#inputNumber");
var numberBox = document.querySelector("#numberBox");
var strikeNumber = document.querySelector("#strike");
var ballNumber = document.querySelector("#ball");
var chance = document.querySelector("#chance");
let randomArray = [];
let chanceNumber = 10;
chance.textContent = chanceNumber;

inputNumber.style.display = "none";

restartButton.addEventListener("click", function reload() {
  location.reload();
});

startButton.addEventListener("click", function createNumber() {
  inputNumber.style.display = "";
  startButton.remove();
  numberBox.textContent = "? ? ?";

  for (var i = 0; i < 3; i++) {
    var randomIndex = Math.floor(Math.random() * numberArray.length);
    var randomValue = numberArray[randomIndex];
    numberArray.splice(randomIndex, 1);
    randomArray.push(randomValue);
  }

  alert("Here is a new number. Guess what it is!");
  console.log(randomArray);
});

function handleOnInput(el, maxlength) {
  if (el.value.length > maxlength) {
    el.value = el.value.substr(0, maxlength);
  }
}

inputNumber.addEventListener("keypress", function (key) {
  if (key.key === "Enter") {
    var inputValue = inputNumber.value;
    var inputValueArray = Array.from(inputValue);
    console.log(inputValueArray);

    if (inputValueArray.length < 3) {
      alert("Please enter 3 digit number");
      return;
    }

    var strike = 0;
    var ballcount = 0;

    for (var i = 0; i < 3; i++) {
      if (inputValueArray[i] === randomArray[i]) {
        strike += 1;
      }
      if (randomArray.indexOf(inputValueArray[i]) >= 0) {
        ballcount++;
      }
    }

    var ball = ballcount - strike;

    if (ball < 0) {
      ball = 0;
    }

    strikeNumber.textContent = strike + "S";
    ballNumber.textContent = ball + "B";

    console.log("strike : " + strike);
    console.log("ball : " + ball);

    if (strike === 3) {
      numberBox.textContent = randomArray.join("");
      alert(`YES! That's right!`);
    }

    chanceNumber = chanceNumber - 1;
    chance.textContent = chanceNumber;

    if (chanceNumber === 0) {
      alert("Over! Please click restart button");
      inputNumber.remove();
    }
  }
});
