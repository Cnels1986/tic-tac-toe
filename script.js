// board layout from array
// -------------
// | 0 | 1 | 2 |
// -------------
// | 3 | 4 | 5 |
// -------------
// | 6 | 7 | 8 |
// -------------
// winning combinations:
// 0,1,2
// 3,4,5
// 6,7,8
// 0,3,6
// 1,4,7
// 2,5,8
// 0,4,8
// 2,4,6

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

    function populateBoard(){
        board.forEach((spot, i) => {
            const spotDiv = document.createElement('div');
            spotDiv.classList.add('spotStyle');
            spotDiv.textContent = spot;
            spotDiv.setAttribute('data-index', i);
            spotDiv.addEventListener('click', () => {
                console.log(spotDiv.dataset.index);
                setSpot(gameController.getPlayerSymbol(), spotDiv.dataset.index);
                gameController.togglePlayer();
            });
            boardDiv.appendChild(spotDiv);
        });
    };

    function setSpot(val, index){
        board[index] = val;
        const test = document.querySelector("[data-index='" + index + "']");
        test.textContent = val;
        test.classList.add('disable');
        gameController.checkVictory();
    }

    function getSpot(a){
        return board[a];
    }

    function reset(){
        for(let a = 0; a < 9; a++){
            board[a] = '';
        }
        while(boardDiv.firstChild){
            boardDiv.removeChild(boardDiv.firstChild);
        }
        populateBoard();
    }
    return { populateBoard, setSpot, getSpot, reset };
})();


// module for the game controller
const gameController = (() => {
    // player 1 = true
    // player 2 = false
    let playerTurn = true;
    const winningSpots = [
        [0,1,2],[3,4,5],
        [6,7,8],[0,3,6],
        [1,4,7],[2,5,8],
        [0,4,8],[2,4,8]
    ];

    function checkVictory(){
        for(let a = 0; a < 8; a++){
            let x = gameBoard.getSpot(winningSpots[a][0]);
            let y = gameBoard.getSpot(winningSpots[a][1]);
            let z = gameBoard.getSpot(winningSpots[a][2]);
            if(x == y && x == z && x != ''){
                alert('winner!!!');
                disableBoard();
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

    function disableBoard(){
        playerTurn = true;
        let spots = document.getElementsByClassName('spotStyle');
        for(let a = 0; a < 9; a++){
            spots[a].classList.add('disable');
        }
    }

    return { checkVictory, togglePlayer, showTurn, getPlayerSymbol };
})();

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
    gameBoard.reset();
    if(gameController.getPlayerSymbol() == 'o'){
        gameController.togglePlayer();
    }
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
    console.log('submit');
    const moveForm = document.getElementById('formContainer');
    moveForm.classList.add('moveUp');
    document.getElementById('formModal').classList.add('hide');
});
