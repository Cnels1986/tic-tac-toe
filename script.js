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
const Player = (sym) => {

    const getSymbol = () => sym;

    return {getSymbol};
};

// module for the gameboard
const gameBoard = (() => {

    // const board = ['x','x','o','o','x','o','o','x','x'];
    // const board = [0,1,2,3,4,5,6,7,8];
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
            });
            boardDiv.appendChild(spotDiv);
        });
    };

    function setSpot(val, index){
        board[index] = val;
        const test = document.querySelector("[data-index='" + index + "']");
        test.textContent = val;
        test.classList.add('disable');
    }

    function getSpot(a){
        return board[a];
    }

    function reset(){
        console.log('resetting board');
    }

    return { populateBoard, setSpot, getSpot, reset };
})();

// module for the game controller
const gameController = (() => {

    function checkVictory(){
        console.log('checking for victory');
    }

    return { checkVictory };
})();
