"use strict";

function initialise(){
    context = document.getElementById('canvas_area').getContext('2d');
    clearCanvas();

    canvasArea.addEventListener('mousedown', function(e) {
        mousePressed = true;
        let offset = canvasArea.getBoundingClientRect();
        lastX = e.pageX - offset.left - 10; // Update lastX
        lastY = e.pageY - offset.top - 10; // Update lastY
        draw(lastX, lastY, false); // Optional: Start path without drawing
    });

    // Mouse move: Draw while the mouse is pressed
    canvasArea.addEventListener('mousemove', function(e) {
        if (mousePressed) {
            let offset = canvasArea.getBoundingClientRect();
            let x = e.pageX - offset.left - 10;
            let y = e.pageY - offset.top - 10;
            draw(x, y, true); // Draw line
        }
    });

    // Mouse up: Stop drawing
    canvasArea.addEventListener('mouseup', function() {
        mousePressed = false;
        lastX = null; // Reset lastX
        lastY = null; // Reset lastY

        cPush();
    });

    // Mouse leave: Stop drawing
    canvasArea.addEventListener('mouseleave', function() {
        mousePressed = false;
        lastX = null; // Reset lastX
        lastY = null; // Reset lastY
    });
}

function draw(x, y, down){
    if (down && lastX !== null && lastY !== null) {
        context.beginPath();
        context.strokeStyle = "rgb(0, 0, 0)";
        context.lineWidth = 2;
        context.lineJoin = "round";
        context.moveTo(lastX, lastY); // Move to previous coordinates
        context.lineTo(x, y); // Draw line to current coordinates
        context.closePath();
        context.stroke();
    }
    lastX = x; // Update lastX
    lastY = y; // Update lastY

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
    context.lineWidth = 0.5;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawTrebleClef() {
    context.font = '150px Verdana';
    context.fillText("𝄞", 45, 130, 80);
}


function drawTimeSignature() {
    context.font = '65px Allegretto';
    context.fillText(4, 120, 90, 100);
    context.fillText(4, 120, 135, 100);
}

function drawMeasureLines() {
    let canvasWidth = canvasArea.width;
    for (let i = 1; i < 6; i++) {
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(160 + (i-1) * (canvasWidth / 5), 131);
        context.lineTo(160 + (i-1) * (canvasWidth / 5), 49);
        context.stroke();
    }
}

function drawIntermediateLines() {
    let canvasWidth = canvasArea.width;
    for (let i = 1; i <= 16; i++) {
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(160 + i * (canvasWidth / 20), 131);
        context.lineTo(160 + i * (canvasWidth / 20), 49);
        context.stroke();
    }
}

function clearCanvas(){
    // context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawStave();
    drawTrebleClef();
    drawTimeSignature();
    drawMeasureLines();
    // drawIntermediateLines();
    cPush();
}

async function saveCanvasImage() {
    const imageData = canvasArea.toDataURL("image/png"); // Convert canvas to Base64 PNG
    const payload = JSON.stringify({ image: imageData }); // Prepare JSON payload
 
 
    try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure JSON payload
            },
            body: payload,
        });
 
 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
 
 
        const result = await response.json();
        console.log(result); // Log the backend response
    } catch (error) {
        console.error("Error uploading image:", error);
    }
 }

function undo(){
    if (cStep > 0){
        cStep = cStep-2;
        // console.log("undo button pressed, cStep: " + cStep);
        let canvasPic = new Image();
        canvasPic.src = cPushArray[cStep+1];
        canvasPic.onload = function() {
            clearCanvas()
            context.drawImage(canvasPic, 0, 0)
            // console.log("undo: draw index " + cStep+1);
        // cStep--;
        }
    }
}

function cPush(){
    cStep++;
    if (cStep >= 0)
        if(cStep < cPushArray.length)
            cPushArray.length = cStep
        cPushArray[cStep] = (document.getElementById('canvas_area').toDataURL());
        // console.log("cPush: added drawing to index " + cStep);
}

function submit(){ 

    showAudio();
}

function showAudio(){

    audioSource.src="output.wav";
    audio.load();
    audio.play();
    audio.style.display = "flex";
}

//main program body
let canvasArea = document.getElementById('canvas_area');
let context;
let lastX = null;
let lastY = null;
let mousePressed = false;
let cPushArray = new Array();
let cStep = -1;

let clearButton = document.getElementById('clearCanvas');
clearButton.addEventListener('click', function() {clearCanvas()});

let undoButton = document.getElementById('undoButton');
undoButton.addEventListener('click', function() {undo()});

let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function(e){submit()})

let audio = document.getElementById('audio');
audio.style.display = "none";

let audioSource = document.getElementById('audio_src');


