import * as PIXI from 'pixi.js';
import * as MATTER from 'matter-js';
import Camera from './Camera.js';
import './App.css';

const { Application } = PIXI;
const { Engine } = MATTER;

export default class App extends Application {

	constructor() {
		super({
			antialias: true,
			width: 990,
			height: 540
		});
		Object.assign(this, {
			camera: new Camera(this.screen),
			engine: Engine.create()
		});
		document.body.appendChild(this.view);
		document.querySelector('#loading').remove();
		this.stage.addChild(this.camera);
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}

	update(delta) {
		
	}

}