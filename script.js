//Game board module?
const gameBoard = (() => {
    let _board = [
        "","","",
        "","","",
        "","",""
    ]

    const markBoard = (position, mark) => {
        _board[position] = mark;
        //console.log(_board);

    }

    const getBoardMark = (position) => {
        return _board[position];
    }

    const checkBoard = () => {
        if ((_board[0] === _board[1] && _board[1] === _board[2] && _board[0] != "") ||
            (_board[0] === _board[4] && _board[4] === _board[8] && _board[0] != "") ||
            (_board[0] === _board[3] && _board[3] === _board[6] && _board[0] != "") ||
            (_board[2] === _board[5] && _board[5] === _board[8] && _board[2] != "") ||
            (_board[2] === _board[4] && _board[4] === _board[6] && _board[2] != "") ||
            (_board[6] === _board[7] && _board[8] === _board[7] && _board[6] != "") ||
            (_board[1] === _board[4] && _board[4] === _board[7] && _board[1] != "") ||
            (_board[3] === _board[4] && _board[4] === _board[5] && _board[3] != "")){
            return true;
        }
        else {
            return false;
        }
    }    

    const isFull = () => {
        return !_board.includes("");
    }

    const isEmpty = (position) => {
        return _board[position] === "" ? true : false;
    }

    return {markBoard, getBoardMark, checkBoard, isFull, isEmpty}
})();

// For creating players
const player = (_name, _mark) => {
    const getName = () => {
        return _name;
    }

    const getMark = () => {
        return _mark;
    }

    return {getMark, getName}
}

// Running the game and the logics
const game = ((player1, player2) => {
    let _playerTurn;

    const _printBoard = () => {
        for(let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i+1}`);
            box.addEventListener('click', _markBox);
        }
    };

    const _disableBoard = () => {
        for(let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i+1}`);
            box.removeEventListener('click', _markBox);
        }
    }

    const _markBox = (e) => {
        const position = e.target.getAttribute('id')[3]-1;
        if(gameBoard.isEmpty(position)){
            e.target.append(_playerTurn.getMark());
            gameBoard.markBoard(position, _playerTurn.getMark());
            if(gameBoard.checkBoard() || gameBoard.isFull()) {
                endGame()
            }
            _togglePlayer();
        } else {
            console.log("INVALID MOVE")
        }
    }

    _togglePlayer = () => {
        _playerTurn = _playerTurn === player1 ? player2 : player1;
    }

    const endGame = () => {
        const endMessage = document.getElementById('game-message');
        endMessage.innerText = gameBoard.isFull() ? 'GAME IS A DRAW' : `${_playerTurn.getName()} HAS WON!`;
        _disableBoard();
    }

    const playGame = () => {
        player1 = player('xania', 'X');
        player2 = player('apeach', 'O');
        _playerTurn = player1;
        _printBoard();
        
    }
    
    return{playGame}

})();

game.playGame();
