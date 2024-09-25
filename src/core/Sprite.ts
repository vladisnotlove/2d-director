import { Vector } from "src/utils/Vector";

class Sprite {
	readonly image: HTMLCanvasElement;
	pivot: Vector; // percents
	size: Vector;

	get originSize() {
		return new Vector(this.image.width, this.image.height);
	}

	constructor({
		image,
		pivot,
		size,
	}: {
		image: HTMLCanvasElement;
		pivot?: Vector;
		size?: Vector;
	}) {
		this.image = image;
		this.pivot = pivot ?? new Vector(0.5, 0.5);
		this.size = size ?? new Vector(this.image.width, this.image.height);
	}

	static fromUrl(
		url: string,
		options?: Omit<ConstructorParameters<typeof Sprite>[0], "image">,
	) {
		return new Promise((resolve, reject) => {
			const imageElement = new Image();
			const canvasElement = document.createElement("canvas");

			imageElement.onload = () => {
				canvasElement.width = imageElement.width;
				canvasElement.height = imageElement.height;

				const ctx = canvasElement.getContext("2d");
				if (!ctx) {
					reject(new Error("Context is not provided"));
					return;
				}
				ctx.drawImage(imageElement, 0, 0);

				const sprite = new Sprite({
					image: canvasElement,
					...options,
				});

				resolve(sprite);
			};
		});
	}
}

export { Sprite };
