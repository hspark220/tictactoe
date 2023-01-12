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
            (_board[3] === _board[4] && _board[4] === _board[5] && _board[3] != "")
            ){
                console.log("GAME ENDED");
            }
        else {
            if (_board.includes('') === true) {
                return;
            } else {
                console.log("IT'S A DRAW");
            }
        }
    }    

    return {markBoard, getBoardMark, checkBoard}
})();

const player = (_name, _mark) => {
    const getName = () => {
        return _name;
    }

    const getMark = () => {
        return _mark;
    }

    return {getMark}
}

const game = ((player1, player2) => {
    let _playerTurn = player1;

    const printBoard = () => {
        for(let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i+1}`);
            box.addEventListener('click', _markBox);
        }
    };

    const _markBox = (e) => {
        const position = e.target.getAttribute('id')[3]-1;
        if(gameBoard.getBoardMark(position) === ''){
            //change to player's marking
            e.target.append('X');
            gameBoard.markBoard(position, 'X');
            gameBoard.checkBoard();
        } else {
            console.log("SOME ERROR MESSAGE?")
        }
    }

    const playGame = () => {
        player1 = new player('xania', 'X');
        player2 = new player('apeach', 'O');

    }

    
    
    
    return{printBoard}

})();

game.printBoard();
