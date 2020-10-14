export class Rect {
	constructor(x, y, w, h) {
		Object.assign(this, {x: x, y: y, w: w, h: h});
	}
	static contains(point, rect) {
		return (
			rect.x <= point.x
			&& point.x <= rect.x + rect.w
			&& rect.y <= point.y
			&& point.y <= rect.y + rect.h
		);
	}
	static intersects(rectA, rectB) {
		if ( rectA.x + rectA.w < rectB.x || rectA.x > rectB.x + rectB.w || rectA.y + rectA.h < rectB.y || rectA.y > rectB.y + rectB.h) {
			return false;
		}
		return true;
	}
}