"use strict";
// global variable declaration
let canvas;
let ctx;

let secondsPassed = 0;
let oldTimeStamp = 0;

let margin = 100;

const results = [
    { title: "Russisch", value: 18, shade: "blue" },
    { title: "Italienisch", value: 11, shade: "green" },
    { title: "Türkisch", value: 11, shade: "red" },
    { title: "Spanisch", value: 6, shade: "yellow" },
    { title: "Französisch", value: 5, shade: "blue" },
    { title: "Chinesisch", value: 5, shade: "red" },
    { title: "Portugiesisch", value: 5, shade: "green" },
    { title: "Polnisch", value: 4, shade: "red" },
    { title: "Griechisch", value: 4, shade: "blue" },
    { title: "Kurdisch", value: 3, shade: "green" },
    { title: "Ungarisch", value: 3, shade: "red" },
    { title: "Schwedisch", value: 2, shade: "yellow" },
    { title: "Persisch", value: 2, shade: "#0a9627" },
    { title: "Farsi", value: 2, shade: "#0a9627" },
    { title: "Marokanisch", value: 2, shade: "#0a9627" },
    { title: "Arabisch", value: 2, shade: "#0a9627" },
    { title: "Afghanisch", value: 1, shade: "#0a9627" },
    { title: "Indonesisch", value: 1, shade: "#0a9627" },
    { title: "Ukrainisch", value: 1, shade: "#0a9627" },
    { title: "Serbisch", value: 1, shade: "#0a9627" },
    { title: "Niederländisch", value: 1, shade: "#0a9627" },
];

let sum = 0;
let totalNumberOfObjects = results.reduce((sum, { value }) => sum + value, 0);
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

    if (multiplier < 1) {
        multiplier += secondsPassed;
    }
    if (multiplier > 1) {
        multiplier = 1;
    }
    
    draw();

    // The loop function has reached it's end. Keep requesting new frames
    if (multiplier != 1) {
        window.requestAnimationFrame(gameLoop);
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
    currentAngle = -0.5 * Math.PI;

    for (let object of results) {
        //calculating the angle the slice (portion) will take in the chart
        let portionAngle = multiplier * (object.value / totalNumberOfObjects) * 2 * Math.PI;
        //drawing an arc and a line to the center to differentiate the slice from the rest
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - margin, currentAngle, currentAngle + portionAngle);
        currentAngle += portionAngle;
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        //filling the slices with the corresponding mood's color
        ctx.fillStyle = "#0b3464";
        ctx.fill();

        var x = Math.cos(currentAngle - portionAngle / 2) * (canvas.height / 2 - margin) + canvas.width / 2;
        var y = Math.sin(currentAngle - portionAngle / 2) * (canvas.height / 2 - margin) + canvas.height / 2;
        ctx.fillStyle = "black";

        let percentage = ~~(object.value / totalNumberOfObjects * 1000) / 10;

        if (percentage < 2) {
            ctx.textAlign = "left";
            ctx.translate(x, y);
            ctx.rotate(currentAngle - portionAngle / 2);
            ctx.font = '12px serif';
            ctx.fillText(object.title, 0, 0);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        } else {
            if (currentAngle - portionAngle / 2 + 0.5 * Math.PI < Math.PI) {
                ctx.textAlign = "left";
            } else {
                ctx.textAlign = "right";
            }
            ctx.font = '12px serif';
            ctx.fillText(object.title, x, y)

            var x = Math.cos(currentAngle - portionAngle / 2) * 0.5 * (canvas.height / 2 + 160 - margin) + canvas.width / 2;
            var y = Math.sin(currentAngle - portionAngle / 2) * 0.5 * (canvas.height / 2 + 160 - margin) + canvas.height / 2;
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText(percentage + "%", x, y)
        }
    }
}