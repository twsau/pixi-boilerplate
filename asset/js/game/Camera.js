const { Container } = PIXI;

export class Camera extends Container {

	static config = {
		panSpeed: 20,
	}

	constructor(bounds) {
		super();
		Object.assign(this, {
			bounds: bounds,
			sortableChildren: true,
			target: null
		});
	}

	panToTarget() {
		const coordinates = {
			x: -this.target.x + this.bounds.w / 2,
			y: -this.target.y + this.bounds.h * 0.66
		};
		const angle = Math.atan2(coordinates.y - this.y, coordinates.x - this.x);
		if (Math.hypot(this.x - coordinates.x, this.y - coordinates.y) > Camera.config.panSpeed) {
			this.position.set(
				this.x + Math.cos(angle) * Camera.config.panSpeed,
				this.y + Math.sin(angle) * Camera.config.panSpeed
			);
		} else {
			this.position.set(coordinates.x, coordinates.y);
		}
	}

	setTarget(target) {
		this.target = target;
	}

	update(ref) {
		if (!!this.target) {
			this.panToTarget();
		}
	}

}