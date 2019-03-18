/*
    cheat.js does not contain a class, it instead contains a function called cheatGen (and its subroutines)
    that create the canvas upon which the cheat information is displayed
*/

/**
 * Fills a graphics context which displays solution to the board.It is meant to have its display toggled on and off with the "Cheat Mode"
   button.
 * @pre A gameboard object and a correctly sized cheatContext graphical context have been generated
 * @param {*} board = the gameBoard passed from main
 * @param {*} cheatContext = the graphical context belonging to the canvas designated for cheat
 * @post cheatContext has been stylized and correctly populated with mine counts
 * @return None
 */
function cheatGen(board, cheatContext) {
    let components = [];  // an empty, eventually 2d, array to add visual components too
    cheatContext.strokeStyle = 'rgb(153, 204, 255)';
    cheatContext.shadowColor = 'rgba(0,0,0,1)';
    cheatContext.fillStyle = 'rgb(255, 92, 51)';

    for(let i =0; i< board.width; i++){
        components[i] = [];
        for(let j =0; j< board.height;j++){
            let mineCount = board.nmines_array[i][j];
            components[i][j] = componentGen(i*50,j*50,cheatContext, mineCount);
        }
    }
}

/**
    Generates the graphical component (rectangle) corresponding to the passed coordinates

    @pre cheatContext exists but does not yet have a component at requested coordinates
    @param xy = coordinates (in pixels) of requested generation
    @param cheatContext = the graphical context belonging to the canvas designated for cheat
    @param mineCount = the number of adjacent mines to the tile being generated
    @post a recangle has been added to cheatContext at the requested location
    @return None
*/
function componentGen(x,y,cheatContext, mineCount){
    let width = 50;
    let height = 50;
    cheatContext.font = "15px Georgia";
    if (mineCount == 9) {
        cheatContext.fillRect(x, y, width, height)
    }
    else {
        cheatContext.strokeRect(x, y, width, height);
        cheatContext.fillText(countCorrect(mineCount) ,x+20,y+30);
    }
}

/**
 * Fixes mineCount to prepare it the value to be printed in componentGen().  (All this does is keep cheat mode from being filled with a bunch of zeroes)
 * @pre none
 * @param mineCount = number of adjacent mines to a tile
 * @post mineCount is set to "" if a 0 was passed through
 * @return mineCout = an integer 1-8 (untouched from passed parameter) or the empty string ""
*/
function countCorrect(mineCount){
    if (mineCount == 0) {
        return ("");
    }
    else {
        return mineCount;
    }
}