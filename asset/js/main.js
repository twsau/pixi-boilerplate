const {Application, Container, Graphics, Sprite, Text, TilingSprite} = PIXI;
const loader = PIXI.Loader.shared;

class Game {
	constructor() {
		this.app = Game.#init.app();
		$('#loading').remove();
		document.body.appendChild(this.app.view);
		this.app.ticker.add(delta => this.update(delta));
	}
	update(delta) {}
	static #init = {
		app: () => {
			PIXI.utils.skipHello();
			return new Application(CONFIG.app);
		}
	}
}

const CONFIG = {
	app: {
		antialias: false,
		height: window.innerHeight,
		transparent: false,
		width: window.innerWidth
	}
}

loader
	// .add('sprite alias', 'filepath')
	.load(function(){
		$(document).ready(function() {
			WebFont.load({
	        	google: {
	            	families: ['Press Start 2P']
	        	},
	        	active:e=>{
	            	game = new Game();
	        	}
	    	});
		});
	});