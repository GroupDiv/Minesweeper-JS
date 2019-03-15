function cheatGen(board, cheatContext) {
    /*
        Fills a graphics context which displays solution to the board.  It is meant to have its display toggled on and off
        with the "Cheat Mode" button.

        @pre A gameboard object and a correctly sized cheatContext graphical context have been egenerated
        @param
        @post
        @return None
    */
    let components = [];  // an empty, eventually 2d, array to add visual components too
    cheatContext.strokeStyle = 'rgba(0,0,0,0.2)';
    cheatContext.shadowColor = 'rgba(0,0,0,0.2)';
    for(let i =0; i< board.width; i++){
        components[i] = [];
        for(let j =0; j< board.height;j++){
            let mineCount = board.nmines_array[i][j];
            components[i][j] = componentGen(i*50,j*50,cheatContext, mineCount);
        }
    }
}

function componentGen(x,y,cheatContext, mineCount){
    let width = 50;
    let height = 50;
    cheatContext.strokeRect(x, y, width, height);
    cheatContext.fillText(countCorrect(mineCount) ,x+25,y+25);
}

function countCorrect(mineCount){
    if (mineCount == 9) {
        return ("M");
    }
    else {
        return mineCount;
    }
}