import App from './game/App.js';
import { Loader, utils } from 'pixi.js';
import * as WebFont from 'webfontloader';
const loader = Loader.shared;

const manifest = {
	bark: './asset/img/bark.png',
	brick: './asset/img/brick.png',
	concrete: './asset/img/concrete.png',
	lava: './asset/img/lava.png',
	marble: './asset/img/marble.png',
	metal: './asset/img/metal.png',
	rock: './asset/img/rock.png',
	sandstone: './asset/img/sandstone.png'
};

const preload = () => {
	for (const [key, value] of Object.entries(manifest)) {
		loader.add(key, value);
	}
};

const load = () => {
	loader.load(() => {
		WebFont.load({
			google: {
				families: [
					'Press Start 2P'
				]
			},
			active: e => {
				utils.skipHello();
				const app = new App();
			}
		})
	})
};

preload();
load();