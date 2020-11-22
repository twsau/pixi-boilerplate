import MapObject from './MapObject.js';
import MapSprite from './MapSprite.js';

const Map = {
	example: () => {
		return {
			mapSprite: MapSprite.Wall.sandstone(495, 270, 990, 540)
		}
	}
}

export default Map;