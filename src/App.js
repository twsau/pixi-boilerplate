import { Application, Sprite, utils } from 'pixi.js';
import { Bodies, Engine } from 'matter-js';
import Camera from './Camera.js';
import './App.css';

const manifest = {

};

export default class App extends Application {

	constructor() {
		utils.skipHello();
		super({
			antialias: true,
			width: 990,
			height: 540,
			view: document.querySelector('canvas')
		});
		Object.assign(this, {
			camera: new Camera(this.screen),
			engine: Engine.create()
		});
		this.preload();
	}

	preload() {
		for (const [key, value] of Object.entries(manifest)) {
			this.loader.add(key, value);
		}
		this.loader.load(() => {
			this.setup();
		});
	}

	setup() {
		//this.camera.addChild();
		this.stage.addChild(this.camera);
		this.launch();
	}
	
	launch() {
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}

	update(delta) {
		
	}

}

const app = new App();