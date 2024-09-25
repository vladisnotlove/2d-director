import { Animator } from "src/features/animator/Animator";
import { Motor } from "src/features/motor";
import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

class Actor {
	position: Vector;
	sprite: Sprite;

	animator: Animator;
	motor: Motor;

	constructor({ position, sprite }: { position: Vector; sprite: Sprite }) {
		this.position = position;
		this.sprite = sprite;
		this.animator = new Animator(this);
		this.motor = new Motor(this);
	}

	update(deltaTime: number) {
		this.animator.update(deltaTime);
		this.motor.update(deltaTime);
	}
}

export { Actor };
