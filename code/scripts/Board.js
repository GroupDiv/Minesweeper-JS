//gameboard.js
/**  
 * @classdesc The game board is initiallized here with the given width, height, and number of mines 
 * @constructor
 * @param {String} level - What level is the game initialized.
 * @param {Number} height - Height of the game board.
 * @param {Number} width - Width of the game board.
 * @param {Number} nmines - Number of mines the board needs to be initiallized.
 * */
class Board{
	/**  
 	* The default constructor of this lass initializes arrays, i.e. the game board needed.
	*/
	constructor (level,h,w,m){		
		this.board = [];			// Initiallizing the board array;
		this.nmines_array = [];		// Initiallizing the number of mines surrounding array.
		// Switches between the size of boards;
		switch(level){
			case "b":
					this.height(3);
					this.width(3);
					this.mines(4);
					this.initboard();
					this.initMines(this.nmines);
					this.initNmines();
					break;
			case "e":
					this.height(9);
					this.width(9);
					this.mines(10);
					this.initboard();
					this.initMines(this.nmines);
					this.initNmines();
					break;
			case "":
					this.height(h);
					this.width(w);
					this.mines(m);
					this.initboard();
					this.initMines(this.nmines);
					this.initNmines();
					break;
			default:
					this.height(5);
					this.width(5);
					this.mines(6);
					this.initboard();
					this.initMines(this.nmines);
					this.initNmines();
					break;
		}
	}
	/**  
	 * Sets the number of mines.
	 * @param {Number} n - number of mines.
	*/
	mines(n){
		this.nmines = n;
	}
	/**  
	 * Sets the height of the board.
	 * @param {Number} h - Height of the board.
	*/
	height(h){
		this.height = h;
	}
	/**  
	 * Sets the Width of the board
	 * @param {Number} w - Width of the board.
	*/
	width(w){
		this.width =w;
	}
	/**  
	 * Initiallizes the board initially with 0's that is no mines, Also initializes the number of mines surrounding array with 0 for now as well.
	*/
	initboard(){
		for (let i=0;i<this.width;i++){
			this.board[i] = [];
			this.nmines_array[i] = [];
			for (let j = 0;j<this.height;j++){
				this.board[i][j] = 0;
				this.nmines_array[i][j]=0;
			}
		}
	}
	/**  
	 * Initiallizes the board with the number of mines given, i.e. initializes with a 1 that is a bomb.
	 * @param {Number} nmines - Number of mines being initialized. 
	*/
	initMines(nmines){
		if(nmines !=0){		// Break condition, breaks when there are no remaining mines to set.
			let x = Math.floor(Math.random()*this.width); //Get a random x coordinate, multiplying width/height with a random [0,1], and then floor gives us an index in range.
			let y = Math.floor(Math.random()*this.height);
			if(!(this.board[x][y]==1)){		//Checking that we are not placing a mine where one already exists.
				this.board[x][y] = 1;
				nmines--;
			}
			this.initMines(nmines); 	// Recursive call to initiallize all the mines.
		}
	}

	/**  
	 * Initiallizes the number of mines surrounding a tile array with the countMines returns.
	*/
	initNmines(){
		for (let i = 0; i<this.width; i++){
			for (let j = 0; j<this.height;j++){
			this.nmines_array[i][j] = this.countMines(i,j);
			}
		}
	}

	/**  
	 * Counts the number of bombs adjacent to a tile, in all 8 directions.
	 * @param {Number} x - The x index.
	 * @param {Number} y - The y index.
	*/
	countMines(x,y){
	let nx,ny;
	let nmines=0;
	if(this.board[x][y]==0){
		for(let i=-1;i<=1;i++){
			for(let j=-1;j<=1;j++){
				nx = x + i;
				ny = y +j;
				if(!(i == 0 && j == 0)){
					if(nx >= 0 && nx <this.width && ny >= 0 && ny < this.height)
						if(this.board[nx][ny]==1)
						nmines++;
				}
			}
		}
	}
	if(this.board[x][y] == 1){
		return(9);
	}
	else{
		return(nmines);
	}
	}
}