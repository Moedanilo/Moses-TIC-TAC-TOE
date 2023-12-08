console.log('Your JS is linked up. Be the person you needed when you were little.')


/*----- constants -----*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];


/*----- app's state (variables) -----*/
let board;
let turn = 'X';
let win;

/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('#board div')); //will make an array from all elements in query #board div(children)
const messages = document.querySelector('h2'); //targets the h2 elements

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn); //needed in order to return the index of the click on the board and then place mark
document.getElementById('reset-button').addEventListener('click', init);

/*----- functions -----*/
function handleTurn(event) {
    let idx = squares.findIndex(function(square) { //findindex will return the first element that was clicked on the made array from #board div using squares constant variable
    return square === event.target;               //using event listener
    });

    board[idx] = turn; //we will use the event to fill the idx variable on the board array with turn data

    turn = turn === 'X' ? 'O' : 'X'; //<condition=turn> ? <if condition is true, then O for next turn> : <else if condition is false, then X again since turn was not used>
// check your console logs to make sure it's working!

    win = getWinner();

    render();
    };

    function getWinner() {
        let winner = null;
        
        winningCombos.forEach(function(combo, index) { //iterates through winning combos
    
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) //logic to return winner using index of winning combos arrays
        winner = board[combo[0]];
                });
        
        return winner;
        }

function render() {
    // board.forEach(function(mark, index) { //this will iterate through array and create call back and indexes 
    // console.log(mark , index);
    board.forEach(function(mark, index) {
        //this sets the text content of the square of the same position to the mark on the board. 
        squares[index].textContent = mark;
    });

    messages.textContent = `It's ${turn}'s turn!`; //message will change based on turns current data 
    messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`; //this will change message in h2 if tie
    };

function init() {
board = [
    "","","",
    "","","",
    "","",""
];

render();

};

init();
