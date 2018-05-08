function Score(){
	this.score = 0;

	// update score
	this.update = function(){
		this.score = this.score + 1;
	}

	// get score
	this.getScore = function(){
		return this.score;
	}
	
	// display scores
	this.showResults = function(){
		var highscore = parseInt(localStorage.getItem("highscore")) || 0;
		var newHighscore = false;
		
		// new high score	
		if (this.score > highscore){
			localStorage.setItem("highscore", this.score);
			newHighscore = true;
		}

		// display messages
		if (newHighscore){
			scoreMessage = "  Congratulations! \nNew High score: " + parseInt(localStorage.getItem("highscore"));
		}else{
			scoreMessage = "Your score: " + this.score + "\nHigh score: " + parseInt(localStorage.getItem("highscore"));
		}
	}
}