const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let checkerBoard = [];
let color;


function initializeBoard(checkers) {
    for (let row = 0; row < 8; row++) {
        checkers[row] = [];
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 0 && row < 3) {
                checkers[row][col] = "red";
            } else if ((row + col) % 2 === 0 && row > 4) {
                checkers[row][col] = "gray";
            } else {
                checkers[row][col] = "";
            }
        }
    }
    console.log(checkerBoard);
}

function drawBoard() {
    let y = 0;
    let x;

    for (let row = 0; row < 8; row++) {
        x = 0;
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 === 0) {
                ctx.fillStyle = "white";
            } else {
                ctx.fillStyle = "black";
            }
            ctx.beginPath();
            ctx.fillRect(x, y, 100, 100);
            x += 100;
        }
        y += 100;
    }
    drawPieces();
}

function drawPieces() {

    let y = 50;
    let x;
    for (let row = 0; row < 8; row++) {
        x = 50;
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 !== 0) {
                if (row < 3) {
                    ctx.fillStyle = "red";
                    ctx.beginPath();
                    ctx.arc(x, y, 35, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                } else if (row > 4) {
                    ctx.fillStyle = "grey";
                    ctx.beginPath();
                    ctx.arc(x, y, 35, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                }
            }
            x += 100;
        }
        y += 100;
    }

}




initializeBoard(checkerBoard);
drawBoard();

