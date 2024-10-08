import { Actor } from "src/core/Actor";
import { Vector } from "src/utils/Vector";

class Scene {
	actors: Actor[];
	camera: {
		position: Vector;
		zoom: number;
	};

	constructor({
		actors,
		camera,
	}: {
		actors: Actor[];
		camera: {
			position: Vector;
			zoom: number;
		};
	}) {
		this.actors = actors;
		this.camera = camera;
	}

	getActorsWithCollider() {
		return this.actors.filter((actor) => actor.collider !== undefined);
	}
}

export { Scene };
