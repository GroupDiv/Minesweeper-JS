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

function countCorrect(mineCount){
    if (mineCount == 0) {
        return ("");
    }
    else {
        return mineCount;
    }
}