import { Vector } from "src/utils/Vector";

class Sprite {
	src: string;
	status: "loading" | "success" | "error";
	imageElement: HTMLImageElement;
	pivot: Vector; // percents
	size: Vector;

	constructor({
		src,
		size,
		pivot,
	}: {
		src: string;
		size?: Vector;
		pivot?: Vector;
	}) {
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

		this.pivot = pivot ?? new Vector(0.5, 0.5);
		this.size =
			size ?? new Vector(this.imageElement.width, this.imageElement.height);
	}
}

export { Sprite };
