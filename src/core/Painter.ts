import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

class Painter {
	rootElement: HTMLElement;
	canvasElement: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	size: Vector;

	private realPixelRatio: Vector;
	private realSize: Vector;
	private realSizeHalf: Vector;

	constructor({
		rootElement,
		size,
	}: {
		rootElement: HTMLElement;
		size: Vector;
	}) {
		// set root
		this.rootElement = rootElement;

		// create canvas
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

		// set sizes
		this.size = size;
		this.realSize = new Vector(
			this.rootElement.clientWidth * window.devicePixelRatio,
			this.rootElement.clientHeight * window.devicePixelRatio,
		);
		this.realSizeHalf = this.realSize.multiply(0.5);
		this.realPixelRatio = this.realSize.divide(this.size);

		// add canvas autosize
		new ResizeObserver(() => {
			this.realSize = new Vector(
				this.rootElement.clientWidth * window.devicePixelRatio,
				this.rootElement.clientHeight * window.devicePixelRatio,
			);
			this.realSizeHalf = this.realSize.multiply(0.5);
			this.realPixelRatio = this.realSize.divide(this.size);
			this.canvasElement.width = this.realSize.x;
			this.canvasElement.height = this.realSize.y;
		}).observe(this.rootElement);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	drawBackground(color: string) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.drawImage;
	}

	drawSprite(
		sprite: Sprite,
		position: Vector,
		options?: {
			pivot?: Vector;
			size?: Vector;
		},
	) {
		const size = options?.size ?? sprite.size;
		const pivot = options?.pivot ?? new Vector(0.5, 0.5);

		const realPosition = this.toRealPosition(
			position.subtract(size.multiply(pivot)),
		);
		const realSize = this.toRealSize(size);

		this.ctx.drawImage(
			sprite.image,
			realPosition.x,
			realPosition.y,
			realSize.x,
			realSize.y,
		);
	}

	drawGrid(start: Vector, cellSize: Vector = new Vector(25, 25)) {
		this.ctx.strokeStyle = "green";
		this.ctx.lineWidth = 1;

		// vertical lines
		for (let x = start.x; x < this.size.x; x += cellSize.x) {
			const start = this.toRealPosition(new Vector(x, -this.size.y * 0.5));
			const end = this.toRealPosition(new Vector(x, this.size.y));
			this.ctx.beginPath();
			this.ctx.moveTo(start.x, start.y);
			this.ctx.lineTo(end.x, end.y);
			this.ctx.stroke();
		}

		// horizontal lines
		for (let y = start.y; y < this.size.y; y += cellSize.y) {
			const start = this.toRealPosition(new Vector(-this.size.x * 0.5, y));
			const end = this.toRealPosition(new Vector(this.size.x, y));
			this.ctx.beginPath();
			this.ctx.moveTo(start.x, start.y);
			this.ctx.lineTo(end.x, end.y);
			this.ctx.stroke();
		}
	}

	drawAxis(center: Vector) {
		this.ctx.strokeStyle = "red";
		this.ctx.lineWidth = 1;

		const startX = this.toRealPosition(
			new Vector(-this.size.x * 0.5, center.y),
		);
		const endX = this.toRealPosition(new Vector(this.size.x, center.y));

		this.ctx.beginPath();
		this.ctx.moveTo(startX.x, startX.y);
		this.ctx.lineTo(endX.x, endX.y);
		this.ctx.stroke();

		const startY = this.toRealPosition(new Vector(center.x, -this.size.y));
		const endY = this.toRealPosition(new Vector(center.x, this.size.y));

		this.ctx.beginPath();
		this.ctx.moveTo(startY.x, startY.y);
		this.ctx.lineTo(endY.x, endY.y);
		this.ctx.stroke();
	}

	drawCrosshair(position: Vector) {
		this.ctx.strokeStyle = "purple";
		this.ctx.lineWidth = 1;

		const startX = this.toRealPosition(new Vector(-5, position.y));
		const endX = this.toRealPosition(new Vector(5, position.y));

		this.ctx.beginPath();
		this.ctx.moveTo(startX.x, startX.y);
		this.ctx.lineTo(endX.x, endX.y);
		this.ctx.stroke();

		const startY = this.toRealPosition(new Vector(position.x, -5));
		const endY = this.toRealPosition(new Vector(position.x, 5));

		this.ctx.beginPath();
		this.ctx.moveTo(startY.x, startY.y);
		this.ctx.lineTo(endY.x, endY.y);
		this.ctx.stroke();
	}

	// utils

	toRealPosition(point: Vector) {
		return point.multiply(this.realPixelRatio).add(this.realSizeHalf);
	}

	toRealSize(point: Vector) {
		return point.multiply(this.realPixelRatio);
	}
}

export { Painter };
