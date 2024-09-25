import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

type FrameConfig = {
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

type Frame = {
	sprite: Sprite;
	duration: number;
};

class Animation {
	image: HTMLImageElement;
	frames: Frame[];

	constructor({
		image,
		frameConfigs,
	}: {
		image: HTMLImageElement;
		frameConfigs: FrameConfig[];
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
		params: Omit<ConstructorParameters<typeof Animation>[0], "image">,
	) {
		return new Promise<Animation>((resolve) => {
			const imageElement = new Image();
			imageElement.onload = () => {
				const animation = new Animation({
					image: imageElement,
					...params,
				});
				resolve(animation);
			};
			imageElement.src = url;
		});
	}
}

export { Animation };
