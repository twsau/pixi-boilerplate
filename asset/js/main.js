import { Rect } from './c/Rect.js';
import { Menu } from './c/Menu.js';

const { Application } = PIXI;
const loader = PIXI.Loader.shared;

class App extends Application {
	constructor() {
		PIXI.utils.skipHello();
		super(App.config);
		this.bounds = new Rect(0, 0, this.renderer.view.width, this.renderer.view.height);
		Object.assign(this, {
			menu: new Menu(this.bounds, 'bubbles')
		});
		this.stage.addChild(this.menu);
		this.uiEvents();
		this.kbEvents();
		this.launch();
	}
	launch() {
		$('#loading').remove();
		document.getElementById('root').appendChild(this.view);
		this.ticker.add(delta => this.update(delta));
	}
	update(delta) {
		const time = this.ticker.lastTime / 2000;
		this.menu.update(time);
	}
	uiEvents() {
		$('#fullscreen').on('pointerdown', e => {
			this.toggleFullscreen();
		});
	}
	kbEvents() {
		$(document).on('keydown', e => {
			if (e.code == 'Escape' && $('canvas').hasClass('fullscreen')) {
				this.toggleFullscreen();
			}
			if (e.code == 'Backspace') {
				this.menu.visible = true;
			}
		});
	}
	toggleFullscreen() {
		$('canvas').toggleClass('fullscreen');
		$('#fullscreen').toggleClass('selected');
	}
	static config = {
		antialias: false,
		width: 990,
		height: 540
	}
}

loader
	.add('logo', './asset/img/logo.png')
	.load(() => {
		$(document).ready(() => {
			WebFont.load({
				google: {
					families: ['Press Start 2P']
				},
				active: e => {
					let app = new App();
				}
			});
		});
	});