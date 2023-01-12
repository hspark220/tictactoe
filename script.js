const gameBoard = (() => {
    let _board = [
        "","","",
        "","","",
        "","",""
    ]

    const markBoard = (position, mark) => {
        console.log("MODULE WORKS");
        //board[position] = mark;

    }
    return {markBoard}
})();

const player = (name, mark) => {
    return {name, mark}
}
