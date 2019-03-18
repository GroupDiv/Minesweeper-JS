//minesweeper.js
let wilhelm_scream;
wilhelm_scream = new sound("wilhelm.mp3");

let magic_wand;
magic_wand = new sound("magicWand.mp3");


function main()
{
	let h = 0;
	let w = 0;
	let nm = 0;

	let gameBoard;
	let gameMode = prompt("Would you like to play Devil Mode? The board will be a size of 6x6 with 6 mines, and you only have 66 seconds to find them all! Find the special tile to add an additional 6 seconds to the clock! (yes/no)");
	switch(gameMode) {
		case "yes":
		h = 6;
		w = 6;
		nm = 6;
			gameBoard = new Board("", h, w, nm);
			countdownTimer(66, "timer");
			break;
		default:
			h = prompt("Enter height");
			w = prompt("Enter width");
			nm = prompt("Enter number of mines");
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
	
			break;
	}

	console.table(gameBoard.nmines_array);
	console.log(gameBoard.nmines);

	//var wilhelm_scream;
	//wilhelm_scream = new sound("wilhelm.mp3");


	/**  
		* Making an object of UI class named ui.
	*/
	let ui = new UI(gameBoard);
	/**  
		* Making an object of Graphics class named gfx.
	*/
	let gfx = new Graphics(gameBoard);
	document.getElementById("flags").innerHTML = "Flags: " + gfx.nflags;

	gfx.canvas.addEventListener('click',clickHandler);
	gfx.canvas.addEventListener('contextmenu',clickHandler);


// This isn't ideal, but cheat mode cannot be in its own file because it must interact
// with objects in main from the document level.  As such, I am putting it here, after
// everything has been instantiated and rendered.

let cheatToggle = false;

let cheatCanvas = document.getElementById("cheatCanvas");
cheatCanvas.height = 50 * h;
cheatCanvas.width = 50 * w;
let cheatx = cheatCanvas.getContext("2d")
cheatCanvas.style.display = "none";

// Call to a function in cheat.js that will generate the cheating board, which will be shown/hidden upon toggle
cheatGen(gameBoard, cheatx);

let div1 = document.getElementById("div1");
let div2 = document.getElementById("div2");
div1.after(div2);

// Definition for cheat button that calls functions to enable/disable cheat mdoe
document.getElementById("cheatButton").addEventListener("click", function(){
	if (cheatToggle) {
		cheatToggle = false;
		document.getElementById("cheatButton").value = "Cheat Mode: OFF";
		console.log("Cheat Mode disabled");
		cheatCanvas.style.display = "none";
		gfx.canvas.style.display = "initial";
	}
	else {
		magic_wand.play();
		cheatToggle = true;
		document.getElementById("cheatButton").value = "Cheat Mode: ON";
		console.log("Cheat Mode enabled");
		cheatCanvas.style.display = "initial";
		gfx.canvas.style.display = "none";
	}
})


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
			ui.num_revealed ++;

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
				wilhelm_scream.play();
				alert("Game Over!");
				RestartGame();
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
		if ((ui.num_revealed + gameBoard.permaMines) == (gameBoard.height * gameBoard.width)){
			console.log("Checking if complete...");
			if (ui.checkComplete(gameBoard)){
				alert("You won!");
				RestartGame();
			}
		}
	}

	
}

function countdownTimer(seconds, elem) {
	let element = document.getElementById(elem);
	element.innerHTML = "Time Remaining: " + seconds + " seconds";

	if (seconds < 1) {
		clearTimeout(clock);
		element.innerHTML = "<h2>GAME OVER</h2>";
	}

	seconds--;
	let clock = setTimeout('countdownTimer('+seconds+', "' +elem+ '")', 1000);
}

function RestartGame(){
	history.go(0);
}
