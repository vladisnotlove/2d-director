import { Actor } from "src/core/Actor";
import { Animation } from "./Animation";
import { IFeature } from "src/features/IFeature";

class Animator implements IFeature {
	actor: Actor;

	private animation?: Animation;
	private frameIndex: number;
	private animationTime: number;
	private updateTime: number;
	private looped: boolean;

	private status?: "playing" | "stopped";

	constructor(actor: Actor) {
		this.actor = actor;
		this.animation = undefined;
		this.frameIndex = 0;
		this.animationTime = 0;
		this.updateTime = 0;
		this.looped = false;
		this.status = "stopped";
	}

	update(deltaTime: number) {
		if (this.animation && this.status !== "stopped") {
			this.updateTime += deltaTime;

			if (this.updateTime > this.animationTime) {
				this.frameIndex++;
				if (
					this.frameIndex >= this.animation.frames.length &&
					!this.looped
				) {
					this.status = "stopped";
					return;
				}
				this.frameIndex = this.frameIndex % this.animation.frames.length;
				const frame = this.animation.frames[this.frameIndex];
				this.actor.sprite = frame.sprite;
				this.animationTime += frame.duration;
			}
		}
	}

	animate(animation: Animation, options?: { looped?: boolean }) {
		const looped = options?.looped ?? false;
		this.animation = animation;
		this.frameIndex = 0;
		this.animationTime = 0;
		this.updateTime = 0;
		this.looped = looped;
		this.status = "playing";
	}
}

export { Animator };
