// eaten by snake

var resetAlert=function(){
	alertCond=false;
}
function Food(){

	// food color code
	var pink =  [249, 116, 109]; // increase speed
	var blue = [109, 224, 249]; //decrease speed
	var green = [109, 249, 133]; //make more food
	var purple = [163, 109, 249]; //shrink snake
	var yellow = [240, 249, 109]; //elongate snake

	// pick random color
	var arrColors = [pink, blue, green, purple, yellow];
	var ranCol = arrColors[Math.floor(Math.random() * arrColors.length)];

	// start at random color, random position
	this.color = ranCol;
	this.x = Math.floor(Math.random()*(gameSize/snakeSize))*snakeSize;
	this.y = Math.floor(Math.random()*(gameSize/snakeSize))*snakeSize;

	// display food
	this.show = function() {
		fill(ranCol[0], ranCol[1], ranCol[2]);
		rect(this.x, this.y, snakeSize, snakeSize);
	}

	// food is eaten
	this.delete = function(){
		for(i = 0; i < foods.length; i++){
			if(this.x === foods[i].x && this.y === foods[i].y){
				foods[i] == null; 
				for( j = i; j < foods.length-1; j++){
					foods[j] = foods[j+1];
				}
				foods.pop();
			}
		}
	}


	// eaten 5 consecutive same colored food
	this.hasFive = function(){
		switch(this.color){
			// speed up
			case pink:
				console.log('Pink Power Up: increase speed');
				var timesQuick = 0;
				alertMessage='Pink Power Up: increase speed';
				alertCond=true;
   				var quick = setInterval(function(){
      				timesQuick++;
      				if(timesQuick === 3000){
        				clearInterval(quick);
        				frameRate(10);
        				return;
      				}
      				frameRate(30);
    			},0);
				break;

			// slow down
			case blue:
				console.log('Blue Power Up: decrease speed');
				var timesSlow = 0;
				alertMessage='Blue Power Up: decrease speed';
				alertCond=true;
   				var quick = setInterval(function(){
      				timesSlow++;
      				if(timesSlow === 3000){
        				clearInterval(quick);
        				frameRate(10);
        				return;
      				}
      				frameRate(5);
    			},0);
				break;

			// more food
			case green:
				console.log('Green Power Up: Makes more food');
				for(i = 0; i < 6; i++){
					foods.push(new Food());
				}
				alertMessage='Green Power Up: Makes more food';
				alertCond=true;

				break;

			// shrink snake
			case purple:
				console.log('Purple Power Up: Shrinks snake');
				var sLength=snake.tail.length;
				if(sLength > 4){

				}
				var ratio = Math.floor(sLength * 0.7);
				snake.tail.splice(sLength-ratio, ratio);
				alertMessage='Purple Power Up: Shrinks snake';
				alertCond=true;
				break;

			// elongate snake
			case yellow:
				console.log('Yellow Power Up: Elongates snake');
				for(i = 0; i < 5; i++){
					snake.grow();

					alertMessage='Yellow Power Up: Elongates snake';
					alertCond=true;

				}
				snake.points =- 5;
				break;
		}
	}
}