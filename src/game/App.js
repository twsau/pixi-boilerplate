import { Application } from 'pixi.js';
import { Engine, World } from 'matter-js';
import Camera from './Camera.js';
import './App.css';

const config = {
	antialias: true,
	height: 540,
	width: 990,
	view: document.querySelector('canvas')
}

export default class App extends Application {
	constructor() {
		super(config);
		Object.assign(this, {
			camera: new Camera(this.screen),
			engine: Engine.create()
		});
		this.stage.addChild(this.camera);
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {

	}
}