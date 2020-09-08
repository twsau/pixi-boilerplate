const Application = PIXI.Application;
const loader = PIXI.Loader.shared;

class Game {
	constructor() {
		PIXI.utils.skipHello();
		this.app = new Application({antialias: true, width: 400, height: 400});
		$('#loading').remove();
		document.body.appendChild(this.app.view);
		this.app.ticker.add(delta => this.update(delta));
	}
	update() {

	}
}

loader
	// .add('sprite alias', 'filepath')
	.load(function(){$(document).ready(function() {game = new Game();});});