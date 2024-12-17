// Global varibles 
let humanScore = 0;
let computerScore = 0;
let gameTerminated = false;
let playerSelection = '';

const computerScoreTxt = document.querySelector('#score-computer');
const computerChoice = document.querySelector('#computer-choice');
const playerChoice = document.querySelector('#player-choice');
const playerScoreTxt = document.querySelector('#score-player');

const headerLogText = document.querySelector('#log-text');



// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll(".rps-button");



const button = document.querySelector('#start-game-button');
button.addEventListener('click', () => {
    resetGame();
    playGame();
});


function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3) + 1;
    const options = {
        1: 'rock',
        2: 'paper',
        3: 'scissors'
    };
    return options[choice];
}

function getHumanChoice() {

    // const gameRules = ['rock', 'paper', 'scissors'];
    // let choiceMade = false;
    // let loop = 0;

    return new Promise((resolve) => {
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                playerSelection = button.value;
                resolve(playerSelection);
            }, { once: true });
        });
    });

    // while (!choiceMade || loop > 100) {
    //     try {
    //         // let choice = prompt("to exit type exit: \nLets play! choose 1 option: rock, paper, scissors: ").toLowerCase();
    
    //         if (choice === 'exit') {
    //             gameTerminated = true;
    //         }
    //         else if (!gameRules.includes(choice)) {
    //             throw new Error("invalid option. Pick rock, paper, or scissors")
            
    //         }
    //         else {
    //             console.log("play picked: " + choice);
    //             return choice;
    //         }
    //         choiceMade = true
    //         // this is here to protect from random endless loop as a backup.
    //         loop++;
            
    //     } catch (error) {
    //         console.error("An error has been thrown. : ", error)
    //     }

    // }
    // if (loop >= 100) {
    //     console.log("Mad lad you either messged up 100 times.. or you hit a loop")
    //     gameTerminated = true;
    // }
    
}

async function playRound() {
    human = await getHumanChoice();
    computer = getComputerChoice();
    givePoint = true;

    const gameRules = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    };

    if (gameRules[human] === computer) {
        humanScore++;
        headerLogText.textContent = "Player wins!: " + human + " beats: " + computer;
        playerChoice.textContent = human;
        computerChoice.textContent = computer;
        return givePoint;
    }
    else if (human === computer) {
        headerLogText.textContent = "Draw";
        playerChoice.textContent = human;
        computerChoice.textContent = computer;
    }
    else {
        computerScore++;
        headerLogText.textContent ="Computer wins!: " + computer + " beats: " + human;
        computerChoice.textContent = computer;
        playerChoice.textContent = human;
        return givePoint;
    }

}


// playGame is main game loop.
async function playGame() {
    let gameOn = 0;
    let winner = '';
    playerScoreTxt.textContent = humanScore;
    computerScoreTxt.textContent = computerScore;
    
    while (!gameTerminated) {
        if (await playRound()) {
            gameOn++
            if (gameOn > 4) {
                gameTerminated = true;
            }
        }
        computerScoreTxt.textContent = computerScore;
        playerScoreTxt.textContent = humanScore;
    }

    if (humanScore > computerScore) {
        winner = "Player wins!: "+ humanScore + "/ " + gameOn;
        gameOn++;
    }
    else if (computerScore > humanScore) {
        winner = "Computer wins!: "+ computerScore + "/ " + gameOn;
        gameOn++;
    }
    else {
        winner = "Draw!! Player score: " + humanScore + "Computer score: " + computerScore;
    }
    showPopup(winner);

}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameTerminated = false;
    playerSelection = '';
    headerLogText.textContent = "Lets Play rock paper scissors!!";
    computerChoice.textContent = "choice";
    playerChoice.textContent = "choice";
}


// Function to show the popup
function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popup.style.display = "block";
}

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Close the popup when clicking on <span> (x)
document.querySelector(".close").onclick = hidePopup;

// Close the popup when clicking outside of it
window.onclick = function(event) {
    const popup = document.getElementById("popup");
    if (event.target == popup) {
        hidePopup();
    }
}

// Example usage:
// showPopup("Hello, this is a popup message!");