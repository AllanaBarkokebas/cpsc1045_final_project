const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

/* Assingment 1 - Step 1 */
let checkerBoard = [
    ['', new Piece(0, 1, "red", "false"), '', new Piece(0, 3, "red", "false"), '', new Piece(0, 5, "red", "false"), '', new Piece(0, 7, "red", "false")],
    [new Piece(1, 0, "red", "false"), '', new Piece(1, 2, "red", "false"), '', new Piece(1, 4, "red", "false"), '', new Piece(1, 6, "red", "false"), ''],
    ['', new Piece(2, 1, "red", "false"), '', new Piece(2, 3, "red", "false"), '', new Piece(2, 5, "red", "false"), '', new Piece(2, 7, "red", "false")],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [new Piece(5, 0, "grey", "false"), '', new Piece(5, 2, "grey", "false"), '', new Piece(5, 4, "grey", "false"), '', new Piece(5, 6, "grey", "false"), ''],
    ['', new Piece(6, 1, "grey", "false"), '', new Piece(6, 3, "grey", "false"), '', new Piece(6, 5, "grey", "false"), '', new Piece(6, 7, "grey", "false")],
    [new Piece(7, 0, "grey", "false"), '', new Piece(7, 2, "grey", "false"), '', new Piece(7, 4, "grey", "false"), '', new Piece(7, 6, "grey", "false"), '']
];

/* Assingment 1 - Step */
function drawBoard(checker) {

    let y = 0;
    let x;

    for (let row = 0; row < checker.length; row++) {
        x = 0;
        for (let col = 0; col < checker[row].length; col++) {
            if ((row + col) % 2 === 0) {
                drawSquare(x, y, "white");
            } else {
                drawSquare(x, y, "black");
            }
            x += 100;
        }
        y += 100;
    }

}

/* Assingment 1 - Step */
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.stroke();
    ctx.fillRect(x, y, 100, 100);
}

/* Assingment 1 - Step */
function drawCircle(x, y, color) {
    let radius = 35;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

/* Assingment 1 - Step / Assignemtn2 - Step 3*/
function drawPieces(checker) {
    let y = 50;
    let x;

    for (let row = 0; row < checker.length; row++) {
        x = 50;
        for (let col = 0; col < checker[row].length; col++) {
            let isClickedValue = checkerBoard[row][col].isClicked
            if ((row + col) % 2 !== 0) {
                if (row < 3) {
                    color = "red";
                    let pieceDrawing = new Piece(y, x, color, isClickedValue);
                    pieceDrawing.draw();

                } else if (row > 4) {
                    color = "grey";
                    let pieceDrawing = new Piece(y, x, color, isClickedValue);
                    pieceDrawing.draw();
                }
            }
            x += 100;
        }
        y += 100;
    }
}

/* Assingment 2 - Step 1 to 2 */
function Piece(row, col, color, isClicked, isKing) {
    this.row = row;
    this.col = col;
    this.color = color;
    this.isClicked = isClicked;
    this.isKing = isKing;
    this.draw = function () {

        if (isClicked == "true") {
            let radius = 40;
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(col, row, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        ctx.fillStyle = color;
        drawCircle(col, row, color);
    }
}

function getSelectedPiece() {
    let isClicked = [];

    for (let row = 0; row < checkerBoard.length; row++) {
        for (let col = 0; col < checkerBoard[row].length; col++) {
            let isClickedValue = checkerBoard[row][col].isClicked;
            if (isClickedValue !== undefined && isClickedValue !== null && isClickedValue !== "false") {
                isClicked.push(checkerBoard[row][col]);
            } else {
                isClicked.push("null");
            }
        }
    }
    return isClicked;
}

/* Assingment 1 - Step */
document.addEventListener("DOMContentLoaded", function () {
    drawBoard(checkerBoard);
    drawPieces(checkerBoard);
});

/* Assingment 1 - Step 6 */
canvas.onclick = function (event) {

    x = event.offsetX;
    y = event.offsetY;

    let row = Math.floor(y / 100);
    let col = Math.floor(x / 100);
    let color;

    console.log("Row: " + row + "| Col: " + col);

    let getPieceClicked = getSelectedPiece();

    if (row % 2 == 0) {
        if (col % 2 !== 0) {
            color = checkerBoard[row][col];
            if (color !== '') {
                // alert(color);
            } else if (checkerBoard[row][col] == "") {
                alert("you can move");
            }
        }
        else {
            alert("you cannot move");
        }
    } else if (row % 2 !== 0) {
        if (col % 2 == 0) {
            color = checkerBoard[row][col];
            if (color !== '') {
                // alert(color);
            } else if (checkerBoard[row][col] == "") {
                alert("you can move");
            }
        }
        else {
            alert("you CAN'T move");
        }
    } 
    checkerBoard[row][col].isClicked = "true";


    drawBoard(checkerBoard);
    drawPieces(checkerBoard);
}

