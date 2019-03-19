//graphics.js
/**  
 * @classdesc The game graphics are handled by the Grphics class, how the numbers are going to populate on the HTML/User side visual and inputs. 
*/
class Graphics{
	/**  
	 * The default constructor takes no parameters and makes a Canvas (A game area) on the HTML to be populated.
	*/
	constructor(gameBoard){
		this.comp = [];
		this.canvas = document.createElement("canvas");
		this.canvas.width = gameBoard.width*50;
		this.canvas.height = gameBoard.height*50;
		//this.canvas.style = "border: 1px solid #d3d3d3";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.nflags = gameBoard.nmines;
		this.draw(gameBoard);	
		
		this.flagImg = new Image();
		this.flagImg.src="flag.png";
		}
	/**  
	 * Makes the specific components in the Canvas, i.e. the tiles for the game.
	 * @param {Number} x - The x coordinate of the component to be made.
	 * @param {Number} y - The y coordinate of the component to be made.
	*/
	component(x,y,t=""){


		this.width = 50;
		this.height = 50;
		this.x = x;
		this.y =y;
		this.context.font = "15px Georgia";
		this.context.strokeRect(this.x, this.y, this.width, this.height);
		if (t == "F"){
			this.context.drawImage(this.flagImg,x,y,50,50);
			}
		else{
		this.context.fillText(t,x+20,y+30);
		}
	}

	/**  
 	* This method makes all the components at the time when the game starts i.e. the game is initialized.
	*/
	draw(gameBoard){
		this.context.strokeStyle = 'rgba(0,0,0,0.2)';
		this.context.shadowColor = 'rgba(0,0,0,0.2)';
		for(let i =0; i<gameBoard.width;i++){
			this.comp[i] = [];
			for(let j =0; j<gameBoard.height;j++){
				this.comp[i][j] = this.component(i*50,j*50);
			}
		}
	}
}