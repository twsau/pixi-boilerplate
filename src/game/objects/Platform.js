import { Loader, TilingSprite } from 'pixi.js';
import { OutlineFilter } from 'pixi-filters';
import { Bodies, Body } from 'matter-js';
const loader = Loader.shared;

// default kwargs
let isStatic = true;
let texture = 'sandstone';

export default class Platform {
	constructor(x, y, w, h, kwargs) {
		if (kwargs) {
			isStatic = kwargs.isStatic ? kwargs.isStatic : true;
			texture = kwargs.texture ? kwargs.texture : 'sandstone';
		}
		Object.assign(this, Bodies.rectangle(x, y, w, h, {
			isStatic: isStatic,
			label: `platform ${texture}`
		}));
		this.sprite = new TilingSprite(loader.resources[texture].texture, w, h);
		this.sprite.anchor.set(0.5);
		this.sprite.position.set(this.position.x, this.position.y);
		this.sprite.filters = [ new OutlineFilter() ];
		this.sprite.zIndex = 2;
	}
	update() {

	}
}