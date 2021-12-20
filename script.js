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

    const board = ['x','x','o','o','x','o','o','x','x'];

    function populateBoard(){
        console.log('populating board');
    }

    function setSpot(a){
        console.log('setting spot value');
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
