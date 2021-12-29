// factory function for the player
const Player = (name, symbol) => {

    const getSymbol = () => symbol;
    const getName = () => name;

    return { getSymbol, getName };
};

let playerOne;
let playerTwo;
const messageDisplay = document.getElementById('messageDisplay');

// module for the gameboard
const gameBoard = (() => {
    const board = ['','','','','','','','',''];
    const boardDiv = document.getElementById('gameBoard');
    // populates the game board with the board array
    function populateBoard(){
        board.forEach((spot, i) => {
            const spotDiv = document.createElement('div');
            spotDiv.classList.add('spotStyle');
            spotDiv.textContent = spot;
            spotDiv.setAttribute('data-index', i);
            spotDiv.addEventListener('click', () => {
                // gameController.getMessage();
                setSpot(gameController.getPlayerSymbol(), spotDiv.dataset.index);
                gameController.togglePlayer();
                gameController.getMessage();
            });
            boardDiv.appendChild(spotDiv);
        });
    };
    // sets spot that's clicked on to current player
    function setSpot(val, index){
        board[index] = val;
        const test = document.querySelector("[data-index='" + index + "']");
        test.textContent = val;
        test.classList.add('disable');
        // gameController.getMessage();
        gameController.addTurn();
        gameController.checkVictory();
    }
    // returns value of given spot
    function getSpot(a){
        return board[a];
    }
    // clears and resets the game board
    function reset(){
        for(let a = 0; a < 9; a++){
            board[a] = '';
        }
        while(boardDiv.firstChild){
            boardDiv.removeChild(boardDiv.firstChild);
        }
        gameController.reset();
        populateBoard();
    }
    return { populateBoard, setSpot, getSpot, reset };
})();

// module for the game controller
const gameController = (() => {
    // player 1 = true
    // player 2 = false
    let playerTurn = true;
    let moveCounter = 0;

    const winningSpots = [
        [0,1,2],[3,4,5],
        [6,7,8],[0,3,6],
        [1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    function checkVictory(){
        console.log('check victory');
        console.log(moveCounter);
        if(moveCounter >=  9){
            alert('Tie...');
            messageDisplay.textContent = "Tie...";
            disableBoard();
        }
        else {
            for(let a = 0; a < 8; a++){
                let x = gameBoard.getSpot(winningSpots[a][0]);
                let y = gameBoard.getSpot(winningSpots[a][1]);
                let z = gameBoard.getSpot(winningSpots[a][2]);
                if(x == y && x == z && x != ''){
                    if(showTurn() == true){
                        alert(playerOne.getName() + ' won!');
                        messageDisplay.textContent = playerOne.getName() + ' won!';
                    } else{
                        alert(playerTwo.getName() + ' won!');
                        messageDisplay.textContent = playerTwo.getName() + ' won!';
                    }
                    disableBoard();
                }
            }
        }
    }

    function togglePlayer(){
        playerTurn = !playerTurn;
    }

    function showTurn(){
        return playerTurn;
    }

    function getPlayerSymbol(){
        if(showTurn() == true){
            return playerOne.getSymbol();
        } else{
            return playerTwo.getSymbol();
        }
    }

    function getMessage(){
        let player = showTurn();
        if(player == true){
            messageDisplay.textContent = playerOne.getName() + "'s turn";
        } else {
            messageDisplay.textContent = playerTwo.getName() + "'s turn";
        }
    }

    function disableBoard(){
        reset();
        let spots = document.getElementsByClassName('spotStyle');
        for(let a = 0; a < 9; a++){
            spots[a].classList.add('disable');
        }
    }

    function reset(){
        playerTurn = true;
        moveCounter = 0;
    }

    function addTurn(){
        moveCounter++;
    }

    return { checkVictory, togglePlayer, showTurn, getPlayerSymbol, getMessage, reset, addTurn };
})();

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
    gameBoard.reset();
    if(gameController.getPlayerSymbol() == 'o'){
        gameController.togglePlayer();
    }
    messageDisplay.textContent = playerOne.getName() + "'s turn";
})

gameBoard.populateBoard();

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', () => {
    let p1 = document.getElementById('firstPlayer').value;
    let p2 = document.getElementById('secondPlayer').value;
    if(p1 == ''){
        p1 = 'Player One';
    }
    if(p2 == ''){
        p2 = 'Player Two';
    }
    playerOne = Player(p1, 'x');
    playerTwo = Player(p2, 'o');
    messageDisplay.textContent = playerOne.getName() + "'s turn";

    const moveForm = document.getElementById('formContainer');
    moveForm.classList.add('moveUp');
    document.getElementById('formModal').classList.add('hide');
});
