import { SpriteAnimator } from "src/features/sprite-animator";
import { Motor } from "src/features/motor";
import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";
import { Collider } from "src/core/Collider";
import { Collision } from "src/core/Collision";
import { Rect } from "src/utils/Rect";
import { Animator } from "src/features/animator";

class Actor {
	// primary properties
	position: Vector;
	opacity: number;
	sprite?: Sprite;
	collider?: Collider;

	// primary events
	onCollision?: (collision: Collision) => void;

	// features
	spriteAnimator: SpriteAnimator;
	animator: Animator;
	motor: Motor;

	constructor({
		position,
		sprite,
		opacity,
		collider,
		onCollision,
	}: {
		position: Vector;
		opacity?: number;
		sprite?: Sprite;
		collider?: Collider;
		onCollision?: (collision: Collision) => void;
	}) {
		this.position = position;
		this.opacity = opacity ?? 1;
		this.sprite = sprite;
		this.collider = collider;
		this.onCollision = onCollision;

		this.animator = new Animator(this);
		this.spriteAnimator = new SpriteAnimator(this);
		this.motor = new Motor(this);
	}

	update(deltaTime: number) {
		this.animator.update(deltaTime);
		this.spriteAnimator.update(deltaTime);
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
