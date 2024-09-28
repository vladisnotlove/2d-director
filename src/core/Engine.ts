import { Scene } from "src/core/Scene";
import { Loop } from "src/utils/Loop";
import { Vector } from "src/utils/Vector";
import { Painter } from "src/core/Painter";

class Engine {
	painter: Painter;
	background: string | null;
	scene: Scene;
	loop: Loop;

	debug: boolean;

	constructor({
		rootElement,
		viewport,
		scene,
		debug,
	}: {
		rootElement: HTMLElement;
		viewport: {
			background?: string;
			size: Vector;
		};
		scene: Scene;
		debug?: boolean;
	}) {
		this.painter = new Painter({ rootElement, size: viewport.size });
		this.background = viewport.background ?? null;
		this.scene = scene;
		this.loop = new Loop((deltaTime) => {
			this.update(deltaTime);
		});
		this.debug = debug ?? false;
	}

	start() {
		this.loop.start();
	}

	stop() {
		this.loop.stop();
	}

	update(deltaTime: number) {
		this.painter.clear();

		if (this.background) {
			this.painter.drawBackground(this.background);
		}

		if (this.debug) {
			const gridCellSize = new Vector(25, 25);
			const gridStart = this.painter.size
				.multiply(-0.5)
				.subtract(
					new Vector(
						this.scene.camera.position.x % gridCellSize.x,
						this.scene.camera.position.y % gridCellSize.y,
					).floor(),
				);

			this.painter.drawGrid(gridStart, gridCellSize);
			this.painter.drawAxis(this.scene.camera.position.multiply(-1));
			this.painter.drawCrosshair(new Vector(0, 0));
		}

		// update actor
		for (const actor of this.scene.actors) {
			actor.update(deltaTime);
		}

		// draw sprite of actor
		for (const actor of this.scene.actors) {
			if (actor.sprite) {
				const positionInPainter = actor.position.subtract(
					this.scene.camera.position,
				);
				this.painter.drawSprite(actor.sprite, positionInPainter, {
					opacity: actor.opacity,
				});
			}
		}

		// trigger onCollision
		const actors = this.scene.getActorsWithCollider();
		for (const actorA of actors) {
			for (const actorB of actors) {
				if (actorA.onCollision) {
					const collision = actorA.getCollision(actorB);
					if (collision) {
						actorA.onCollision(collision);
					}
				}
			}
		}
	}
}

export { Engine };
