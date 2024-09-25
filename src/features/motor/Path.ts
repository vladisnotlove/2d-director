import { Vector } from "src/utils/Vector";

type Step = {
	position: Vector;
	velocity: number; // units/sec
	acceleration: number; // unit/sec2
};

class Path {
	start: Vector;
	steps: Step[];

	constructor({ start, steps }: { start: Vector; steps: Step[] }) {
		this.start = start;
		this.steps = steps;
	}
}

export { Path, Step };
