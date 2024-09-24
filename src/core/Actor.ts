import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

class Actor {
	position: Vector;
	sprite: Sprite;
	pivot: Vector; // percents

	constructor({
		position,
		sprite,
		pivot,
	}: {
		position: Vector;
		sprite: Sprite;
		pivot?: Vector;
	}) {
		this.position = position;
		this.sprite = sprite;
		this.pivot = pivot ?? new Vector(0.5, 0.5);
	}

	update() {}
}

export { Actor };
