//userinterface.js
/**  
 * @classdesc The game UI is handled by the UI class, how the tiles are revealed and handled.
 */
class UI{
	/**  
 	* The constructor for the UI class takes no parameters, but initializes arrays that are needed for the run.
	*/
	constructor(gameBoard){

		this.revealed = [];
		this.n_array = [];
		console.log(gameBoard.board);
		this.init(gameBoard);
		alert("UI constructed");
	}
	/**  
 	* Initializing the UI n_array with values from the Board class nmines_array and revealed state of a tile to false.
	*/
	init(gameBoard){
		for(let i=0;i<gameBoard.width;i++){
			this.revealed [i] = [];
			this.n_array [i] = [];
			for(let j =0; j<gameBoard.height; j++){
				this.revealed[i][j]=false;
				this.n_array[i][j] = gameBoard.nmines_array[i][j];
			}
		}
	}
	/**  
 	* Checks for click and on click if the tile was a lonely tile, i.e. surrounded by no mines this function expands that tile in all 8 directions. 
	* @param {Number} x - The x coordinate of the tile clicked.
	* @param {Number} y - The y coordinate of the tile clicked.
	 */
	clickCheck(x,y, gameBoard, gfx){
		let tc = "";
		this.revealed[x][y] = true;
		gfx.context.strokeStyle = 'rgba(0,0,255,0.6)';
		gfx.context.shadowColor = 'rgba(0,0,255,0.6)';
		if(this.n_array[x][y]==0){
			//tc =  "" + this.n_array[x][y];
			gfx.component(x*50,y*50);
			this.n_array[x][y] = this.n_array[x][y]+10;
			for (let i =x-1; i <= x+1; i++){
				for (let j = y-1; j <= y+1; j++){
					if (i>=0&&i<gameBoard.width&&j>=0&&j<gameBoard.height){	
						//if(!(i==0 && j ==0))			
							this.clickCheck(i,j);
					}
				}
			}
		}
		else if(this.n_array[x][y]<=8){
			tc =  "" + this.n_array[x][y];
			gfx.component(x*50,y*50,tc);
			this.n_array[x][y] = this.n_array[x][y]+10;
		}
	}
	
	/**  
 	* Checks if the baord is completed with all the flags correctly placed, if not user cant win.
	*/
	checkComplete(gameBoard){
		let over = false;
		let n_mine_flag = 0;
		for (let i = 0; i < gameBoard.width; i++){
			for (let j = 0; j < gameBoard.height; j++){
				if (this.n_array[i][j] == 29){
					n_mine_flag++;
				}
				if (this.n_array[i][j] >= 20 && this.n_array[i][j] < 29){
					return over;
				}
			}
		}
		if (n_mine_flag == gameBoard.nmines)
		{
			over = true;
			return over;
		}
	}
}