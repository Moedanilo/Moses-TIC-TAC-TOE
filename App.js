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
const [board, setBoard] = React.useState(["","","","","","","","",""]);
let gameOver = false;
const [turn, setTurn] = React.useState('X');
const [win, setWin] = React.useState(null);

/*----- cached element references -----*/

/*----- event listeners -----*/

/*----- functions -----*/
function App() {

    function handleTurn() {
       console.log(event.target);
       let idx = event.target.id;

       if (gameOver == false) {
        let newBoard = [...board];
        newBoard[idx] = turn;
        setBoard(newBoard);
        let moveTurn = turn === 'X' ? 'O' : 'X';
        setTurn(moveTurn);
        let whoWon = getWinner()
        setWin(whoWon)
       };
    };

    function getWinner () {
        let winner= null
        winningCombos.forEach(function (combo,index) {

            if (board[combo[0]] 
                && board[combo[0]] === board[combo[1]] 
                && board[combo[0]] === board[combo[2]]) //logic to return winner using index of winning combos arrays
                winner = board[combo[0]];
            });
            
        return winner ? winner : board.includes('') ? null : 'T';
    };

    function Message () {
        let message = win === 'T' ? `'That's a tie, queen!'` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`
    
        return <h2>{message}</h2>
            }

    return (
                <div>
                    <h1>Tic-React-Toe</h1>
                    <Message />
                    <h2>It's {turn} turn!</h2>
                    {/* <!-- Many websites are just divs on divs on divs. --> */}
                    <div className="flex-container flex-column">
                        <div className="flex-container flex-wrap" id="board" onClick={handleTurn}>
                        {
                            board.map((value, idx) => {
                                return <div key={idx} id={idx} className='square'> {value} </div>
                            })
                        }
                        </div>
                        {/* <!-- I added a little reset button because our users are going to want to play round after round of our glorious game without ever refreshing the browser! -->
                        <button id="reset-button">reset</button> */}
                    </div>
                </div>
                )
    }

ReactDom.render(<App />, root)


