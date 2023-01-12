const gameBoard = (() => {
    let _board = [
        "","","",
        "","","",
        "","",""
    ]

    const markBoard = (position, mark) => {
        board[position] = mark;

    }

    const getBoardMark = (position) => {
        return _board[position];
    }

    return {markBoard, getBoardMark}
})();

const player = (_name, _mark) => {
    const markBox = (position) => {
        gameBoard.markBoard(position, _mark);
    }

    return {markBox}
}

const gameDisplay = (() => {
    const printBoard = () => {
        for(let i = 0; i < 9; i++) {
            const box = document.getElementById(`box${i+1}`);
            box.append(gameBoard.getBoardMark(i));
        }
    };
    return {printBoard};
})();

gameDisplay.printBoard();
