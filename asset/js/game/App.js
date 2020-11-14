import { Camera } from './Camera.js';

const { Application } = PIXI;
const { Engine } = Matter;

export class App extends Application {

	static config = {
		antialias: true,
		height: 540,
		width: 990
	}

	constructor() {
		super(App.config);
		document.body.appendChild(this.view);
		$('#loading').remove();
		this.init.game();
	}

	init = {
		game: () => {
			this.init.set.bounds();
			this.init.set.objects();
		},
		set: {
			bounds: () => {
				this.bounds = {
					x: 0,
					y: 0,
					w: this.renderer.view.width,
					h: this.renderer.view.height
				}
			},
			objects: () => {
				Object.assign(this, {
					camera: new Camera(this.bounds),
					engine: Engine.create(document.getElementsByTagName('canvas'))
				});
			}
		},
		stage: () => {
			// this.camera.addChild()
			this.stage.addChild(this.camera);
		},
		launch: () => {
			this.ticker.add(delta => this.update.loop(delta));
			Engine.run(this.engine);
		}
	}

	update = {
		loop: delta => {

		}
	}

}