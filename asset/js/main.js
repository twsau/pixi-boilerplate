const Application = PIXI.Application;
const loader = PIXI.Loader.shared;

let app;
let camera;

loader
	// .add('sprite alias', 'filepath')
	.load(function(){$(document).ready(setup)});

function setup() {
	PIXI.utils.skipHello();
	app = new Application({antialias: true, width: window.innerWidth, height: window.innerHeight});
	$('#loading').remove();
	document.body.appendChild(app.view);
	app.ticker.add(delta => update(delta));
}

function update(delta) {

}