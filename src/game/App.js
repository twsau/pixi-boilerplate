import { Application, Graphics } from 'pixi.js';
import { Engine, Events, use, World } from 'matter-js';
import 'matter-attractors';
use('matter-attractors');
import Platform from './objects/Platform.js';
import Wall from './sprites/Wall.js';
import Scene from './Scene.js';
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
			engine: Engine.create(),
			objects: []
		});
		handleCollision(this);
		loadScene(this);
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {
		this.objects.forEach(object => {
			if (object.update) {
				object.update();
			}
		})
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
	Events.on(app.engine, 'collisionEnd', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
		});
	});
}

const loadScene = app => {
	const { width, height } = app.screen;
	let wall = new Wall(width / 2, height / 2, width, height, {
		texture: 'concrete'
	});
	Scene.add(app, wall);
}