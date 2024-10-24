let minutesTarget = 5;  
let hoursTarget = 2;    
let secondsTarget = 30;  

function updateCards() {
  updateCard('minutes', minutesTarget);
  updateCard('hours', hoursTarget);
  updateCard('seconds', secondsTarget);
}

function updateCard(card, value) {
  const front = document.getElementById(`${card}Front`);
  const back = document.getElementById(`${card}Back`);
  back.textContent = value < 10 ? `0${value}` : value;

  const cardElement = document.getElementById(`${card}Card`);
  cardElement.classList.add('flipped');
  setTimeout(() => {
    front.textContent = back.textContent;
    cardElement.classList.remove('flipped');
  }, 500);
}

function updateCountdown() {
  if (secondsTarget > 0) {
    secondsTarget--;
    updateCard('seconds', secondsTarget);
  } else {
    if (minutesTarget > 0) {
      minutesTarget--;
      secondsTarget = 59;
      updateCard('minutes', minutesTarget);
      updateCard('seconds', secondsTarget);
    } else if (hoursTarget > 0) {
      hoursTarget--;
      minutesTarget = 59;
      secondsTarget = 59;
      updateCard('hours', hoursTarget);
      updateCard('minutes', minutesTarget);
      updateCard('seconds', secondsTarget);
    } else {
      document.getElementById('message').textContent = 'Countdown Complete!';
      clearInterval(countdownInterval);
    }
  }
}

let countdownInterval;

document.getElementById('startButton').addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
});

document.getElementById('pauseButton').addEventListener('click', () => {
  clearInterval(countdownInterval);
});

document.getElementById('resetButton').addEventListener('click', () => {
  clearInterval(countdownInterval);
  minutesTarget = 5;  
  hoursTarget = 2;    
  secondsTarget = 30;  
  updateCards();
  document.getElementById('message').textContent = '';  // Clear message on reset
});

updateCards();
