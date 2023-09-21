let iconsArray = [
  "fa-solid fa-gem fa-fw fa-4x",
  "fa-solid fa-gem fa-fw fa-4x",
  "fa-solid fa-leaf fa-fw fa-4x",
  "fa-solid fa-leaf fa-fw fa-4x",
  "fa-brands fa-github-alt fa-fw fa-4x",
  "fa-brands fa-github-alt fa-fw fa-4x",
  "fa-solid fa-phone fa-fw fa-4x",
  "fa-solid fa-phone fa-fw fa-4x",
  "fa-solid fa-gift fa-fw fa-4x",
  "fa-solid fa-gift fa-fw fa-4x",
  "fa-solid fa-bolt fa-fw fa-4x",
  "fa-solid fa-bolt fa-fw fa-4x",
  "fa-solid fa-anchor fa-fw fa-4x",
  "fa-solid fa-anchor fa-fw fa-4x",
  "fa-solid fa-bomb fa-fw fa-4x",
  "fa-solid fa-bomb fa-fw fa-4x",
  "fa-solid fa-heart fa-fw fa-4x",
  "fa-solid fa-heart fa-fw fa-4x",
  "fa-solid fa-poo fa-fw fa-4x",
  "fa-solid fa-poo fa-fw fa-4x",
];
let selectedIcons = [];
// use it to count divs that have been selected and matched
let cardCorrect = [];
// going to use it to add select class to the div and correct class
let cardSelected = [];

let howManyCardsSelected = 0;

let countPlayerMoves = 0;

let gameOver = false;

let timerInterval;

let mainDiv = document.querySelector("div.main");
mainDiv.classList.add("container");

//
// create the h1 and header text
//
function createHeaderSection() {
  let h1 = document.createElement("h1");
  h1.classList.add("main-header");
  h1.style.cssText =
    "color: red; font-size: 36px; text-align:center; margin: 1.75rem 0";
  let h1_text = document.createTextNode("Match game");
  h1.appendChild(h1_text);
  return h1;
}
//
// create best score div
//
function createBestScoreSection() {
  let bestScore = document.createElement("div");
  bestScore.classList.add("best-score-container");
  let bestScoreSpan = document.createElement("span");
  bestScoreSpan.classList.add("best-score-span");
  let bestScoreText = document.createTextNode("Attempts: ");
  bestScoreSpan.appendChild(bestScoreText);
  let _score = document.createElement("span");
  _score.classList.add("score-span");
  let _scoreText = document.createTextNode("0");
  _score.appendChild(_scoreText);
  bestScoreSpan.appendChild(_score);
  bestScore.appendChild(bestScoreSpan);
  return bestScore;
}

//
// create timer and stars section
//
function createTimerStarsSection() {
  let timer_stars = document.createElement("div");
  timer_stars.classList.add("timer_stars_section");
  let timerDiv = document.createElement("div");
  let timerDiv_spans = document.createElement("span");
  let timerDiv_spanText = document.createTextNode("Time: ");
  timerDiv_spans.appendChild(timerDiv_spanText);
  let timeSpan = document.createElement("span");
  let timeSpanText = document.createTextNode("00:00");
  timeSpan.appendChild(timeSpanText);
  timeSpan.classList.add("time-count");
  timerDiv_spans.appendChild(timeSpan);
  timerDiv.appendChild(timerDiv_spans);
  timer_stars.appendChild(timerDiv);
  createStars(timer_stars);
  createRestartButton(timer_stars);
  return timer_stars;
}

//
// stars section
//
function createStars(timer_stars) {
  let starsHolder = document.createElement("div");
  starsHolder.classList.add("stars-holder");
  timer_stars.appendChild(starsHolder);
  for (let index = 0; index < 3; index++) {
    const span = document.createElement("span");
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-star");
    span.appendChild(icon);
    starsHolder.appendChild(span);
  }
}

function createRestartButton(timer_stars) {
  let reStartButton = document.createElement("a");
  reStartButton.classList.add("restart-button-top");
  reStartButton.style.cssText =
    "display:inline-block; font-weight: bold; padding:15px";

  let reStartIcon = document.createElement("i");
  reStartIcon.className = "fa-solid fa-rotate-right";
  reStartButton.appendChild(reStartIcon);

  reStartButton.addEventListener("click", restartTheGame);
  reStartButton.addEventListener("click", startTimer);
  timer_stars.appendChild(reStartButton);
}

function createCardSection() {
  // cards section
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("container", "card-container");
  createCards(cardContainer);
  return cardContainer;
}

function createCards(cardContainer) {
  for (let index = 0; index < iconsArray.length; index++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let card_icon = document.createElement("i");
    card_icon.className = iconsArray[index];
    card.appendChild(card_icon);
    cardContainer.appendChild(card);
  }
}

function appendToMainDiv(h1, bestScore, timer_stars, cardContainer) {
  mainDiv.appendChild(h1);
  mainDiv.appendChild(bestScore);
  mainDiv.appendChild(timer_stars);
  mainDiv.appendChild(cardContainer);
}

function selectAllCards() {
  let cards = document.querySelectorAll("div.card");

  cards.forEach((element) => {
    element.addEventListener("click", cardsListener);
  });
}

function cardsListener() {
  if (this.classList.contains("show")) {
    return;
  }
  cardSelected.push(this);
  // now get the class name of the child and add it to the array
  if (howManyCardsSelected !== 2) {
    addSelectedToCard(cardSelected);
    selectedIcons.push(this.firstChild.className);
    howManyCardsSelected = selectedIcons.length;
    if (howManyCardsSelected === 2 && cardSelected.length === 2) {
      addSelectedToCard(cardSelected);
      checkIfCardMatch(selectedIcons, cardSelected);
      countMoves();
      showMovesNumber();
    }
  }
}

function checkIfCardMatch(selectedIcons, cardSelected) {
  if (selectedIcons[0] === selectedIcons[1]) {
    // add class of correct if match
    if (
      cardSelected[0].classList.contains("selected") ||
      cardSelected[1].classList.contains("selected")
    ) {
      removeSelectedClass(cardSelected);
    }
    addCorrectClass(cardSelected);
    cardCorrect.push(...cardSelected);
    resetCardSelection();
    isGameOver(cardCorrect.length);
  } else {
    // cards do not match reset the selection;
    removeSelectedClass(cardSelected);
    resetCardSelection();
  }
}

function isGameOver(cardCorrect) {
  let cards = document.querySelectorAll("div.card");
  if (cardCorrect === cards.length) {
    gameOver = true;
    showDialog(gameOver);
  }
}

function showDialog(gameOver) {
  if (gameOver) {
    createDialog();
    document.querySelector("dialog").show();
    handleDialogChose();
  }
}

function showMovesNumber() {
  let scoreSpan = document.querySelector(".best-score-span .score-span");
  scoreSpan.innerHTML = countPlayerMoves;
}

function handleDialogChose() {
  let playAgain = document.querySelector("button.play-again");
  playAgain.addEventListener("click", restartTheGame);
  playAgain.addEventListener("click", startTimer);

  let closeButton = document.querySelector("button.close-window");
  closeButton.addEventListener("click", () => {
    document.querySelector("dialog").close();
  });
}

function restartTheGame() {
  resetCardSelection();
  resetStarsClass();
  flipCardWhenGameStart();

  let cards = document.querySelectorAll("div.card.correct");

  if (cards) {
    cards.forEach((element) => {
      element.classList.remove("correct");
    });
  }

  let dialog = document.querySelector("dialog");
  if (dialog) {
    dialog.close();
  }

  if (countPlayerMoves > 0) {
    countPlayerMoves = 0;
    showMovesNumber();
  }

  gameOver = false;
  cardCorrect = [];
}

function createDialog() {
  // dialog and its text
  let myDialog = document.createElement("dialog");
  let gameOverP = document.createElement("p");
  let gameOverText = document.createTextNode(
    "the game is over do you want to play again?"
  );
  gameOverP.appendChild(gameOverText);
  // play again button
  let playAgainButton = document.createElement("button");
  playAgainButton.classList.add("play-again");
  let playAgainText = document.createTextNode("Play Again?");
  playAgainButton.appendChild(playAgainText);
  // close button
  let closeButton = document.createElement("button");
  closeButton.classList.add("close-window");
  let closeButtonText = document.createTextNode("close window");
  closeButton.appendChild(closeButtonText);
  // append everything to dialog
  myDialog.appendChild(gameOverP);
  myDialog.appendChild(playAgainButton);
  myDialog.appendChild(closeButton);
  document.body.appendChild(myDialog);
}

function removeSelectedClass(cardSelected) {
  setTimeout(() => {
    cardSelected[0].classList.remove("selected");
    cardSelected[1].classList.remove("selected");
  }, 500);
}

function addCorrectClass(cardSelected) {
  setTimeout(() => {
    cardSelected[0].classList.add("correct");
    cardSelected[1].classList.add("correct");
  }, 200);
}

function addSelectedToCard(cardSelected) {
  cardSelected.length;
  cardSelected[0].classList.add("selected");
  if (cardSelected.length == 2) {
    cardSelected[1].classList.add("selected");
  }
  // try to add to the second item too and add delay to the correct class
}

function resetCardSelection() {
  howManyCardsSelected = 0;
  selectedIcons = [];
  cardSelected = [];
}

function countMoves() {
  countPlayerMoves++;
  let icons = document.querySelectorAll("div.stars-holder span > i");
  switch (countPlayerMoves) {
    case 11:
      icons[2].className = "fa-regular fa-star";
      break;
    case 14:
      icons[1].className = "fa-regular fa-star";
      break;
    case 17:
      icons[0].className = "fa-regular fa-star";
      break;
  }
}

function resetStarsClass() {
  let stars = document.querySelectorAll("div.stars-holder span i.fa-regular");
  if (stars) {
    stars.forEach((element) => {
      element.classList.replace("fa-regular", "fa-solid");
    });
  }
}

function startTimer() {
  resetTimerSpan();
  console.log(timerInterval);
  clearInterval(timerInterval);
  timerInterval = false;

  let seconds = 0,
    minutes = 0;
  let time = "";
  if (!gameOver) {
    timerInterval = setInterval(() => {
      if (seconds > 9) {
        seconds++;
        time = "0" + minutes + ":" + seconds;
      } else {
        seconds++;
        time = "0" + minutes + ":0" + seconds;
      }
      if (seconds == 60) {
        seconds = 0;
        minutes++;
        time = "0" + minutes + ":0" + seconds;
      }
      document.querySelector("span.time-count").innerHTML = time;
    }, 1000);
  }
}

function resetTimerSpan() {
  let time = "00:00";
  let span = document.querySelector("span.time-count");
  if (span) {
    span.innerHTML = time;
  }
}

function flipCardWhenGameStart() {
  let cards = document.querySelectorAll("div.card");
  cards.forEach((element) => {
    element.classList.add("show");
    setTimeout(() => {
      element.classList.remove("show");
    }, 5000);
  });
}

function initializeGame() {
  appendToMainDiv(
    createHeaderSection(),
    createBestScoreSection(),
    createTimerStarsSection(),
    createCardSection()
  );
  restartTheGame();
  startTimer();
  flipCardWhenGameStart();
  selectAllCards();
  showMovesNumber();
}

initializeGame();
