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
var ARITHMETIC = 0;
var ALGEBRA = 1;
var number1 = Math.floor(Math.random() * 10);
var number2 = Math.floor(Math.random() * 9) + 1;
var arithmeticFunction = Math.floor(Math.random() * 4);
var alignment = HORIZONTAL;
var correctAnswers = 0;
var mathSubject;

if (document.getElementById("title").innerText === "Arithmetic Practice") {
	mathSubject = ARITHMETIC;
} else {
	mathSubject = ALGEBRA;
}

var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
//canvas.width = parseInt(paint_style.getPropertyValue('width'));
//canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';
 
canvas.addEventListener('mousedown', function(e) {
	if (mouse.x > 260 && mouse.y < 50) {
		ctx.beginPath();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawQuestion();
	} else {
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);
		ctx.strokeStyle = '#00CC99';
	}
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
	if (mouse.x > 260 && mouse.y < 50) {
		ctx.beginPath();
		canvas.removeEventListener('mousemove', onPaint, false);
	} else {
		canvas.removeEventListener('mousemove', onPaint, false);
	}
}, false);

document.addEventListener('keydown', function() {
	document.getElementById("answer").focus();
}, false);

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

function draw() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(IMAGES_LOADED === 1){
		
	}
}

function drawQuestion() {
	ctx.font = "45px Arial";
	if (mathSubject === ARITHMETIC) {
		if (alignment === HORIZONTAL) {
			ctx.textAlign = "left";
			if (arithmeticFunction === ADDITION) {
				ctx.fillText(number1 + " + " + number2 + " =",130,200);
			} else if (arithmeticFunction === SUBTRACTION) {
				ctx.fillText(number1 + " - " + number2 + " =",130,200);
			} else if (arithmeticFunction === MULTIPLICATION) {
				ctx.fillText(number1 + " x " + number2 + " =",130,200);
			} else if (arithmeticFunction === DIVISION) {
				ctx.fillText((number1 * number2) + unescape('%F7') + number2 + " =",130,200);
			}
		} else {
			ctx.textAlign = "right";
			if (arithmeticFunction === ADDITION) {
				ctx.fillText(number1,190,160);
				ctx.fillText(number2,190,200);
				ctx.fillText("+",130,200);
				ctx.fillText("____",190,200);
			} else if (arithmeticFunction === SUBTRACTION) {
				ctx.fillText(number1,190,160);
				ctx.fillText(number2,190,200);
				ctx.fillText("-",130,200);
				ctx.fillText("____",190,200);
			} else if (arithmeticFunction === MULTIPLICATION) {
				ctx.fillText(number1,190,160);
				ctx.fillText(number2,190,200);
				ctx.fillText("x",130,200);
				ctx.fillText("____",190,200);
			} else if (arithmeticFunction === DIVISION) {
				ctx.fillText(number1 * number2,190,160);
				ctx.fillText(number2,190,200);
				ctx.fillText(unescape('%F7'),130,200);
				ctx.fillText("____",190,200);
			}
		}
	} else {
		ctx.textAlign = "left";
		ctx.fillText("x + " + number1 + " = " + (number1 + number2),130,200);
	}
	ctx.textAlign = "left";
	ctx.font = "15px Arial";
	ctx.fillText("Your Score: " + correctAnswers,10,30);
	ctx.textAlign = "right";
	ctx.fillText("Clear scratch pad",385,30);
	ctx.strokeStyle = '#000000';
	ctx.rect(260, 0, 140, 50);
	ctx.stroke();

}
function correctAnswerMade() {
	//alert("correct");
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (mathSubject === ARITHMETIC) {
		if (alignment === HORIZONTAL) {
			alignment = VERTICAL;
		} else {
			alignment = HORIZONTAL;
		}
	}
	correctAnswers++;
	number1 = Math.floor(Math.random() * 10);
	number2 = Math.floor(Math.random() * 10);
	if (correctAnswers > 4) {
		number1 = Math.floor(Math.random() * 100);
		number2 = Math.floor(Math.random() * 10);
	}
	if (correctAnswers > 9) {
		number1 = Math.floor(Math.random() * 100);
		number2 = Math.floor(Math.random() * 100);
	}
	arithmeticFunction = Math.floor(Math.random() * 4);
	if (arithmeticFunction === DIVISION && number2 === 0) {
		number2++;
	}
	document.getElementById("answer").value = "";
	drawQuestion();
}
drawQuestion();
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
	if (mathSubject === ARITHMETIC) {
		if (arithmeticFunction === ADDITION) {
			if(parseInt(guess)===number1 + number2) {
				correctAnswerMade();
			} else {
				//alert("flail");
			}
		} else if (arithmeticFunction === SUBTRACTION) {
			if(parseInt(guess)===number1 - number2) {
				correctAnswerMade();
			} else {
				//alert("flail");
			}
		} else if (arithmeticFunction === MULTIPLICATION) {
			if(parseInt(guess)===number1 * number2) {
				correctAnswerMade();
			} else {
				//alert("flail");
			}
		} else if (arithmeticFunction === DIVISION) {
			if(parseInt(guess)===number1) {
				correctAnswerMade();
			} else {
				//alert("flail");
			}
		}
	} else {
		if(parseInt(guess)===number2) {
			correctAnswerMade();
		} else {
			//alert("flail");
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