//Tile.js
class Tile {

    constructor(numAdjacentMines, isRevealed, isFlag, isMine) {
      this.numAdjacentMines = numAdjacentMines;
      this.isRevealed = isRevealed;
      this.isFlag = isFlag;
      this.isMine = isMine;
    }

    //Displays the number of mines surrounding a revealed tile (if any exist)
    //@pre Expects a call from a user right-click
    //@param None
    //@post Revealed tiles will now display number of adjacent mines
    //@return None
    tileReveal() {
        this.isRevealed = True
    }

    //   Adds or removes flag image on tile
    //   @pre Expects a call from a user left-click
    //   @param None
    //   @post Flag is displayed or removed from tile
    //   @return Returns an integer that will add or subtract from the flag count that is being compared to the mine count
    tileFlag()
    {
        if (!this.isRevealed)
        {
            if (!this.isFlag)
            {
                this.is_flag = True
            }
            else if (this.isFlag)
            {
                this.isFlag = False
            }
        }
    }
}