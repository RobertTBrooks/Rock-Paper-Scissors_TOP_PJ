
/* TODO: Declare the players score variables
    Your game will keep track of the players score. 
    You will write variables to keep track of the players score.
    Create two new variables named humanScore and computerScore in the global scope.
    Initialize those variables with the value of 0

*/
let humanScore = 0;
let computerScore = 0;
let gameTerminated = false;

/* TODO: write a function that randomly returns “rock”, “paper” or “scissors”.
Write the code so that getComputerChoice will randomly return one of the following string 
values: “rock”, “paper” or “scissors”.

Test that your function returns what you expect using console.log*/

function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3) + 1;
    const options = {
        1: 'rock',
        2: 'paper',
        3: 'scissors'
    }
    return options[choice];
}

/* TODO: Write the logic to get the human choice
    Create a new function named getHumanChoice
    Write the code so that getHumanChoice will 
    return one of the valid choices depending on what the user inputs. 

    Test what your function returns by using console.log.
*/
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




/* TODO: Write the logic to play a single round

    The game will be played round by round. You will write a function that takes the 
    human and computer player choices as arguments, plays a single round, increments 
    the round winner’s score and logs a winner announcement.

    Create a new function named playRound.
    Define two parameters for playRound: humanChoice and computerChoice. Use these two parameters to 
    take the human and computer choices as arguments.
    Make your function’s humanChoice parameter case-insensitive so that players can 
    input “rock”, “ROCK”, “RocK”, or other variations.
    Write the code for your playRound function to console.log a string value representing the 
    round winner, such as: “You lose! Paper beats Rock”.
    Increment the humanScore or computerScore variable based on the round winner.

*/
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

/*TODO: Write the logic to play the entire game

    The game will play 5 rounds. You will write a function named playGame that calls playRound to 
    play 5 rounds, keeps track of the scores and declares a winner at the end.

    Create a new function named playGame.
    Move your playRound function and score variables so that they’re declared inside 
    of the new playGame function
    
    Play 5 rounds by calling playRound 5 times.
        Re-work your previous functions or create more helper functions if necessary. 
        Specifically, you may want to change the return values to something more useful.
        If you already know about loops, you can use them. If not, don’t worry! 
        Loops will be covered in the next lesson.
 */

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