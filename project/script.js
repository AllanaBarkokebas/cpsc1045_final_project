const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

let checkerBoard = [
    ['', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey'],
    ['darkslategrey', '', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey', ''],
    ['', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['burlywood', '', 'burlywood', '', 'burlywood', '', 'burlywood', ''],
    ['', 'burlywood', '', 'burlywood', '', 'burlywood', '', 'burlywood'],
    ['burlywood', '', 'burlywood', '', 'burlywood', '', 'burlywood', '']
];

for (let y = 0; y < checkerBoard.length; y++) {
    for (let x = 0; x < checkerBoard[y].length; x++) {
        if (checkerBoard[y][x] === 'darkslategrey') {
            checkerBoard[y][x] = new Piece(y, x, "darkslategrey")
        } else if (checkerBoard[y][x] === 'burlywood') {
            checkerBoard[y][x] = new Piece(y, x, 'burlywood')
        }
    }
}

function drawBoard() {

    for (let row = 0; row < checkerBoard.length; row++) {
        let y = row * 100;
        for (let col = 0; col < checkerBoard[row].length; col++) {
            let x = col * 100
            if ((row + col) % 2 === 0) {
                drawSquare(x, y, "maroon");
            } else {
                drawSquare(x, y, "black");
            }
        }
    }
}

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.stroke();
    ctx.fillRect(x, y, 100, 100);
}

function drawCircle(x, y, primaryColor) {
    let radius = 45;
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

    let secondaryColor = 'goldenrod';
    if (primaryColor === 'darkslategrey') {
        secondaryColor = 'grey';
    }

    radius = 40;
    ctx.strokeStyle = secondaryColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.stroke();
}

function drawPieces() {
    for (let row = 0; row < checkerBoard.length; row++) {
        for (let col = 0; col < checkerBoard[row].length; col++) {
            if (checkerBoard[row][col] !== '') {
                checkerBoard[row][col].draw(row, col)
            }
        }
    }
}

function Piece(row, col, color) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.isClicked = false;
    this.isKing = false;
    this.draw = function (row, col) {

        let x = 100 * col + 50;
        let y = 100 * row + 50;

        if (this.isClicked === true) {
            let radius = 48;
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        if (checkerBoard[row][col].color === "darkslategrey") {
            drawCircle(x, y, "darkslategrey")
        } else if (checkerBoard[row][col].color === "burlywood") {
            drawCircle(x, y, 'burlywood')
        }

        if (this.isKing === true) {
            let primaryColor = "black";
            let secondaryColor = "maroon";

            if (this.color === "darkslategrey") {
                primaryColor = "maroon";
                secondaryColor = "black";
            }

            let radius = 45;
            let quarterFromCenter = radius / 2;
            let quarterLeft = x - quarterFromCenter;
            let quarterRight = x + quarterFromCenter;
            let quarterDown = y + quarterFromCenter;
            let quarterUp = y - quarterFromCenter;

            ctx.fillStyle = primaryColor;

            ctx.beginPath();
            ctx.lineTo(quarterLeft, quarterDown);
            ctx.lineTo(quarterRight, quarterDown);
            ctx.lineTo(quarterRight, quarterUp);
            ctx.lineTo(x + 10, y);
            ctx.lineTo(x, quarterUp - 10);
            ctx.lineTo(x - 10, y);
            ctx.lineTo(quarterLeft, quarterUp);
            ctx.lineTo(quarterLeft, quarterDown);
            ctx.fill();

            ctx.fillStyle = secondaryColor;
            ctx.beginPath();
            ctx.lineTo(x, quarterDown - 5);
            ctx.lineTo(x - 5, quarterDown - 10);
            ctx.lineTo(x - 5, quarterDown - 20);
            ctx.lineTo(x, quarterDown - 25);
            ctx.lineTo(x + 5, quarterDown - 20);
            ctx.lineTo(x + 5, quarterDown - 10);
            ctx.lineTo(x, quarterDown - 5);
            ctx.fill();

            ctx.fillStyle = primaryColor;
            ctx.beginPath();
            ctx.arc(x, y + 7, 3, 0, 2 * Math.PI)
            ctx.fill();

            ctx.strokeStyle = primaryColor;
            ctx.beginPath();
            ctx.lineTo(x, quarterDown - 5);
            ctx.lineTo(x - 2, quarterDown - 10);
            ctx.lineTo(x - 2, quarterDown - 20);
            ctx.lineTo(x, quarterDown - 25);
            ctx.lineTo(x + 2, quarterDown - 20);
            ctx.lineTo(x + 2, quarterDown - 10);
            ctx.lineTo(x, quarterDown - 5);
            ctx.stroke();
        }
    }

    this.checkKing = function () {
        if (this.color === "darkslategrey") {
            if (this.row === 7) {
                this.isKing = true;
            }
        } else if (this.color === "burlywood") {
            if (this.row === 0) {
                this.isKing = true;
            }
        }
    }

    this.move = function (newRow, newCol) {
        this.row = newRow;
        this.col = newCol;
        this.checkKing();
    }

    this.isValidMove = function (newRow, newCol) {
        const moveIsSameColumn = this.col - newCol === 0;
        const moveIsOneColumnAbsolute = Math.abs(this.col - newCol) === 1;

        const moveIsTwoColumnsLeft = this.col - newCol === 2;
        const moveIsTwoColumnsRight = this.col - newCol === -2;

        const moveIsSameRow = this.row - newRow === 0;
        const moveIsOneRowAbsolute = Math.abs(this.row - newRow) === 1;

        const moveIsOneRowUp = this.row - newRow === 1;
        const moveIsTwoRowsUp = this.row - newRow === 2;

        const moveIsOneRowDown = this.row - newRow === -1;
        const moveIsTwoRowsDown = this.row - newRow === -2;

        if ((moveIsOneColumnAbsolute && moveIsSameRow) || (moveIsSameColumn && moveIsOneRowAbsolute)) {
            return false;
        } else if (checkerBoard[newRow][newCol] === '') {
            if (moveIsOneColumnAbsolute) {
                if (
                    (this.color === 'darkslategrey' || this.isKing === true) &&
                    moveIsOneRowDown) {
                    return true;
                } else if (
                    (this.color === 'burlywood' || this.isKing === true) &&
                    moveIsOneRowUp) {
                    return true;
                }
            } else if (moveIsTwoColumnsLeft) {
                if (
                    (this.color === 'darkslategrey' || this.isKing === true) &&
                    moveIsTwoRowsDown &&
                    checkerBoard[this.row + 1][this.col - 1] !== '' &&
                    checkerBoard[this.row + 1][this.col - 1].color !== this.color) {
                    checkerBoard[this.row + 1][this.col - 1] = "";
                    return true;
                } else if (
                    (this.color === 'burlywood' || this.isKing === true) &&
                    moveIsTwoRowsUp &&
                    checkerBoard[this.row - 1][this.col - 1] !== '' &&
                    checkerBoard[this.row - 1][this.col - 1].color !== this.color) {
                    checkerBoard[this.row - 1][this.col - 1] = "";
                    return true;
                }
            } else if (moveIsTwoColumnsRight) {
                if (
                    (this.color === 'darkslategrey' || this.isKing === true) &&
                    moveIsTwoRowsDown &&
                    checkerBoard[this.row + 1][this.col + 1] !== '' &&
                    checkerBoard[this.row + 1][this.col + 1].color !== this.color) {
                    checkerBoard[this.row + 1][this.col + 1] = "";
                    return true;
                } else if (
                    (this.color === 'burlywood' || this.isKing === true) &&
                    moveIsTwoRowsUp &&
                    checkerBoard[this.row - 1][this.col + 1] !== '' &&
                    checkerBoard[this.row - 1][this.col + 1].color !== this.color) {
                    checkerBoard[this.row - 1][this.col + 1] = "";
                    return true;
                }
            }
        }
        return false;
    }
}

function getSelectedPiece() {
    let isClickedValue;
    for (let row = 0; row < checkerBoard.length; row++) {
        for (let col = 0; col < checkerBoard[row].length; col++) {
            isClickedValue = checkerBoard[row][col].isClicked;
            if (isClickedValue !== true) {
                isClickedValue = null;
            } else {
                return checkerBoard[row][col];
            }
        }
    }
    return isClickedValue;
}

document.addEventListener("DOMContentLoaded", function () {
    drawBoard();
    drawPieces();
});

canvas.onclick = function (event) {

    x = Math.floor(+event.offsetX / 100);
    y = Math.floor(+event.offsetY / 100);

    if (checkerBoard[y][x] !== '') {
        let selectedPiece = getSelectedPiece()
        if (selectedPiece !== null) {
            selectedPiece.isClicked = !selectedPiece.isClicked;
        }
    } else {
        let selectedPiece = getSelectedPiece()
        if (selectedPiece !== null) {
            if (selectedPiece.isValidMove(y, x)) {
                let oldPositionX = selectedPiece.col;
                let oldPositionY = selectedPiece.row;
                checkerBoard[y][x] = checkerBoard[oldPositionY][oldPositionX];
                checkerBoard[y][x].move(y, x);
                checkerBoard[oldPositionY][oldPositionX] = "";
            }
        }
    }

    checkerBoard[y][x].isClicked = !checkerBoard[y][x].isClicked;

    drawBoard();
    drawPieces();
}

