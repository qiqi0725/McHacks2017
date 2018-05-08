//empty array to keep the location of all skins(immoveable)
var skins=[];

//shedfunction


function skin(posX,posY){
	this.position=createVector(posX,posY);
	this.x=posX;
	this.y=posY;
	this.type="skin";
	//don't forget to skin.mult(snakeSize)!!!! when printing out to the website

	this.show = function() {
		fill(88, 91, 87);
		rect(this.x, this.y, snakeSize, snakeSize);
	}
}