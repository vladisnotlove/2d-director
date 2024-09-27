import { Animator } from "src/features/animator/Animator";
import { Motor } from "src/features/motor";
import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";
import { Collider } from "src/core/Collider";
import { Collision } from "src/core/Collision";
import { Rect } from "src/utils/Rect";

class Actor {
	// primary properties
	position: Vector;
	sprite?: Sprite;
	collider?: Collider;

	// primary events
	onCollision?: (collision: Collision) => void;

	// features
	animator: Animator;
	motor: Motor;

	constructor({
		position,
		sprite,
		collider,
		onCollision,
	}: {
		position: Vector;
		sprite?: Sprite;
		collider?: Collider;
		onCollision?: (collision: Collision) => void;
	}) {
		this.position = position;
		this.sprite = sprite;
		this.collider = collider;
		this.onCollision = onCollision;

		this.animator = new Animator(this);
		this.motor = new Motor(this);
	}

	update(deltaTime: number) {
		this.animator.update(deltaTime);
		this.motor.update(deltaTime);
	}

	getCollision(actorB: Actor): Collision | undefined {
		const actorA = this;
		if (actorA.collider && actorB.collider) {
			const rectA = Rect.fromObject({
				position: actorA.position,
				size: actorA.collider.size,
				pivot: actorA.collider.pivot,
			});
			const rectB = Rect.fromObject({
				position: actorB.position,
				size: actorB.collider.size,
				pivot: actorB.collider.pivot,
			});

			if (rectA.isIntersected(rectB)) {
				return new Collision({
					collider: actorA.collider,
					otherCollider: actorB.collider,
				});
			}
		}
	}
}

export { Actor };
