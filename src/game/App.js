import { Application, Graphics } from 'pixi.js';
import { Engine, Events, use, World } from 'matter-js';
import 'matter-attractors';
use('matter-attractors');
import Platform from './objects/Platform.js';
import Cannonball from './objects/Cannonball.js';
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


		// background
		Scene.add(this, new Wall(this.screen.width / 2, this.screen.height / 2, this.screen.width, this.screen.height, {
			texture: 'concrete'
		}));

		// floor
		Scene.add(this, new Platform(this.screen.width / 2, this.screen.height - 10, this.screen.width, 20, {
			texture: 'concrete'
		}));

		// structure
		Scene.add(this, new Platform(this.screen.width / 2, this.screen.height - 40, 20, 100, {
			texture: 'bark'
		}));
		Scene.add(this, new Platform(this.screen.width / 2 - 25, this.screen.height - 110, 200, 10, {
			angle: -10,
			isStatic: false,
			texture: 'bark'
		}));
		Scene.add(this, new Platform(this.screen.width / 2 - 30, this.screen.height -130, 20, 20, {
			angle: -10,
			isStatic: false,
			texture: 'marble'
		}));

		// cannonball
		Scene.add(this, new Cannonball(this.screen.width / 2, 100, {
			force: {
				x: 0.01,
				y: -0.07
			}
		}));

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