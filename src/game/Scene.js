import { World } from 'matter-js';

const Scene = {
	add: (app, object) => {
		if (object.type == 'body') {
			World.add(app.engine.world, object);
		}
		if (object.sprite) {
			app.stage.addChild(object.sprite);
		}
		app.objects.push(object);
	},
	remove: (app, object) => {
		if (object.type == 'body') {
			World.remove(app.engine.world, object);
		}
		if (object.sprite) {
			app.stage.removeChild(object.sprite);
		}
		const index = app.objects.indexOf(object);
		app.objects.splice(index, 1);
	}
}

export default Scene;