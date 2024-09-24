import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

class Actor {
	position: Vector;
	sprite: Sprite;

	constructor({ position, sprite }: { position: Vector; sprite: Sprite }) {
		this.position = position;
		this.sprite = sprite;
	}

	update() {}
}

export { Actor };
