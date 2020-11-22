import { Application, Graphics } from 'pixi.js';
import { Engine, World } from 'matter-js';
import Camera from './Camera.js';
import Map from './Map/Map.js';
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
			ctx: new Graphics(),
			engine: Engine.create()
		});
		this.loadMapAsset('example');
		this.camera.addChild(this.ctx);
		this.stage.addChild(this.camera);
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {
		this.camera.update();
	}
	loadMapAsset(title) {
		if (title in Map) {
			let map = Map[title]();
			for (const [key, value] of Object.entries(map)) {
				this.camera.addChild(value);
				if (value.body) {
					World.add(this.engine.world, value.body);
				}
			}
		} else {
			console.log(`error: asset "${title}" does not exist`);
		}
	}
	drawWireFrames() {
		this.stage.visible = false;
		this.ctx.clear();
		for (const [key, value] of Object.entries(this.engine.world.bodies)) {
			this.ctx.lineStyle(1, 0x00ffff);
			for (let i = 0; i < value.vertices.length; i++) {
				if (i == 0) {
					this.ctx.moveTo(value.vertices[i].x, value.vertices[i].y);
				} else {
					this.ctx.lineTo(value.vertices[i].x, value.vertices[i].y);
				}
			}
			this.ctx.closePath();
		}
	}
}