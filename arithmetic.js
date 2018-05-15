var canvas = document.getElementById("myCanvas");
//canvas.width = 300;
//canvas.height = 300;
var ctx = document.querySelector("canvas").getContext("2d");
var IMAGES_LOADED = 1;
var ADDITION = 0;
var SUBTRACTION = 1;
var MULTIPLICATION = 2;
var DIVISION = 3;
var number1 = Math.floor(Math.random() * 10);
var number2 = Math.floor(Math.random() * 10);
var arithmeticFunction = ADDITION;

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(IMAGES_LOADED === 1){
		ctx.font = "15px Arial";
		if (arithmeticFunction === 0) {
			ctx.fillText(number1 + " + " + number2 + "=",10,30);
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
	if(parseInt(guess)===number1 + number2) {
		//var cry = pokemonData[chosenPokemon].cry;
		//cry.load();
		//cry.play(); 
		alert("correct");
	} else {
		alert("flail");
	}
	  
});

document.getElementById("answer")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("guessButton").click();
    }
});