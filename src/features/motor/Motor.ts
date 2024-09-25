import { Actor } from "src/core/Actor";
import { IFeature } from "src/features/IFeature";
import { Path, Step } from "./Path";
import { Vector } from "src/utils/Vector";

class Stepper {
	private path: Path;
	private index: number;

	get prev() {
		return this.path.steps[this.index - 1] as Step | undefined;
	}

	get current() {
		return this.path.steps[this.index] as Step | undefined;
	}

	get next() {
		return this.path.steps[this.index + 1] as Step | undefined;
	}

	get length() {
		return this.path.steps.length;
	}

	constructor(path: Path) {
		this.path = path;
		this.index = 0;
	}

	toNext() {
		this.index++;
	}

	toLast() {
		this.index = this.length - 1;
	}
}

class Motor implements IFeature {
	actor: Actor;

	private path?: Path;
	private stepper?: Stepper;

	private velocity: number;
	private direction: Vector;
	private distance: number;
	private targetDistance: number;

	constructor(actor: Actor) {
		this.actor = actor;

		this.path = undefined;
		this.stepper = undefined;

		this.velocity = 0;
		this.direction = new Vector(0, 0);
		this.distance = 0;
		this.targetDistance = 0;
	}

	update(deltaTime: number) {
		if (this.path && this.stepper && this.stepper.current) {
			this.velocity += this.stepper.current.acceleration * deltaTime;
			this.distance += this.velocity * deltaTime;

			if (this.distance > this.targetDistance) {
				this.actor.position = this.stepper.current.position;
				this.stepper.toNext();

				if (!this.stepper.current) return;

				this.distance = 0;
				this.velocity = this.stepper.current.velocity;

				const target = this.stepper.current.position.subtract(
					this.stepper.prev?.position ?? this.path?.start,
				);
				this.direction = target.normalize();
				this.targetDistance = target.length;
			} else {
				this.actor.position = this.actor.position.add(
					this.direction.multiply(this.velocity * deltaTime),
				);
			}
		}
	}

	move(path: Path) {
		this.path = path;
		this.stepper = new Stepper(this.path);

		if (!this.stepper.current) {
			throw new Error("Path must have at least one step");
		}

		const stepDelta = this.stepper.current.position.subtract(this.path.start);
		this.velocity = this.stepper.current.velocity;
		this.direction = stepDelta.normalize();
		this.distance = 0;
		this.targetDistance = stepDelta.length;
	}

	stop() {
		this.stepper?.toLast();
		this.stepper?.toNext();
	}
}

export { Motor };
