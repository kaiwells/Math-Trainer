var Images = {};
var canvas = document.getElementById("myCanvas");
//canvas.width = 300;
//canvas.height = 300;
var ctx = document.querySelector("canvas").getContext("2d");
var IMAGES_LOADED = 0;
var ADDITION = 0;
var SUBTRACTION = 1;
var MULTIPLICATION = 2;
var DIVISION = 3;
var HORIZONTAL = 0;
var VERTICAL = 1;
var ARITHMETIC = 0;
var ALGEBRA = 1;
var TIMEBONUS = 2;
var TIMELOSS = 1;
var SCORELOSS = 100;
var PRACTICE = 0;
var GAME = 1;
var number1 = Math.floor(Math.random() * 10);
var number2 = Math.floor(Math.random() * 9) + 1;
var arithmeticFunction = Math.floor(Math.random() * 4);
var alignment = HORIZONTAL;
var correctAnswers = 0;
var score = 0;
var mathSubject = ARITHMETIC;
var resultTimer = 0;
var answerResult = false;
var questionTimer = 1000;
var gameTimer = 0;
var gameStarted = false;
var gameOverTimer = 0;
var imageData = [{
	name: "gameLogo",
	url: "img/gameLogo.png",
}];
var scoreIncrement = 0;
var highscore = localStorage.getItem("highscore");
var gameMode;

//var painting = document.getElementById('paint');
//var paint_style = getComputedStyle(painting);
//canvas.width = parseInt(paint_style.getPropertyValue('width'));
//canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 1;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';
 
canvas.addEventListener('mousedown', function(e) {
	if (gameTimer > 0 && resultTimer === 0) {
		if (mouse.x > 260 && mouse.y < 50) {
			ctx.beginPath();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawQuestion();
		} else {
			ctx.beginPath();
			canvas.addEventListener('mousemove', onPaint, false);
			ctx.moveTo(mouse.x, mouse.y);
			ctx.strokeStyle = '#00CC99';
		}
		if (mouse.x > 260 && mouse.y > 350) {
			gameTimer = 0;
			gameStarted = false;
			canvas.removeEventListener('mousemove', onPaint, false);
			ctx.beginPath();
		}
	} else if (gameOverTimer <= 0) {
		if (mouse.x > 40 && mouse.x < 180 && mouse.y > 270 && mouse.y < 320) {
			gameMode = PRACTICE;
			startNewGame();
		} else if (mouse.x > 220 && mouse.x < 360 && mouse.y > 270 && mouse.y < 320) {
			gameMode = GAME;
			startNewGame();
		}
	}
}, false);
 
canvas.addEventListener('mouseup', function() {
	canvas.removeEventListener('mousemove', onPaint, false);
}, false);

document.addEventListener('keydown', function() {
	document.getElementById("answer").focus();
}, false);

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};


	
//Loop over the list of images and add them to the Images Object. Wait for them all to load
function loadImages(list){
     var total = 0;
     document.querySelector("span").innerText = "Loading...";
     for(var i = 0; i < list.length; i++){
		var img = new Image();
		Images[list[i].name] = img;
		img.onload = function(){
			total++;
			if(total == list.length){
				document.querySelector("span").innerText = "";
				//startGame();
				IMAGES_LOADED = 1;
				//chosenPokemon = Math.floor(Math.random() * pokemonData.length);
				//currentPokemon = chosenPokemon;
				
			}				 
		};
		img.src = list[i].url; 
	}     
}

// add all of the images you want to use for the game to this list. name: "theNameYouReferenceTheImageWith url: "thePathToTheFile"
var images = loadImages(imageData);

function draw() {
	if(IMAGES_LOADED === 1){
		if (gameTimer > 0) {
			if (resultTimer != 0) {
				resultTimer--;
				ctx.beginPath();
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.font = "45px Arial";
				ctx.textAlign = "center";
				if (answerResult === true) {
					ctx.fillText("Correct!",200,300);
					ctx.fillStyle = '#00CC99';
					ctx.font = "15px Arial";
					ctx.textAlign = "left";
					ctx.fillText("+" + scoreIncrement,300,230 + 0.5*resultTimer);
					if (gameMode === GAME) {
						ctx.fillStyle = '#99CC00';
						ctx.fillText("+" + TIMEBONUS + " sec",300,250 + 0.5*resultTimer);
					}
					ctx.fillStyle = '#000000';
				} else {
					ctx.fillText("Wrong",200,300);
					ctx.fillStyle = '#FF0000';
					ctx.font = "15px Arial";
					ctx.textAlign = "left";
					ctx.fillText("-" + SCORELOSS,300,230 + 0.5*resultTimer);
					if (gameMode === GAME) {
						ctx.fillStyle = '#FFF000';
						ctx.fillText("-" + TIMELOSS + " sec",300,250 + 0.5*resultTimer);
					}
					ctx.fillStyle = '#000000';
				}
				if (resultTimer === 0) {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					answerResult = false;
				}
				drawQuestion();
			}
			questionTimer--;
			if (questionTimer < 100) {
				questionTimer = 100;
			}
			if (gameMode === GAME) {
				ctx.clearRect(10, 35, 85, 15);
				ctx.textAlign = "left";
				ctx.font = "15px Arial";
				ctx.fillText("Timer: " + (gameTimer/100).toFixed(2),10,50);
				gameTimer--;
			}
			if (gameTimer === 0) {
				if (highscore !== null) {
					if (score > highscore) {
						highscore = score;
						localStorage.setItem("highscore", score);      
					}
				} else {
					highscore = score;
					localStorage.setItem("highscore", score);
				}
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.textAlign = "center";
				ctx.font = "45px Arial";
				ctx.fillText("Game Over!",200,100);
				ctx.fillText("Final Score: " + score,200,150);
				ctx.font = "30px Arial";
				ctx.fillText("High Score: " + highscore,200,220);
				ctx.fillText("Click To Retry",200,300);
				gameOverTimer = 200;
			}
		} else if (gameStarted === false) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(Images["gameLogo"], 91, 100);
			ctx.font = "15px Arial";
			ctx.textAlign = "left";
			//ctx.fillText("Your Score: 0",10,30);
			//ctx.fillText("Timer: 60.00",10,50);
			ctx.textAlign = "center";
			ctx.fillText("Practice Mode",110,300);
			ctx.fillText("Game Mode",290,300);
			ctx.strokeStyle = '#000000';
			ctx.rect(40, 270, 140, 50);
			ctx.rect(220, 270, 140, 50);
			ctx.stroke();
		} else {
			gameOverTimer--;
		}
	}
}

function drawQuestion() {
	ctx.font = "45px Arial";
	if (mathSubject === ARITHMETIC) {
		if (alignment === HORIZONTAL) {
			ctx.textAlign = "center";
			if (arithmeticFunction === ADDITION) {
				ctx.fillText(number1 + " + " + number2 + " =",200,200);
			} else if (arithmeticFunction === SUBTRACTION) {
				ctx.fillText(number1 + " - " + number2 + " =",200,200);
			} else if (arithmeticFunction === MULTIPLICATION) {
				ctx.fillText(number1 + " x " + number2 + " =",200,200);
			} else if (arithmeticFunction === DIVISION) {
				ctx.fillText((number1 * number2) + " " + unescape('%F7') + " " + number2 + " =",200,200);
			}
		} else {
			ctx.textAlign = "right";
			if (arithmeticFunction === ADDITION) {
				ctx.fillText(number1,230,160);
				ctx.fillText(number2,230,200);
				ctx.fillText("+",170,200);
				ctx.fillText("____",230,200);
			} else if (arithmeticFunction === SUBTRACTION) {
				ctx.fillText(number1,230,160);
				ctx.fillText(number2,230,200);
				ctx.fillText("-",170,200);
				ctx.fillText("____",230,200);
			} else if (arithmeticFunction === MULTIPLICATION) {
				ctx.fillText(number1,230,160);
				ctx.fillText(number2,230,200);
				ctx.fillText("x",170,200);
				ctx.fillText("____",230,200);
			} else if (arithmeticFunction === DIVISION) {
				ctx.fillText(number1 * number2,230,160);
				ctx.fillText(number2,230,200);
				ctx.fillText(unescape('%F7'),170,200);
				ctx.fillText("____",230,200);
			}
		}
	} else {
		ctx.textAlign = "center";
		if (arithmeticFunction === ADDITION) {
			ctx.fillText("x + " + number1 + " = " + (number1 + number2),200,200);
		} else if (arithmeticFunction === SUBTRACTION) {
			ctx.fillText("x - " + number1 + " = " + (number2 - number1),200,200);
		} else if (arithmeticFunction === MULTIPLICATION) {
			ctx.fillText(number1 + "x = " + (number1 * number2),200,200);
		} else if (arithmeticFunction === DIVISION) {
			ctx.fillText("x " + unescape('%F7') + " " + number2 + " = " + number1,200,200);
		}
	}
	ctx.textAlign = "left";
	ctx.font = "15px Arial";
	ctx.fillText("Your Score: " + score,10,30);
	if (gameMode === GAME) {
		ctx.fillText("Timer: " + gameTimer,10,50);
	}
	ctx.textAlign = "center";
	ctx.fillText("Clear scratch pad",330,30);
	ctx.fillText("Quit",330,380);
	ctx.strokeStyle = '#000000';
	ctx.rect(260, 0, 140, 50);
	ctx.rect(260, 350, 140, 50);
	ctx.stroke();
}

function correctAnswerMade() {
	//alert("correct");
	answerResult = true;
	gameTimer += TIMEBONUS*100;
	document.getElementById("success").load();
	document.getElementById("success").play();
	//ctx.beginPath();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.removeEventListener('mousemove', onPaint, false);
	if (mathSubject === ARITHMETIC) {
		if (alignment === HORIZONTAL) {
			alignment = VERTICAL;
		} else {
			alignment = HORIZONTAL;
		}
	}
	correctAnswers++;
	if (correctAnswers%3 === 0) {
		mathSubject = ALGEBRA;
	} else {
		mathSubject = ARITHMETIC;
	}
	arithmeticFunction = Math.floor(Math.random() * 4);
	if (correctAnswers < 10) { //level 1 difficulty
		number1 = Math.floor(Math.random() * 10);
		number2 = Math.floor(Math.random() * 10);
		score += questionTimer;
		scoreIncrement = questionTimer;
	} else if (correctAnswers < 20) { //level 2 difficulty
		number1 = Math.floor(Math.random() * 100);
		number2 = Math.floor(Math.random() * 10);
		score += 2*questionTimer;
		scoreIncrement = 2*questionTimer;
	} else if (correctAnswers < 30) { //level 3 difficulty
		if (arithmeticFunction === ADDITION || arithmeticFunction === SUBTRACTION) {
			number1 = Math.floor(Math.random() * 100);
			number2 = Math.floor(Math.random() * 100);
		} else {
			number1 = Math.floor(Math.random() * 100);
			number2 = Math.floor(Math.random() * 10);
		}
		score += 3*questionTimer;
		scoreIncrement = 3*questionTimer;
	} else {
		number1 = Math.floor(Math.random() * 100);
		number2 = Math.floor(Math.random() * 100);
		score += 4*questionTimer;
		scoreIncrement = 4*questionTimer;
	}
	questionTimer = 1000;
	if (arithmeticFunction === DIVISION && number2 === 0) {
		number2++;
	}
	if (arithmeticFunction === MULTIPLICATION && number1 === 0 && mathSubject === ALGEBRA) {
		number1++;
	}
	drawQuestion();
}
function wrongAnswerMade() {
	document.getElementById("fail").load();
	document.getElementById("fail").play();
	score -= SCORELOSS;
	gameTimer -= TIMELOSS*100;
	if (score < 0) {
		score = 0;
	}
	if (gameTimer <= 0) {
		gameTimer = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.textAlign = "center";
		ctx.font = "45px Arial";
		ctx.fillText("Game Over!",200,100);
		ctx.fillText("Final Score: " + score,200,150);
		ctx.font = "30px Arial";
		ctx.fillText("Click To Retry",200,250);
		gameOverTimer = 200;
		resultTimer = 0;
	}
}
function startNewGame() {
	gameStarted = true;
	gameTimer = 6000;
	score = 0;
	resultTimer = 0;
	ctx.beginPath();
	correctAnswers = 0;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	number1 = Math.floor(Math.random() * 10);
	number2 = Math.floor(Math.random() * 9) + 1;
	drawQuestion();
	
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
	if (gameTimer > 0) {
		resultTimer = 0;
		answerResult = false
		var guess = document.getElementById("answer").value;
		guess = guess.toLowerCase("answer");
		guess = guess.trim(guess);
		//var fail = document.getElementById("fail");
		if (mathSubject === ARITHMETIC) {
			if (arithmeticFunction === ADDITION) {
				if(parseInt(guess)===number1 + number2) {
					correctAnswerMade();
				} else {
					wrongAnswerMade();
				}
			} else if (arithmeticFunction === SUBTRACTION) {
				if(parseInt(guess)===number1 - number2) {
					correctAnswerMade();
				} else {
					wrongAnswerMade();
				}
			} else if (arithmeticFunction === MULTIPLICATION) {
				if(parseInt(guess)===number1 * number2) {
					correctAnswerMade();
				} else {
					wrongAnswerMade();
				}
			} else if (arithmeticFunction === DIVISION) {
				if(parseInt(guess)===number1) {
					correctAnswerMade();
				} else {
					wrongAnswerMade();
				}
			}
		} else {
			if (arithmeticFunction === DIVISION) {
				if(parseInt(guess)===number1 * number2) {
					correctAnswerMade();
				} else {
					wrongAnswerMade();
				}
			} else {
				if(parseInt(guess)===number2) {
					correctAnswerMade();
				} else {
					wrongAnswerMade();
				}
			}
		}
		document.getElementById("answer").value = "";
		resultTimer = 100;
	} else if (gameOverTimer <= 0 && gameStarted === true) {
		document.getElementById("answer").value = "";
		startNewGame();
	}
});

document.getElementById("answer")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("guessButton").click();
    }
});