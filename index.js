const output = document.getElementById('output');
const cells = document.querySelectorAll('.cell');
const restard_btn = document.querySelector('#restard-btn');
const player_form = document.querySelector('#player-form');

// create player and asign marker
const player = (name, marker) =>{
    return { name, marker };
}

// object gameBoard, manage the board
const gameBoard = {
    board: Array(9).fill(null),

    getBoard() {
        return this.board;
    },

    resetBoard() {
        this.board.fill(null);
    },

    update(index, marker){
        if(this.board[index] == null) {
            this.board[index] = marker;
            return true;
        }
        else {
            return false; 
        }
    }
}

// Control the game state
const DisplayController =( function() {
    let player1 = null;
    let player2 = null;
    let currentPlayer = null;
    let gameActive = false;
    // all the winning combinations
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const CreatePlayer = () => {
        RestardGame();
        const user1_name = document.getElementById('user1-name').value;
        const user2_name = document.getElementById('user2-name').value;

        player1 = player(user1_name, 'X');
        player2 = player(user2_name, 'O');
        currentPlayer = player1
        gameActive = true;
        
    }

    const cellClick = (cell) => {
        const index = cell.target.getAttribute('data-index');
        if(!gameActive || !gameBoard.update(index, currentPlayer.marker)){return;}// player can't over write existing marker
        cell.target.textContent = currentPlayer.marker;

        if(winner()){
            output.textContent = `Congratulation! ${currentPlayer.name} WIN!`;
            gameActive = false;
        }
        else if(gameBoard.getBoard().every(cell => cell)) {
            output.textContent = `DRAW! No one WIN!`;
            gameActive = false
        }
        else{
            switchPlayer();
        }
    }
    // fine the combination index equal to player's marker
    const winner = () => {
        return winCombinations.some((combination)=>{
            return combination.every((index)=>{
                return gameBoard.getBoard()[index] === currentPlayer.marker;    
            })  
        })
    }

    const switchPlayer = () => {
        if(currentPlayer == player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    }

    const RestardGame = () => {
        gameBoard.resetBoard();
        cells.forEach((cell)=>{
            cell.textContent = '';
        })
        output.textContent = '';
        currentPlayer = player1
        if(player1 == null && player2 == null){
            gameActive == false;
        }
        else {
             gameActive = true;
        }
       
    }

    cells.forEach((cell)=>{
        cell.addEventListener('click', cellClick);
    })
    restard_btn.addEventListener('click', RestardGame);
    player_form.addEventListener('submit', (event) =>{
        
        event.preventDefault(); 
        CreatePlayer();
        
        player_form.reset();
    })
    
})();