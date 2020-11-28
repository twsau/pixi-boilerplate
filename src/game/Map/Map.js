import MapObject from './MapObject.js';
import MapSprite from './MapSprite.js';

const Map = {
	example: () => {
		return {
			wall_0: MapObject.Wall.sandstone(495, 535, 990, 10),
			wall_1: MapObject.Wall.sandstone(985, 270, 10, 540),
			wall_2: MapObject.Wall.sandstone(495, 5, 990, 10),
			wall_3: MapObject.Wall.sandstone(5, 270, 10, 540)
		}
	}
}

export default Map;