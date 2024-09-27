import { Actor } from "src/core/Actor";
import { Collision } from "src/core/Collision";
import { Vector } from "src/utils/Vector";

class Collider {
	actor: Actor;
	size: Vector;
	pivot: Vector;

	constructor({
		actor,
		size,
		pivot,
	}: {
		actor: Actor;
		size: Vector;
		pivot: Vector;
	}) {
		this.actor = actor;
		this.size = size;
		this.pivot = pivot;
	}
}

export { Collider };
