/**
 * sound.js
 * Handles the sound functionality of the game
 * The following sound class was borrowed from https://www.w3schools.com/graphics/game_sound.asp
 */
class sound {
	/**
	 * @constructor
	 * @param {*} src 
	 */
	constructor(src) {
		this.sound = document.createElement("audio");
		this.sound.src = src;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);
		this.play = function () {
			this.sound.play();
		};
		this.stop = function () {
			this.sound.pause();
		};
	}
}

