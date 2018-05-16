var canvas = document.getElementById("myCanvas");
//canvas.width = 300;
//canvas.height = 300;
var ctx = document.querySelector("canvas").getContext("2d");
var IMAGES_LOADED = 1;
var ADDITION = 0;
var SUBTRACTION = 1;
var MULTIPLICATION = 2;
var DIVISION = 3;
var HORIZONTAL = 0;
var VERTICAL = 1;
var number1 = Math.floor(Math.random() * 10);
var number2 = Math.floor(Math.random() * 10);
var arithmeticFunction = ADDITION;
var alignment = HORIZONTAL;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(IMAGES_LOADED === 1){
		ctx.font = "45px Arial";
		if (alignment === HORIZONTAL) {
			if (arithmeticFunction === ADDITION) {
				ctx.fillText(number1 + " + " + number2 + " =",130,200);
			} else if (arithmeticFunction === SUBTRACTION) {
				ctx.fillText(number1 + " - " + number2 + " =",130,200);
			}
		} else {
			if (arithmeticFunction === ADDITION) {
				ctx.fillText(number1,190,160);
				ctx.fillText(number2,190,200);
				ctx.fillText("+",130,200);
				ctx.fillText("____",130,200);
			} else if (arithmeticFunction === SUBTRACTION) {
				ctx.fillText(number1,190,160);
				ctx.fillText(number2,190,200);
				ctx.fillText("-",130,200);
				ctx.fillText("____",130,200);
			}
		}
	}
}

setInterval(draw, 10);

// 1. Create the button
var button = document.getElementById("guessButton");
//var button = document.createElement("button");
//button.id = "selectButton";
//button.margin = 0;
//button.innerHTML = "Select";

// 2. Append somewhere
//var body = document.getElementsByTagName("body")[0];
//body.appendChild(button);
//var buttonDiv = document.getElementById("buttonDiv");
//buttonDiv.appendChild(button);

// 3. Add event handler
button.addEventListener ("click", function() {
	var guess = document.getElementById("answer").value;
	guess = guess.toLowerCase("answer");
	guess = guess.trim(guess);
	//var fail = document.getElementById("fail");
	if (arithmeticFunction === ADDITION) {
		if(parseInt(guess)===number1 + number2) {
			alert("correct");
			if (alignment === HORIZONTAL) {
				alignment = VERTICAL;
			} else {
				alignment = HORIZONTAL;
			}
			number1 = Math.floor(Math.random() * 10);
			number2 = Math.floor(Math.random() * 10);
			arithmeticFunction = Math.floor(Math.random() * 2);
			document.getElementById("answer").value = "";
		} else {
			alert("flail");
		}
	} else if (arithmeticFunction === SUBTRACTION) {
		if(parseInt(guess)===number1 - number2) {
			alert("correct");
			if (alignment === HORIZONTAL) {
				alignment = VERTICAL;
			} else {
				alignment = HORIZONTAL;
			}
			number1 = Math.floor(Math.random() * 10);
			number2 = Math.floor(Math.random() * 10);
			arithmeticFunction = Math.floor(Math.random() * 2);
			document.getElementById("answer").value = "";
		} else {
			alert("flail");
		}
	}
});

document.getElementById("answer")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("guessButton").click();
    }
});