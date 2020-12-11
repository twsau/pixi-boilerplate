import { Loader, TilingSprite } from 'pixi.js';
const loader = Loader.shared;

let texture = 'sandstone';

export default class Wall {
	constructor(x, y, w, h, kwargs) {
		if (kwargs) {
			texture = kwargs.texture ? kwargs.texture : 'sandstone';
		}
		this.sprite = new TilingSprite(loader.resources[texture].texture, w, h);
		this.sprite.anchor.set(0.5);
		this.sprite.tint = 0.4 * 0xffffff;
		this.sprite.position.set(x, y);
		this.sprite.zIndex = 1;
	}
}