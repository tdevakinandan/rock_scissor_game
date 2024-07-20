function openModal() {
    var modal = document.getElementById('id01');
    modal.style.display = 'block';
  }
  
  function closeModal() {
    var modal = document.getElementById('id01');
    modal.style.display = 'none';
  }
  
  // Close the modal when the user clicks anywhere outside of the modal
  window.onclick = function(event) {
      var modal = document.getElementById('id01');
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }


// Function to handle the user's choice and update scores
function makeChoice(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let userScore = parseInt(localStorage.getItem('userScore')) || 0;
    let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

    // Determine the result of the game
    if (userChoice === computerChoice) {
        localStorage.setItem('resultMessage', '<span style="font-size: 2em;">TIE UP</span>');
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')
    ) {
        userScore++;
        localStorage.setItem('resultMessage', '<span style="font-size: 2em;">You win</span>\n<span style="font-size: 1em;">AGAINST PC</span>');


    } else {
        computerScore++;
        localStorage.setItem('resultMessage', '<span style="font-size: 2em;">YOU LOST</span>\n<span style="font-size: 1em;">AGAINST PC</span>');
    }

    // Check if either player has reached 2 points to reset the scores
    if (userScore === 5 || computerScore === 5) {
        // Display who won the game
        if (userScore > computerScore) {
            localStorage.setItem('resultMessage', 'You won the game!');
        } else if (computerScore > userScore) {
            localStorage.setItem('resultMessage', 'Computer won the game!');
        } else {
            localStorage.setItem('resultMessage', 'It\'s a tie game!');
        }
        
        // Reset scores to 0 after displaying the result
        userScore = 0;
        computerScore = 0;
    }

    // Store choices and scores in localStorage
    localStorage.setItem('userChoice', userChoice);
    localStorage.setItem('computerChoice', computerChoice);
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);

    // Update the scores displayed on the UI
    updateScores(userScore, computerScore);

    // Redirect to results page or wherever needed
    window.location.href = 'decision.html';
}

// Function to update the scores displayed on the UI
function updateScores(userScore, computerScore) {
    document.getElementById('your-score').textContent = userScore;
    document.getElementById('computer-score').textContent = computerScore;
}

// Event listener to initialize scores when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const userScore = parseInt(localStorage.getItem('userScore')) || 0; // Initial score set to 0
    const computerScore = parseInt(localStorage.getItem('computerScore')) || 0; // Initial score set to 0

    // Update scores on the UI
    updateScores(userScore, computerScore);

    // Retrieve the result message from localStorage
    const resultMessage = localStorage.getItem('resultMessage');

    // Update the result message based on localStorage
    const resultMessageElement = document.getElementById('result-message');
    if (resultMessage === 'You\nwin!') {
        resultMessageElement.innerHTML = '<span class="you">You</span><br><span class="win">win!</span>';
    } else {
        resultMessageElement.textContent = resultMessage;
    }
});
