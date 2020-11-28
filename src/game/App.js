import { Application, Graphics } from 'pixi.js';
import { Engine, Events, use, World } from 'matter-js';
import 'matter-attractors';
use('matter-attractors');
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
			engine: Engine.create()
		});
		loadMap(this, 'example');
		handleCollision(this);
		// this.camera.addChild();
		this.stage.addChild(this.camera);
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {
		this.camera.update();
	}		
}

const loadMap = (app, title) => {
	if (title in Map) {
		let map = Map[title]();
		for (const [key, value] of Object.entries(map)) {
			app.camera.addChild(value);
			if (value.body) {
				World.add(app.engine.world, value.body);
			}
		}
	} else {
		console.log(`error: asset "${title}" does not exist`);
	}
}

const handleCollision = app => {
	Events.on(app.engine, 'collisionStart', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
		});
	});
	Events.on(app.engine, 'collisionActive', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
		});
	});
	Events.on(app.engine, 'CollisionEnd', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
		});
	});
}