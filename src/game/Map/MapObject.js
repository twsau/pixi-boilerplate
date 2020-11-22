import { Loader, Sprite, TilingSprite } from 'pixi.js';
import { Bodies, Body, Vertices } from 'matter-js';
import decomp from 'poly-decomp';
window.decomp = decomp;
const loader = Loader.shared;

const MapObject = {
	init: {
		sprite: sprite => {
			sprite.anchor.set(0.5);
			sprite.position.set(sprite.body.position.x, sprite.body.position.y);
		}
	},
	Wall: (x, y, w, h, a) => {
		const wall = new TilingSprite(loader.resources['wall_sandstone'].texture, w, h);
		wall.body = Bodies.rectangle(x, y, w, h, {
			isStatic: true
		});
		MapObject.init.sprite(wall);
		return wall;
	}
};

export default MapObject;