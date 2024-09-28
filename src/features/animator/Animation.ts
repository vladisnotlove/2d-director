import { Vector } from "src/utils/Vector";

export type Frame<TValue> = {
	from: TValue;
	to: TValue;
	timingFunction: (relativeTime: number) => number;
	duration: number;
};

export type Track<TValue> = Frame<TValue>[];

type Tracks = {
	opacity?: Frame<number>[];
};

export class Animation {
	tracks: Tracks;

	constructor({ tracks }: { tracks: Tracks }) {
		this.tracks = tracks;
	}
}
