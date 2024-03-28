const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

/* Assingment 1 - Step 1 */
let checkerBoard = [
    ['', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey'],
    ['darkslategrey', '', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey', ''],
    ['', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey', '', 'darkslategrey'],
    ['', '', '', '', '', '', 'burlywood', ''],
    ['', 'darkslategrey', '', '', '', '', '', ''],
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

/* Assingment 1 - Step */
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

/* Assingment 1 - Step */
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.stroke();
    ctx.fillRect(x, y, 100, 100);
}

/* Assingment 1 - Step */
function drawCircle(x, y, primaryColor) {
    let radius = 45;
    ctx.fillStyle = primaryColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.stroke();

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

/* Assingment 1 - Step / Assignemtn2 - Step 3*/
function drawPieces() {
    for (let row = 0; row < checkerBoard.length; row++) {
        for (let col = 0; col < checkerBoard[row].length; col++) {
            if (checkerBoard[row][col] !== '') {
                checkerBoard[row][col].draw(row, col)
            }
        }
    }
}

/* Assingment 2 - Step 1 to 2 */
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

    }

    this.checkKing = function() {
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

    this.move = function(newRow, newCol) {
        this.row = newRow;
        this.col = newCol;
        checkKing();
    }

    this.isValidMove = function(newRow, newCol) {
        const moveIsSameColumn = this.col - newCol === 0;
        const moveIsOneColumnAbsolute = Math.abs(this.col - newCol) === 1;
        const moveIsTwoColumnsLeft = col - newCol === 2;
        const moveIsTwoColumnsRight = col - newCol === -2;

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
                if(
                (this.color === 'darkslategrey' || this.isKing === true) && 
                moveIsOneRowDown) {
                    return true;
                } else if (
                (this.color === 'burlywood' || this.isKing === true) &&
                moveIsOneRowUp) {
                    return true;
                }
            } else if (moveIsTwoColumnsLeft) {
                if(
                (this.color === 'darkslategrey' || this.isKing === true) && 
                moveIsTwoRowsDown && 
                checkerBoard[this.row + 1][this.col - 1] !== '' &&
                checkerBoard[this.row + 1][this.col - 1].color !== this.color) {
                    return true;
                } else if (
                (this.color === 'burlywood' || this.isKing === true) && 
                moveIsTwoRowsUp && 
                checkerBoard[this.row - 1][this.col - 1].color !== '' &&
                checkerBoard[this.row - 1][this.col - 1].color !== this.color) {
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

/* Assingment 1 - Step */
document.addEventListener("DOMContentLoaded", function () {
    drawBoard();
    drawPieces();
});

/* Assingment 1 - Step 6 */
canvas.onclick = function (event) {

    x = Math.floor(+event.offsetX/100);
    y = Math.floor(+event.offsetY/100);

    if (checkerBoard[y][x] !== '') {
        let selectedPiece = getSelectedPiece()
        if (selectedPiece !== null) {
            selectedPiece.isClicked = !selectedPiece.isClicked;
        }
        checkerBoard[y][x].isClicked = !checkerBoard[y][x].isClicked;
    } else {
        let selectedPiece = getSelectedPiece()
        if (selectedPiece !== null) {
            if(selectedPiece.isValidMove(y, x)) {
                alert('legal!')
            }
        }
    }
    console.log(x, y)
    drawBoard();
    drawPieces();
}

