"use strict";

function initialise(){
    context = document.getElementById('canvas_area').getContext('2d');

    // $('#canvas_area').mousedown(function(e){
    //     mousePressed = true;
    //     Draw(e.pageX = $(this).offset().left, e.pageY - $(this).offset.top, false);
    // });
    //
    // $('#canvas_area').mousedown(function(e){
    //     if (mousePressed){
    //         Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
    //     }
    // });
    //
    // $('#canvas_area').mouseup(function(e){
    //     mousePressed = false;
    // });
    //
    // $('#canvas_area').mouseleave(function(e){
    //     mousePressed = false;
    // });

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
            let y = e.pageY - offset.top;
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

//main program body
let canvasArea = document.getElementById('canvas_area');
let context;
let lastX, lastY;
let mousePressed = false;

let numOfStaves = 0;
