import { Loader, Sprite, TilingSprite } from 'pixi.js';
const loader = Loader.shared;

const MapSprite = {
	init: {
		sprite: (sprite, x, y) => {
			sprite.anchor.set(0.5);
			sprite.position.set(x, y);
		}
	},
	Wall: {
		sandstone: (x, y, w, h, a) => {
			let wall = new TilingSprite(loader.resources['wall_sandstone'].texture, w, h);
			if (a) {
				wall.angle = a;
			}
			MapSprite.init.sprite(wall, x, y);
			return wall;
		}
	}
}

export default MapSprite;