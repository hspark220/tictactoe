//Game board module?
const gameBoard = (() => {
    let _board = [
        "","","",
        "","","",
        "","",""
    ]

    const markBoard = (position, mark) => {
        _board[position] = mark;
        console.log(_board);

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

    const clearBoard = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = '';
        }
    }

    return {markBoard, getBoardMark, checkBoard, isFull, isEmpty, clearBoard}
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
    const _resetButton = document.getElementById('reset');
    const _endMessage = document.getElementById('game-message');

    const _activateBoard = () => {
        for(let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i+1}`);
            // box.style.visibility = "visible";
            box.addEventListener('click', _markBox);
        }
    };

    const _disableBoard = () => {
        for(let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i+1}`);
            box.removeEventListener('click', _markBox);
        }
    }

    const _clearBoard = () => {
        for (let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i+1}`);
            box.innerHTML = '';
        }
    }

    const _markBox = (e) => {
        const position = e.target.getAttribute('id')[3]-1;
        const currentMark = _playerTurn.getMark()
        if(gameBoard.isEmpty(position)){
            e.target.append(currentMark);
            gameBoard.markBoard(position, currentMark);
            if(gameBoard.checkBoard() || gameBoard.isFull()) {
                _endGame();
            } else {
                _togglePlayer();
            }
            
        } else {
            console.log("INVALID MOVE")
        }
    }

    const _markBoxAI = () => {
        const ranPosition = Math.floor(Math.random()*9);
        const box = document.getElementById(`box${ranPosition+1}`);
        const currentMark = _playerTurn.getMark()
        if(gameBoard.isEmpty(ranPosition)){
            console.log(currentMark)
            box.append(currentMark);
            gameBoard.markBoard(ranPosition, currentMark);
            
            if(gameBoard.checkBoard() || gameBoard.isFull()) {
                _endGame();
            } else {
                _togglePlayer();
            }
            
        } else {
            _markBoxAI();
        }
    }

    _togglePlayer = () => {
        _playerTurn = _playerTurn === player1 ? player2 : player1;
        console.log(_playerTurn.getName());
        if(_playerTurn.getName() === "v1.0") {
            _markBoxAI();
        }
    }

    const _endGame = () => {
        _endMessage.innerText = gameBoard.checkBoard() ? `${_playerTurn.getName()} HAS WON!` : 'GAME IS A DRAW';
        _disableBoard();
        _resetButton.style.visibility = "visible";
        _resetButton.addEventListener('click',_resetGame)
    }

    const _resetGame = () => {
        gameBoard.clearBoard();
        _resetButton.style.visibility = "hidden";
        _endMessage.innerText = "";
        _clearBoard();
        _activateBoard();
    }

    const playGame = () => {
        player1 = player('v1.0', 'X');
        player2 = player('xania', 'O');
        if (player1.getName() === 'v1.0') {
            _playerTurn = player2;
            _togglePlayer();
        } else {
            _playerTurn = player1;
        }
        _activateBoard();
    }

    return{playGame}

})();

game.playGame();
