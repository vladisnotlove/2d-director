import { Actor } from "src/core/Actor";
import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

class Viewport {
	rootElement: HTMLElement;
	canvasElement: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	unitsPerPixel: number;

	position: Vector;
	size: Vector;
	zoom: number;

	constructor({ rootElement }: { rootElement: HTMLElement }) {
		// set root and canvas
		this.rootElement = rootElement;
		this.canvasElement = document.createElement("canvas");
		this.canvasElement.style.width = "100%";
		this.canvasElement.style.height = "100%";
		this.rootElement.append(this.canvasElement);

		// set ctx
		const ctx = this.canvasElement.getContext("2d");
		if (ctx === null) {
			throw new Error("2d context is not provided");
		} else {
			this.ctx = ctx;
		}

		// set canvas autoresize
		this.unitsPerPixel = window?.devicePixelRatio ?? 1;

		new ResizeObserver(() => {
			this.size = new Vector(
				this.rootElement.clientWidth,
				this.rootElement.clientHeight,
			);
			this.canvasElement.width = this.size.x * this.unitsPerPixel;
			this.canvasElement.height = this.size.y * this.unitsPerPixel;
		}).observe(this.rootElement);

		this.size = new Vector(
			this.rootElement.clientWidth,
			this.rootElement.clientHeight,
		);
		this.position = new Vector(0, 0);
		this.zoom = 1;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	drawBackground(color: string) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.drawImage;
	}

	drawActor(actor: Actor) {
		// set position with top-left pivot
		const normalPosition = new Vector(
			this.position.x - this.size.x * 0.5,
			this.position.y - this.size.y * 0.5,
		);
		// set position with top-left pivot
		const normalActorPosition = new Vector(
			actor.position.x - actor.sprite.size.x * actor.pivot.x,
			actor.position.y - actor.sprite.size.y * actor.pivot.y,
		);

		// position and size in canvas

		const position = normalActorPosition
			.subtract(normalPosition)
			.multiply(this.unitsPerPixel);

		const size = actor.sprite.size.multiply(this.unitsPerPixel * this.zoom);

		this.ctx.drawImage(
			actor.sprite.imageElement,
			position.x,
			position.y,
			size.x,
			size.y,
		);
	}

	drawGrid(cellSize: Vector = new Vector(25, 25)) {
		const shift = new Vector(
			this.position.x % cellSize.x,
			this.position.y % cellSize.y,
		);
		this.ctx.strokeStyle = "green";
		this.ctx.lineWidth = 1;

		for (let x = shift.x; x < this.ctx.canvas.width; x += cellSize.x) {
			this.ctx.beginPath();
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.ctx.canvas.height);
			this.ctx.stroke();
		}

		for (let y = shift.y; y < this.ctx.canvas.height; y += cellSize.y) {
			this.ctx.beginPath();
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.ctx.canvas.width, y);
			this.ctx.stroke();
		}
	}
}

export { Viewport };
