import { Vector } from "src/utils/Vector";

class Sprite {
	src: string;
	status: "loading" | "success" | "error";
	imageElement: HTMLImageElement;
	size: Vector;

	constructor({ src, size }: { src: string; size?: Vector }) {
		this.src = src;
		this.status = "loading";

		this.imageElement = new Image();
		this.imageElement.onload = () => {
			this.status = "success";
			this.size = new Vector(
				this.imageElement.width,
				this.imageElement.height,
			);
		};
		this.imageElement.onerror = () => {
			this.status = "error";
		};
		this.imageElement.src = src;

		this.size = new Vector(this.imageElement.width, this.imageElement.height);
	}
}

export { Sprite };
