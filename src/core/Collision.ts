import { Collider } from "src/core/Collider";
import { Vector } from "src/utils/Vector";

class Collision {
	collider: Collider;
	otherCollider: Collider;

	constructor({
		collider,
		otherCollider,
	}: {
		collider: Collider;
		otherCollider: Collider;
	}) {
		this.collider = collider;
		this.otherCollider = otherCollider;
	}
}

export { Collision };
