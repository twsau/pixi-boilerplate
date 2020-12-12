import { Loader, TilingSprite } from 'pixi.js';
import { Bodies, Body } from 'matter-js';
const loader = Loader.shared;

// default kwargs
let angle = 0;
let isStatic = true;
let texture = 'sandstone';

export default class Platform {
	constructor(x, y, w, h, kwargs) {
		if (kwargs) {
			angle = kwargs.angle ? kwargs.angle : 0;
			isStatic = typeof kwargs.isStatic !== 'undefined' ? kwargs.isStatic : true;
			texture = kwargs.texture ? kwargs.texture : 'sandstone';
		}
		Object.assign(this, {
			body: Bodies.rectangle(x, y, w, h, {
				isStatic: isStatic,
				label: `platform ${texture}`
			}),
			sprite: new TilingSprite(loader.resources[texture].texture, w, h)
		})
		Body.rotate(this.body, angle * Math.PI / 180);
		this.sprite.anchor.set(0.5);
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.zIndex = 2;
	}
	update() {
		this.sprite.position.set(this.body.position.x, this.body.position.y);
		this.sprite.rotation = this.body.angle;
	}
}