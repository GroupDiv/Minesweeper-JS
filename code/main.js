//minesweeper.js
let gameBoard;
function main()
{
	let h = prompt("Enter height");
	let w = prompt("Enter width");
	let nm = prompt("Enter number of mines");
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
}
//var wilhelm_scream;
//wilhelm_scream = new sound("wilhelm.mp3");


/**  
	* Making an object of UI class named ui.
*/
let ui = new UI(gameBoard);
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
			ui.clickCheck(x,y, gameBoard, gfx);
		}
		if(ui.n_array[x][y]==9){
			//wilhelm_scream.play();
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
	if (ui.checkComplete(gameBoard)){
		alert("You won!");
	}

}

function RestartGame(){
	history.go(0);
}