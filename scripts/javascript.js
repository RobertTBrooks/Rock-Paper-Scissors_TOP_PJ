// Global varibles 
let humanScore = 0;
let computerScore = 0;
let gameTerminated = false;

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3) + 1;
    const options = {
        1: 'rock',
        2: 'paper',
        3: 'scissors'
    }
    return options[choice];
}

function getHumanChoice() {
    const gameRules = ['rock', 'paper', 'scissors'];
    let choiceMade = false;
    let loop = 0;

    while (!choiceMade || loop > 100) {
        try {
            let choice = prompt("to exit type exit: \nLets play! choose 1 option: rock, paper, scissors: ").toLowerCase();
    
            if (choice === 'exit') {
                gameTerminated = true;
            }
            else if (!gameRules.includes(choice)) {
                throw new Error("invalid option. Pick rock, paper, or scissors")
            
            }
            else {
                console.log("play picked: " + choice);
                return choice;
            }
            choiceMade = true
            // this is here to protect from random endless loop as a backup.
            loop++;
            
        } catch (error) {
            console.error("An error has been thrown. : ", error)
        }

    }
    if (loop >= 100) {
        console.log("Mad lad you either messged up 100 times.. or you hit a loop")
        gameTerminated = true;
    }
    
}

function playRound() {
    humanChoice = getHumanChoice();
    computerChoice = getComputerChoice();
    givePoint = true;

    const gameRules = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    };

    if (gameRules[humanChoice] === computerChoice) {
        humanScore++;
        console.log("Player wins!: " + humanChoice + " beats: " + computerChoice);
        return givePoint;
    }
    else if (humanChoice === computerChoice) {
        console.log("Draw");
    }
    else {
        computerScore++;
        console.log("Computer wins!: " + computerChoice + " beats: " + humanChoice);
        return givePoint;
    }

}


// playGame is main game loop.
function playGame() {
    let gameOn = 0
    let winner = ''
    
    while (!gameTerminated) {
        if (playRound()) {
            gameOn++
            if (gameOn > 4) {
                gameTerminated = true;
            }
        }
    }

    if (humanScore > computerScore) {
        winner = "Player wins!: "+ humanScore
        gameOn++;
    }
    else if (computerScore > humanScore) {
        winner = "Computer wins!: "+ computerScore
        gameOn++;
    }
    else {
        winner = "Draw!! Player score: " + humanScore + "Computer score: " + computerScore
    }
    console.log(winner)

}