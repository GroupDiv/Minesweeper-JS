class Board {
	constructor(height, width, mineCount) {
		this.board = [];
		this.mineCollection = [];
		this.height = height;
		this.width = width;
		this.mineCount = mineCount;
	}

	initBoard() {
		for (let i = 0; i < this.width; i++) {
			for (let j = 0; j < this.height; j++) {
				this.board[i][j] = Tile(false, false, false);

			}
		}
	}

	initMines(mineCount) {
		if (mineCount != 0) {
			let randWidth = Math.floor(Math.random() * this.width);
			let randHeight = Math.floor(Math.random() * this.height);
			if (!this.board[randWidth][randHeight] == isMine) {
				this.board[randWidth][randHeight] = isMine;
				mineCount--;
			}
			this.initMines(mineCount);
		}
	}
}

let heightInput = prompt("Please enter a height");
let widthInput = prompt("Please enter a width");
let mineInput = prompt("Please enter a number of mines");

let gameboard;

if (heightInput > 1 && widthInput > 1) {
	if (mineInput < heightInput * widthInput && mineInput > 0) {
		gameboard = new Board("", heightInput, widthInput, mineInput);
	} else {
		alert("The number of mines is incorrect.");
		RestartGame();
	}
} else {
	alert("Please enter a proper height and width (greater than 2x2).");
	RestartGame();
}

console.table(gameboard.mineCollection);
console.log(gameboard.mineCollection)

class UI {
	constructor() {
		this.revealed = [];
		this.mineCountArr = [];
		this.init();
	}

	init() {
		for (let i = 0; i < gameBoard.widthInput; i++) {
			this.revealed[i] = [];
			this.mineCountArr[i] = [];
			for (let j = 0; j < gameboard.heightInput; j++) {
				this.revealed[i][j] = false;
				this.mineCountArr[i][j] = gameboard.mineCollection[i][j];
			}
		}
	}

	clickReveal(x, y) {
		let tileCount = "";
		this.revealed[x][y] = true;
		gfx.context.strokeStyle = 'rgba(0,0,255,0.6)';
		gfx.context.shadowColor = 'rgba(0,0,255,0.6)';
		if (this.mineCountArr[x][y] == false) {
			gfx.component(x * 50, y * 50);
			this.mineCountArr[x][y] = this.mineCountArr[x][y] + 10;
			for (let i = x - 1; i <= x + 1; i++) {
				for (let j = y - 1; j <= y + 1; j++) {
					if (i >= 0 && i < gameBoard.widthInput && j >= 0 && j < gameBoard.heightInput) {
						this.clickReveal(i, j);
					}
				}
			}
		} else if (this.mineCountArr[x][y] <= 8) {
			tileCount = "" + this.mineCountArr[x][y];
			gfx.component(x * 50, y * 50, tileCount);
			this.mineCountArr[x][y] = this.mineCountArr[x][y] + 10;
		}
	}

	hasWon() {
		let end = false;
		let minesFlagged = 0;

		for (let i = 0; i < gameBoard.widthInput; i++) {
			for (let j = 0; j < gameboard.heightInput; j++) {
				if (this.mineCountArr[i][j] == 29) {
					minesFlagged++;
				}
				if (this.mineCountArr[i][j] >= 20 && this.mineCountArr[i][j] < 29) {
					return end;
				}
			}
		}
		if (minesFlagged == gameboard.mineCount) {
			end = true;
			return end;
		}
	}
}

/**  
 * @classdesc The game graphics are handled by the Grphics class, how the numbers are going to populate on the HTML/User side visual and inputs. 
 */
class Graphics {
	/**  
	 * The default constructor takes no parameters and makes a Canvas (A game area) on the HTML to be populated.
	 */
	constructor() {
		this.comp = [];
		this.canvas = document.createElement("canvas");
		this.canvas.width = gameBoard.width * 50;
		this.canvas.height = gameBoard.height * 50;
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
	component(x, y, t = "") {
		this.width = 50;
		this.height = 50;
		this.x = x;
		this.y = y;
		this.context.strokeRect(this.x, this.y, this.width, this.height);
		this.context.fillText(t, x + 25, y + 25);
	}

	/**  
	 * This method makes all the components at the time when the game starts i.e. the game is initialized.
	 */
	draw() {
		this.context.strokeStyle = 'rgba(0,0,0,0.2)';
		this.context.shadowColor = 'rgba(0,0,0,0.2)';
		for (let i = 0; i < gameBoard.width; i++) {
			this.comp[i] = [];
			for (let j = 0; j < gameBoard.height; j++) {
				this.comp[i][j] = this.component(i * 50, j * 50);
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

gfx.canvas.addEventListener('click', clickHandler);
gfx.canvas.addEventListener('contextmenu', clickHandler);

/**  
	 * This is the only global function, this is a clickHandler, this handles the clicks on the canvas and detects which component was clicked and updates it.
	 @param {Event} e - This is the click event given by the addEventListener function.
*/
function clickHandler(e) {
	/**  
	 * This prevents the default context menu on right click.
	 */
	e.preventDefault();
	let tc = "";
	let clickX = e.pageX - gfx.canvas.offsetLeft;
	let clickY = e.pageY - gfx.canvas.offsetTop;
	let x = Math.floor(clickX / 50);
	let y = Math.floor(clickY / 50);
	let rightClick = false;
	if (e.which) {
		rightClick = (e.which === 3);
	}
	if (!ui.revealed[x][y])
		if (!rightClick) {
			ui.revealed[x][y] = true;
			gfx.context.strokeStyle = 'rgba(0,0,255,0.6)';
			gfx.context.shadowColor = 'rgba(0,0,255,0.6)';
			if ((ui.n_array[x][y] > 0) && (ui.n_array[x][y] < 9)) {
				tc = "" + ui.n_array[x][y];
				gfx.component(x * 50, y * 50, tc);
				ui.n_array[x][y] = ui.n_array[x][y] + 10;
			}
			if (ui.n_array[x][y] == 0) {
				ui.clickCheck(x, y);
			}
			if (ui.n_array[x][y] == 9) {
				alert("Game Over!");
			}
		}
	else {
		tc = "F";
		if (ui.n_array[x][y] < 20) {
			ui.n_array[x][y] += 20;
			gfx.context.strokeStyle = 'rgba(255,0,0,0.6)';
			gfx.context.shadowColor = 'rgba(255,0,0,0.6)';
			gfx.nflags--;
			gfx.component(x * 50, y * 50, tc);
		} else {
			ui.n_array[x][y] -= 20;
			gfx.nflags++;
			gfx.context.clearRect(x * 50, y * 50, 50, 50);
			gfx.context.strokeStyle = 'rgba(0,0,0,0.2)';
			gfx.context.shadowColor = 'rgba(0,0,0,0.2)';
			gfx.component(x * 50, y * 50);
			// clean the spot
		}
		document.getElementById("flags").innerHTML = "Flags: " + gfx.nflags;
	}
	if (ui.checkComplete()) {
		alert("You won!");
	}

}

function RestartGame() {
	history.go(0);
}