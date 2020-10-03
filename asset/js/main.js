const {Application, Container, Graphics, Sprite, Text} = PIXI;
const loader = PIXI.Loader.shared;

class Game {
	constructor() {
		PIXI.utils.skipHello();
		Object.assign(this, {
			app: new Application(CONFIG.app),
			bounds: {x: 0, y: 0, w: CONFIG.app.width, h: CONFIG.app.height}
		});
		Object.assign(this, {
			menu: new Menu(this.bounds, 'spiral'),
			// game objects go here
		});
		this.app.stage.addChild(this.menu);
		$('#loading').remove();
		document.body.appendChild(this.app.view);
		this.app.ticker.add(delta => this.update(delta));
	}
	update(delta) {
		const time = this.app.ticker.lastTime / 2000;
		this.menu.update(time);
	}
}

class Menu extends Container {
	constructor(bounds, type = 'bubbles') {
		super();
		Object.assign(this, bounds);
		Object.assign(this, {
			type: type,
			zIndex: 10,
			bg: Menu.element.bg(bounds),
			screens: {
				main: Menu.screen.main(this),
				highscores: Menu.screen.highscores(this),
				options: Menu.screen.options(this),
				credits: Menu.screen.credits(this)
			}
		});
		this.addChild(this.bg);
		for (const [key, value] of Object.entries(this.screens)) {
			this.addChild(value);
		}
		this.addChild(Menu.element.logo(this));
	}
	update(time) {
		switch (this.type) {
			case 'bubbles':
				this.bg.clear().beginFill(0x161925).drawRect(this.x, this.y, this.w, this.h).endFill();
				for (let x = 0; x < this.w / this.bg.size + 2; x++) {
					for (let y = 0; y < this.h / this.bg.size + 2; y++) {
						let p = {
							x: x * this.bg.size + Math.cos(time + y) * -this.bg.size / 2,
							y: y * this.bg.size + Math.sin(time + y) * this.bg.size / 2,
							r: -20 + this.bg.size / 2 * Math.sin(time) * Math.sin(x - y),
							o: Math.sin(Math.sin(x * y)) * Math.sin(time) * 0.1
						};
						this.bg.lineStyle(1, 0x004455, 0.4 + p.o).beginFill(0x00ffff, p.o).arc(p.x, p.y, p.r, 0, Math.PI * 2).endFill();
					}
				}
				break;
			case 'squares':
				this.bg.clear().beginFill(0x161925).drawRect(this.x, this.y, this.w, this.h).endFill();
				for (let x = 0; x < this.w / this.bg.size + 2; x++) {
					for (let y = 0; y < this.h / this.bg.size + 2; y++) {
						let p = {
							x: x * (this.bg.size / 2.5) * Math.cos(time / y) + this.w / 2,
							y: y * (this.bg.size / 3) * Math.sin(time / x) + this.h / 2,
							w: (this.bg.size) * Math.cos(time / y),
							h: (this.bg.size) * Math.sin(time / x),
							o: 0.1
						};
						this.bg.beginFill(0x705463, p.o).drawRect(p.x, p.y, p.w, p.h).endFill();
					}
				}
				break;
			case 'spiral':
				time /= 3;
				this.bg.clear().beginFill(0x161925).drawRect(this.x, this.y, this.w, this.h).endFill();
				for (let d = 0; d < 300; d++) {
					let p = {
						x: d * Math.sin(d + time) + this.w / 2,
						y: d * Math.cos(d + time) + this.h / 2,
						r: 100 * Math.sin(time),
						o: 0.01
					}
					this.bg.beginFill(0x00ffff, p.o).arc(p.x, p.y, p.r, 0, Math.PI * 2).endFill();
				}
				break;
		}
	}
	static display(screen, menu) {
		if (screen == 'play') {
			menu.visible = false;
		} else {
			for (const [key, value] of Object.entries(menu.screens)) {
				value.visible = key == screen ? true : false;
			}
		}
	}
	static element = {
		bg: bounds => {
			let splash = new Graphics();
			splash.size = bounds.w > bounds.h ? bounds.w / 20 : bounds.h / 20;
			return splash;
		},
		border: menu => {
			let border = new Graphics();
			border.lineStyle(1, 0xffffff).beginFill(0x007777).drawRect(menu.w / 2 - 175, 0, 350, 66);
			return border;
		},
		button: (content, callback, menu) => {
			let button = new Container();
			button.interactive = true;
			button.on('pointerdown', e => {
				callback(content, menu);
			});
			let border = Menu.element.border(menu);
			let text = Menu.element.text(content, menu);
			button.addChild(border, text);
			return button;
		},
		logo: menu => {
			let logo = new Sprite(loader.resources['logo'].texture);
			logo.anchor.set(0.5);
			logo.position.set(menu.w / 2, 70);
			return logo;
		},
		text: (content, menu) => {
			let text = new Text(content, CONFIG.menu.textStyle);
			text.anchor.set(0.5);
			text.position.set(menu.w / 2, 35);
			return text;
		}
	}
	static screen = {
		build: (screen, items) => {
			let i = 0;
			for (const [key, value] of Object.entries(items)) {
				value.y = 200 + i * 75;
				i++;
				screen.addChild(value);
			}
			return screen;
		},
		main: menu => {
			let main = new Container();
			let items = {
				play: Menu.element.button('play', Menu.display, menu),
				highscores: Menu.element.button('highscores', Menu.display, menu),
				options: Menu.element.button('options', Menu.display, menu),
				credits: Menu.element.button('credits', Menu.display, menu)
			};
			return Menu.screen.build(main, items);
		},
		highscores: menu => {
			let highscores = new Container();
			highscores.visible = false;
			let items = {
				main: Menu.element.button('main', Menu.display, menu)
			};
			return Menu.screen.build(highscores, items);
		},
		options: menu => {
			let options = new Container();
			options.visible = false;
			let items = {
				main: Menu.element.button('main', Menu.display, menu)
			};
			return Menu.screen.build(options, items);
		},
		credits: menu => {
			let credits = new Container();
			credits.visible = false;
			let items = {
				author: Menu.element.text('author: twsau', menu),
				url: Menu.element.text('twsau.co.uk', menu),
				back: Menu.element.button('main', Menu.display, menu)
			}
			return Menu.screen.build(credits, items);
		}
	}
}


const CONFIG = {
	app: {
		antialias: false,
		backgroundColor: 0x161925,
		height: 768,
		transparent: false,
		width: 1366
	},
	menu: {
		textStyle: {fill: 0xf0f0f0, fontFamily: 'Press Start 2P', fontSize: 32, fontWeight: 'bold'}
	},
}

loader
	.add('logo', './asset/img/logo.png')
	.load(function(){$(document).ready(function() {WebFont.load({google: {families: ['Press Start 2P']},active:e=>{game = new Game();}});});});