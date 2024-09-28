import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

type SpriteFrameConfig = {
	slice: {
		position: Vector;
		size: Vector;
	};
	spriteConfig?: {
		size?: Vector;
		pivot?: Vector;
	};
	duration: number;
};

type SpriteFrame = {
	sprite: Sprite;
	duration: number;
};

class SpriteAnimation {
	image: HTMLImageElement;
	frames: SpriteFrame[];

	constructor({
		image,
		frameConfigs,
	}: {
		image: HTMLImageElement;
		frameConfigs: SpriteFrameConfig[];
	}) {
		this.image = image;
		this.frames = frameConfigs.map(({ slice, spriteConfig, duration }) => {
			const spriteImage = document.createElement("canvas");
			spriteImage.width = slice.size.x;
			spriteImage.height = slice.size.y;

			const ctx = spriteImage.getContext("2d");
			if (!ctx) {
				throw new Error("Context is not provided");
			}

			ctx.drawImage(
				this.image,
				// from
				slice.position.x,
				slice.position.y,
				slice.size.x,
				slice.size.y,
				// to
				0,
				0,
				slice.size.x,
				slice.size.y,
			);

			return {
				sprite: new Sprite({
					image: spriteImage,
					pivot: spriteConfig?.pivot,
					size: spriteConfig?.size,
				}),
				duration: duration,
			};
		});
	}

	static fromUrl(
		url: string,
		params: Omit<ConstructorParameters<typeof SpriteAnimation>[0], "image">,
	) {
		return new Promise<SpriteAnimation>((resolve) => {
			const imageElement = new Image();
			imageElement.onload = () => {
				const animation = new SpriteAnimation({
					image: imageElement,
					...params,
				});
				resolve(animation);
			};
			imageElement.src = url;
		});
	}
}

export { SpriteAnimation };
