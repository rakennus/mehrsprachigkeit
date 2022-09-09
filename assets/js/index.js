"use strict";
// global variable declaration
let canvas;
let ctx;

let secondsPassed = 0;
let oldTimeStamp = 0;
let fps = 0;

const results = [
    {mood: "Angry", total: 1499, shade: "#0a9627"},
    {mood: "Happy", total: 478, shade: "#960A2C"},
    {mood: "Melancholic", total:332, shade: "#332E2E"},
    {mood: "Gloomy", total: 195, shade: "#F73809"}
];

let sum = 0;
let totalNumberOfPeople = results.reduce((sum, {total}) => sum + total, 0);
let currentAngle = 0;
let multiplier = 0;

window.onload = (event) => {
    canvas = document.getElementById('pie-chart');
    ctx = canvas.getContext('2d');

    window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    if (secondsPassed > 0.1) secondsPassed = 0.1;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);

    if (!document.hidden) {
        // Update game objects in the loop
        update();
        // Perform the drawing operation
        draw();
    }

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function update() {
    multiplier += 1 * secondsPassed;
    if(multiplier >= 1) {
        multiplier = 1;
    }
}

function draw() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw fps
    /*
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("FPS: " + fps, 4, 14);
    */
    currentAngle = -1/2*Math.PI;

    for (let moodValue of results) {
        //calculating the angle the slice (portion) will take in the chart
        let portionAngle = multiplier * (moodValue.total / totalNumberOfPeople) * 2 * Math.PI;
        //drawing an arc and a line to the center to differentiate the slice from the rest
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, canvas.height/2-20, currentAngle, currentAngle + portionAngle);
        currentAngle += portionAngle;
        ctx.lineTo(canvas.width/2, canvas.height/2);
        //filling the slices with the corresponding mood's color
        ctx.fillStyle = moodValue.shade;
        ctx.fill();
    }
}