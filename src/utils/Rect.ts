import { Vector } from "src/utils/Vector";

class Rect {
	top: number;
	right: number;
	bottom: number;
	left: number;

	constructor({
		top,
		right,
		bottom,
		left,
	}: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	}) {
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.left = left;
	}

	static fromObject({
		position,
		size,
		pivot,
	}: {
		position: Vector;
		size: Vector;
		pivot: Vector;
	}) {
		const topLeft = position.subtract(size.multiply(pivot));
		return new Rect({
			top: topLeft.y,
			right: topLeft.x + size.x,
			bottom: topLeft.y + size.y,
			left: topLeft.x,
		});
	}

	isIntersected(rectB: Rect) {
		const rectA = this;
		return !(
			rectA.left > rectB.right ||
			rectA.right < rectB.left ||
			rectA.top > rectB.bottom ||
			rectA.bottom < rectB.top
		);
	}
}

export { Rect };
