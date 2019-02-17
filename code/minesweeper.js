
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

let h = prompt("Enter height");
let w = prompt("Enter width");
let nm = prompt("Enter number of mines");
let gameBoard;
if(h>1 && w>1){
if(nm<h*w && nm>0){
/**  
 * Initializing the gameBoard the object of Board class.
*/
gameBoard = new Board("",h,w,nm);
}
else{
	if(nm>=h*w)
	alert("Too many mines. Ouch!");
	else
	alert("Number of mines cant be zero!");
	RestartGame();
}
}
else{
	alert("Height or Width cant be less than 2");
	RestartGame();
}

console.table(gameBoard.nmines_array);
console.log(gameBoard.nmines);


/**  
 * @classdesc The game UI is handled by the UI class, how the tiles are revealed and handled.
 */
class UI{
	/**  
 	* The constructor for the UI class takes no parameters, but initializes arrays that are needed for the run.
	*/
	constructor(){
		this.revealed = [];
		this.n_array = [];
		this.init();
	}
	/**  
 	* Initializing the UI n_array with values from the Board class nmines_array and revealed state of a tile to false.
	*/
	init(){
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
	clickCheck(x,y){
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
	checkComplete(){
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

/**  
 * @classdesc The game graphics are handled by the Grphics class, how the numbers are going to populate on the HTML/User side visual and inputs. 
*/
class Graphics{
	/**  
	 * The default constructor takes no parameters and makes a Canvas (A game area) on the HTML to be populated.
	*/
	constructor(){
		this.comp = [];
		this.canvas = document.createElement("canvas");
		this.canvas.width = gameBoard.width*50;
		this.canvas.height = gameBoard.height*50;
		//this.canvas.style = "border: 1px solid #d3d3d3";
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.nflags = gameBoard.nmines;
		this.draw();		
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
		this.context.strokeRect(this.x, this.y, this.width, this.height);
		this.context.fillText(t,x+25,y+25);
	}

	/**  
 	* This method makes all the components at the time when the game starts i.e. the game is initialized.
	*/
	draw(){
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

/**  
 	* Making an object of UI class named ui.
*/
let ui = new UI();
/**  
 	* Making an object of Graphics class named gfx.
*/
let gfx = new Graphics();
document.getElementById("flags").innerHTML = "Flags: " + gfx.nflags;

gfx.canvas.addEventListener('click',clickHandler);
gfx.canvas.addEventListener('contextmenu',clickHandler);

/**  
	 * This is the only global function, this is a clickHandler, this handles the clicks on the canvas and detects which component was clicked and updates it.
	 @param {Event} e - This is the click event given by the addEventListener function.
*/
function clickHandler(e){
	/**  
 	* This prevents the default context menu on right click.
	*/
	e.preventDefault();
	let tc ="";
	let clickX = e.pageX - gfx.canvas.offsetLeft;
	let clickY = e.pageY - gfx.canvas.offsetTop;
	let x = Math.floor(clickX/50);
	let y = Math.floor(clickY/50);
	let rightClick = false;
	if(e.which){
		rightClick = (e.which === 3);
	}
	if(!ui.revealed[x][y])
	if(!rightClick){
		ui.revealed[x][y] = true;
		gfx.context.strokeStyle = 'rgba(0,0,255,0.6)';
		gfx.context.shadowColor = 'rgba(0,0,255,0.6)';
		if((ui.n_array[x][y]>0)&&(ui.n_array[x][y]<9)){
			tc =  "" + ui.n_array[x][y];
			gfx.component(x*50,y*50,tc);
			ui.n_array[x][y] = ui.n_array[x][y]+10;
		}
		if(ui.n_array[x][y]==0){
			ui.clickCheck(x,y);
		}
		if(ui.n_array[x][y]==9){
			alert("Game Over!");
		}
	}
	else{
		tc = "F";
		if(ui.n_array[x][y]<20)
		{
			ui.n_array[x][y] += 20;
			gfx.context.strokeStyle = 'rgba(255,0,0,0.6)';
			gfx.context.shadowColor = 'rgba(255,0,0,0.6)';
			gfx.nflags--;
			gfx.component(x*50,y*50,tc);
		}
		else{
			ui.n_array[x][y] -= 20;
			gfx.nflags++;
			gfx.context.clearRect(x*50,y*50,50,50);
			gfx.context.strokeStyle = 'rgba(0,0,0,0.2)';
			gfx.context.shadowColor = 'rgba(0,0,0,0.2)';
			gfx.component(x*50,y*50);
			// clean the spot
		}
		document.getElementById("flags").innerHTML = "Flags: " + gfx.nflags;
	}
	if (ui.checkComplete()){
		alert("You won!");
	}

}
function RestartGame(){
	history.go(0);
}