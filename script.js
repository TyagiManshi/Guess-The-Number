let num = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#sub");
const userInput = document.querySelector(".guess");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowORhi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".result");

const p = document.createElement("p");

let prevGuess = [];
let numOfGuess = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  // if the number is valid to be guessed
  if (isNaN(guess)) {
    alert("Please enter a valid number.");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1.");
  } else if (guess > 100) {
    alert("Please enter a number less than 100.");
  } else {
    prevGuess.push(guess);
    if (numOfGuess === 10) {
      updation(guess);
      displayMessage(`Game Over. The number was ${num}.👻`);
      endGame();
    } else {
      updation(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  // if equal to guess then winner if low or high check that
  if (guess === num) {
    displayMessage(`You guessed it right.👻`);
    endGame();
  } else if (guess < num) {
    displayMessage(`Number is low.💭`);
  } else if (guess > num){
    displayMessage(`Number is high.💭`);
  }
}

function updation(guess) {
  // updates remaining and previous guesses and clears the input guess to enter another guess number
  userInput.value = "";
  guessSlot.innerHTML += `${guess} , `;
  numOfGuess++;
  remaining.innerHTML = `${11 - numOfGuess}`;
}

function displayMessage(message) {
  lowORhi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", ""); // works in key value pair therefore given a empty string to avoid errors
  p.classList.add("button");
  p.innerHTML = `<h2 id = "newGame"  style="border: 2px solid black; background-color: black; color: white; padding: 10px 20px;
    border-radius: 4px;">Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    num = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numOfGuess = 1;
    userInput.removeAttribute("disabled");
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numOfGuess}`;
    startOver.removeChild(p);
    playGame = true
  });
}