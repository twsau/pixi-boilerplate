const {Application, Text} = PIXI;
const loader = PIXI.Loader.shared;

class Game {
	constructor() {
		PIXI.utils.skipHello();
		this.app = new Application(CONFIG.app);
		$('#loading').remove();
		document.body.appendChild(this.app.view);
		this.app.ticker.add(delta => this.update(delta));
	}
	update(delta) {

	}
}

const CONFIG = {
	app: {
		antialias: true,
		backgroundColor: 0x161925,
		height: 768,
		transparent: false,
		width: 1366
	}
}

loader
	// .add('sprite alias', 'filepath')
	.load(function(){$(document).ready(function() {WebFont.load({google: {families: ['Press Start 2P']},active:e=>{game = new Game();}});});});