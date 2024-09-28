import { Actor } from "src/core/Actor";
import { IFeature } from "../IFeature";
import { Animation, Track, Frame } from "./Animation";

class NumberTrackPlayer {
	track: Track<number>;
	private currentTime: number;
	private currentFrame?: Frame<number>;
	private currentFrameIndex: number;

	constructor(track: Track<number>) {
		this.track = track;
		this.currentTime = 0;
		this.currentFrame = track[0];
		this.currentFrameIndex = 0;
	}

	addTime(deltaTime: number) {
		if (!this.currentFrame) return;
		this.currentTime += deltaTime;
		if (this.currentTime > this.currentFrame.duration) {
			this.currentTime -= this.currentFrame.duration;
			this.currentFrameIndex++;
			this.currentFrame = this.track[this.currentFrameIndex];
		}
	}

	getCurrentValue() {
		if (!this.currentFrame) return;
		const relativeTime = this.currentTime / this.currentFrame.duration;
		const scale = this.currentFrame.timingFunction(relativeTime);
		return (
			this.currentFrame.from +
			(this.currentFrame.to - this.currentFrame.from) * scale
		);
	}

	isFinished() {
		return !this.currentFrame;
	}
}

export class Animator implements IFeature {
	actor: Actor;
	animation?: Animation;
	players: {
		opacity?: NumberTrackPlayer;
	};

	constructor(actor: Actor) {
		this.actor = actor;
		this.animation = undefined;
		this.players = {
			opacity: undefined,
		};
	}

	update(deltaTime: any): void {
		if (this.players) {
			if (this.players.opacity && !this.players.opacity.isFinished()) {
				this.players.opacity.addTime(deltaTime);
				const opacity = this.players.opacity.getCurrentValue();
				if (opacity !== undefined) this.actor.opacity = opacity;
			}
		}
	}

	animate(animation: Animation) {
		this.animation = animation;
		if (this.animation.tracks.opacity) {
			this.players.opacity = new NumberTrackPlayer(
				this.animation.tracks.opacity,
			);
		}
	}
}
