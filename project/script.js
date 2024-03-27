const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let checkerBoard = [
   ['red', '', 'red', '', 'red', '', 'red', ''],
   ['', 'red', '', 'red', '', 'red', '', 'red'],
   ['red', '', 'red', '', 'red', '', 'red', ''],
   ['', '', '', '', '', '', '', ''],
   ['', '', '', '', '', '', '', ''],
   ['', 'grey', '', 'grey', '', 'grey', '', 'grey'],
   ['grey', '', 'grey', '', 'grey', '', 'grey', ''],
   ['', 'grey', '', 'grey', '', 'grey', '', 'grey']
];

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

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.stroke();
    ctx.fillRect(x, y, 100, 100);
}

function drawCircle(x,y,color) {
    let radius = 35;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function drawPieces(checker){
    let y = 50;
    let x;
    for (let row = 0; row < checker.length; row++) {
        x = 50;
        for (let col = 0; col < checker[row].length; col++) {
            if ((row + col) % 2 !== 0) {
                if (row < 3) {
                    color = "red";
                    drawCircle(x, y, color);
                } else if (row > 4) {
                    color = "grey";
                    drawCircle(x, y, color);
                }
            }
            x += 100;
        }
        y += 100;
    }
}

drawBoard(checkerBoard);
drawPieces(checkerBoard);