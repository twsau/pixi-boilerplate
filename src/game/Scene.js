import { World } from 'matter-js';

const Scene = {
	add: (app, object) => {
		if (object.body) {
			World.add(app.engine.world, object.body);
		}
		if (object.sprite) {
			app.stage.addChild(object.sprite);
		}
		app.objects.push(object);
	},
	remove: (app, object) => {
		if (object.body) {
			World.remove(app.engine.world, object.body);
		}
		if (object.sprite) {
			app.stage.removeChild(object.sprite);
		}
		const index = app.objects.indexOf(object);
		app.objects.splice(index, 1);
	}
}

export default Scene;