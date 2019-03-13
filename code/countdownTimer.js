/* 
    Timer starts when game starts

*/

class Timer {

    constructor(seconds, elem) {
        this.seconds = seconds;
        this.elem = elem;
    }

    countDown(this) {
        var element = document.getElementById(this.elem);
        element.innerHTML = "Time remaining: " + this.seconds + " seconds";

        if (this.seconds < 1) {
            clearTimeout(clock);
            element.innerHTML = '<h2>GAME OVER</h2>';
        }
        this.seconds--;
        var clock = setTimeout('countDown('+this.seconds+',"'+this.elem+'")',1000);
        

    }

}



