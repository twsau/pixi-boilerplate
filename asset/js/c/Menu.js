const { Container, Graphics, Text, Sprite } = PIXI;
const loader = PIXI.Loader.shared;

export class Menu extends Container {
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
						this.bg.lineStyle(1, 0x004455, 0.15 + p.o).beginFill(0x00ffff, p.o).arc(p.x, p.y, p.r, 0, Math.PI * 2).endFill();
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
				for (let d = 0; d < 200; d++) {
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
		border: menu => {
			let border = new Graphics();
			border.lineStyle(1, 0xffffff).beginFill(0x004444, 0.5).drawRect(menu.w / 2 - 60, 0, 120, 70);
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
			logo.scale.set(0.5);
			logo.position.set(menu.w / 2, 70);
			return logo;
		},
		bg: bounds => {
			let bg = new Graphics();
			bg.size = bounds.w > bounds.h ? bounds.w / 20 : bounds.h / 15;
			return bg;
		},
		text: (content, menu) => {
			let text = new Text(content, Menu.config.textStyle);
			text.anchor.set(0.5);
			text.position.set(menu.w / 2, 35);
			return text;
		}
	}
	static screen = {
		build: (screen, items) => {
			let i = 0;
			for (const [key, value] of Object.entries(items)) {
				value.y = 150 + i * 80;
				i++;
				screen.addChild(value);
			}
			return screen;
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
		},
		dead: menu => {
			let dead = new Container();
			dead.visible = false;
			let items = {
				msg: Menu.element.text('you died', menu),
				suggest: Menu.element.text('refresh the page to try again', menu)
			};
			return Menu.screen.build(dead, items);
		},
		highscores: menu => {
			let highscores = new Container();
			highscores.visible = false;
			let items = {
				main: Menu.element.button('main', Menu.display, menu)
			};
			return Menu.screen.build(highscores, items);
		},
		main: menu => {
			let main = new Container();
			let items = {
				play: Menu.element.button('play', Menu.display, menu),
				options: Menu.element.button('options', Menu.display, menu),
				credits: Menu.element.button('credits', Menu.display, menu)
			};
			return Menu.screen.build(main, items);
		},
		options: menu => {
			let options = new Container();
			options.visible = false;
			let items = {
				save: Menu.element.button('main', Menu.display, menu)
			};
			return Menu.screen.build(options, items);
		}
	}
	static config = {
		textStyle: {fill: 0xffffff, fontFamily: 'Press Start 2P', fontSize: 15}
	}
}