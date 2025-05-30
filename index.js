// Get all the important elements from the page
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message"); // All message elements (used to hide them easily)
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");


//Game variables
let targetNumber;  // the number the player tries to guess
let attempts = 0;  // how many guesses the player has made
const maxNumberOfAttempts = 5; // // maximum number of guesses allowed

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11

// This makes a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// This function checks the player's guess
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

   // If the input is not a number or out of range, show an alert
  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Please enter a number between 1 and 99.");
    guessInput.value = "";
    return;
  }

  attempts++;  //Increase the number of attempts

  hideAllMessages(); // // Hide all previous messages before showing new ones

  // If the guess is correct
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  else {
  // If the guess is too low or too high
 
  if (guess < targetNumber) {
    
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = "";
    }


 // Show how many guesses are left
 const remainingAttempts = maxNumberOfAttempts - attempts;
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;

    // If the player used all their guesses and didn't win
  if (attempts === maxNumberOfAttempts && guess !== targetNumber) {
    maxGuessesMessage.style.display = "";
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

 
}

  //only show reset if game ended
  if (guess === targetNumber ||attempts ===maxNumberOfAttempts) {
    resetButton.style.display ="";
  }

  guessInput.value = ""; // Clear the input box for the next guess

}

//Hides all messages
function hideAllMessages() {
  for (let i =0 ; i< messages.length; i++) {
    messages[i].style.display = "none";
  }
}

// This sets up the game when it starts or is reset
function setup() {
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);  //for testing
  attempts = 0;
  submitButton.disabled = false;
  guessInput.disabled = false;
  guessInput.value="";
  hideAllMessages(); // Clear all messages and hide reset button
  resetButton.style.display = "none"; //hide reset at start
}

//event listeners
submitButton.addEventListener("click", checkGuess); // When the player clicks submit, check their guess
resetButton.addEventListener("click", setup); //when they click reset, start a newgame

setup(); //start the game the first time
