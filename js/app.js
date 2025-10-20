/*-------------------------------- Constants --------------------------------*/
//5) Define the required constants.
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

/*---------------------------- Variables (state) ----------------------------*/
//1) Define the required variables used to track the state of the game.
let board = []
let turn = 'X'
let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/

//2) Store cached element references.
const squareElements = document.querySelectorAll('.sqr')
// console.dir(squareElements)
const messageElement = document.querySelector('#message')
// console.dir(messageElement)
const boardElement = document.querySelector('.board')
// console.dir(boardElement)
const resetBtnElement = document.querySelector('#reset')
// console.dir(resetBtnElement)

/*-------------------------------- Functions --------------------------------*/
//4) The state of the game should be rendered to the user.
//7) Create Reset functionality.
const init = () => {
    // console.log('board loaded!')
    turn = 'X'
    winner = false
    tie = false
    board = ['', '', '','', '', '','', '', '']
    render()
}

const render = () => {
    updateBoard()
    updateMessage()
    // console.log('rendered board!')
}

const updateBoard = () => {
    board.forEach((value, i) => {
        squareElements[i].textContent = value
    })
    // console.log('board updated!')
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageElement.textContent = `It is player ${turn}'s turn!`
    } else if (winner === false && tie === true) {
        messageElement.textContent = "Tie game!"
    } else {
        messageElement.textContent = `The winner is ${turn}!`
    } 
}

const placePiece = (index) => {
    board[index] = turn
}

const checkForWinner = () => {
    winningCombinations.forEach((combo) => {
        if(
            board[combo[0]] != '' && 
            board[combo[0]] === board[combo[1]] && 
            board[combo[0]] === board[combo[2]]
        ) {
        winner = true;
        }
    })
}

const checkForTie = () => {
    if(winner === true) {
        return
    }
    if (board.includes('')){
        tie = false
    } else {
        tie = true
    }
}

const switchTurn = () => {
    if(winner === true) {
        return
    }

    if(winner === false && turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    }
}

const handleClick = (event) => {
    if(!event.target.classList.contains('sqr')) {
        return // if the target of the click event does not contain the class "sqr" then return out of the handleClick function and do nothing.
    }
    
    let squareIdx = Number(event.target.id) // set square index to the number data type of the id of the element clicked
    console.log(squareIdx)

    if(board[squareIdx] === 'X' || board[squareIdx] === 'O' || winner === true) return // break out of handleClick if the square already has a value or if winner is true.

    placePiece(squareIdx)
    checkForWinner()
    checkForTie()
    switchTurn()

    render()
}

/*----------------------------- Event Listeners -----------------------------*/
//6) Handle a player clicking a square with a `handleClick` function.
boardElement.addEventListener('click', handleClick)
resetBtnElement.addEventListener('click', init)
//3) Upon loading, the game state should be initialized, and a function should be called to render this game state.

init()