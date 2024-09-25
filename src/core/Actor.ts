import { Animator } from "src/core/features/Animator";
import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

class Actor {
	position: Vector;
	sprite: Sprite;

	animator: Animator;

	constructor({ position, sprite }: { position: Vector; sprite: Sprite }) {
		this.position = position;
		this.sprite = sprite;
		this.animator = new Animator();
	}

	update(deltaTime: number) {
		this.animator.update({ actor: this, deltaTime });
	}
}

export { Actor };
