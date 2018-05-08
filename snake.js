function Snake() {
	// (x,y) position
	this.x = 0;
	this.y = 0;

	// (x,y) direction of movement
	this.xSpeed = 0;
	this.ySpeed = 0;

	// previous position
	this.oldx=0;
	this.oldy=0;

	// checks for 5 consecutif colors
	this.consecutifNum = 0;
	this.consecutifColor = [0,0,0];

	// is an array of body
	this.tail = [];
	this.points = 0;

	// draws snake on screen
	this.show = function(){

		// head
		fill(255);
		rect(this.x, this.y, snakeSize, snakeSize);

		// tail
		for(i = 0; i < this.tail.length; i++){
			fill(255);
			rect(this.tail[i].x, this.tail[i].y, snakeSize, snakeSize);
		}

	}

	// snake sheds skin
	this.shed = function(){
       console.log("You are getting too old.. shedding skin!");
    
       var sLength = this.tail.length;

       // test case: shed 4/10 of tail
       // var deadskins = this.tail.splice(sLenth-4, 4);

       // real case: shed 25/35 of tail
       var deadskins = this.tail.splice(sLength-25,25);

       // add to deadskins
       for(i = 0; i < deadskins.length; i++){
           skins.push(new skin(deadskins[i].x,deadskins[i].y));
       }
   }

   	// update snake
	this.update = function(run){
		// active snake
		if(run){
			// short tail
			if(this.tail.length>=1){
				this.oldx=this.tail[this.tail.length-1].x;
				this.oldy=this.tail[this.tail.length-1].y;
			}

			// snake has tail
			if(this.tail.length > 0){
				// last body to position before it
				for(i = this.tail.length-1; i > 0; i--){
					this.tail[i].x = this.tail[i-1].x ;
					this.tail[i].y = this.tail[i-1].y ;
				}

			// first body at head position
			this.tail[0].x = this.x;
			this.tail[0].y = this.y;
			}

			// update head
			this.x = this.x + this.xSpeed * snakeSize;
			this.y = this.y + this.ySpeed * snakeSize;

			// test case: shed at 10 tail
			// if(this.tail.lentgh > 10){

			// real case: shed at 35 tail
			if(this.tail.length > 35){
				this.shed();
			}
		}
		// snake hits wall
		if (this.x < 0 || this.y < 0 || this.x > gameSize-snakeSize || this.y > gameSize-snakeSize){
			this.death();
		}		

		// snake hits self
		for(var i = 0; i < this.tail.length; i++){
			if (dist(this.tail[i].x, this.tail[i].y, this.x, this.y) <= 1){
				this.death();
			}
			else if (this.oldx === this.x && this.oldy === this.y) {
				this.death();
			}
		}

	}

	// change direction
	this.changeDir = function(x,y){
		this.xSpeed = x;
		this.ySpeed = y;
	}

	// snake eats
	this.eat = function(food){
		// head finds a food
		if(this.x === food.x && this.y === food.y){
			score.update();
			// grow
			this.grow();

			// update snake and tail	
			this.update();	

			// is consecutif color
			if(this.consecutifNum > 0){
				if(food.color[0] === this.consecutifColor[0] &&
					food.color[1] === this.consecutifColor[1] &&
					food.color[2] === this.consecutifColor[2]){
					console.log("more consec list" + this.consecutifNum);
					this.consecutifNum++;
				}
				else{
				this.consecutifNum = 1;
				this.consecutifColor[0] = food.color[0];
				this.consecutifColor[1] = food.color[1];
				this.consecutifColor[2] = food.color[2];
				console.log("new color on consecutif list" + this.consecutifNum);
			}
			}
			// not consecutif color
			else{
				this.consecutifNum = 1;
				this.consecutifColor[0] = food.color[0];
				this.consecutifColor[1] = food.color[1];
				this.consecutifColor[2] = food.color[2];
				console.log("new color on consecutif list" + this.consecutifNum);
			}

			// has 5 consecutif colors

			// test case: 

			if(this.consecutifNum === 2){
					console.log("has five!");
					food.hasFive();
					this.consecutifNum = 0;
					this.consecutifColor = [0,0,0];
			}

			// delete old food
			food.delete();

			// create new food
			foods.push(new Food());
		}
	}

	// snake grows
	this.grow = function(){
		this.points++;

		// add new tail block
		this.tail.push(new Body(this.oldx,this.oldy));
	}

	// snake dies
	this.death = function(){
		snake = new Snake();
		score.showResults();
		endGame = true;
		setup();s
		frameRate(10);
	}
	this.touchSkin= function(skin){
		if(this.x === skin.x && this.y === skin.y){
			this.death();
		}
	}
}