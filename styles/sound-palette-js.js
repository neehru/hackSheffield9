"use strict";

function initialise(){
    context = document.getElementById('canvas_area').getContext('2d');
    drawStave();
    drawTrebleClef();

    canvasArea.addEventListener('mousedown', function(e) {
        mousePressed = true;
        let offset = canvasArea.getBoundingClientRect();
        let x = e.pageX - offset.left;
        let y = e.pageY - offset.top;
        draw(x, y, false); // Use your draw function
    });

    canvasArea.addEventListener('mousemove', function(e) {
        if (mousePressed) {
            let offset = canvasArea.getBoundingClientRect();
            let x = e.pageX - offset.left;
            let y = e.pageY - offset.top - 35;
            draw(x, y, true); // Use your draw function
        }
    });

    canvasArea.addEventListener('mouseup', function(e) {
        mousePressed = false;
    });

    canvasArea.addEventListener('mouseleave', function(e) {
        mousePressed = false;
    });
}

function draw(x, y, down){
    if (down){
        context.beginPath();
        context.strokeStyle = "rgb(0, 0, 0)"
        context.lineWidth = 2;
            context.lineJoin = "round";
            context.moveTo(lastX, lastY);
            context.lineTo(x, y);
            context.closePath();
        context.stroke();
    }
    lastX = x;
    lastY = y;
}

function drawStave() {
    let canvasWidth = canvasArea.width;
    let margin = 80;
    let yDist = 20;

    for (let i = 1; i <= 5; i++) {
        drawLineOfStave(margin, 30 + i * yDist,canvasWidth - margin, 30 + i * yDist);
    }
}

function drawLineOfStave(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawTrebleClef() {
    context.font = '200px Verdana';
    context.fillText("𝄞", 80, 150, 100);
}

function clearCanvas(){
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawStave();
    drawTrebleClef();
}   


//main program body
let canvasArea = document.getElementById('canvas_area');
let context;
let lastX, lastY;
let mousePressed = false;

let clearButton = document.getElementById('clearCanvas');
clearButton.addEventListener('click', function() {clearCanvas()});


let numOfStaves = 0;
