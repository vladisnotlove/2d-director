import { Viewport } from "src/core/Viewport";
import { Scene } from "src/core/Scene";
import { Loop } from "src/utils/Loop";

class Engine {
	viewport: Viewport;
	loop: Loop;

	background?: string;
	scene: Scene;

	debug: boolean;

	constructor({
		rootElement,
		background,
		scene,
	}: {
		rootElement: HTMLElement;
		background?: string;
		scene: Scene;
	}) {
		this.viewport = new Viewport({ rootElement });
		this.loop = new Loop(() => {
			this.update();
		});

		this.background = background;
		this.scene = scene;
	}

	start() {
		this.loop.start();
	}

	stop() {
		this.loop.stop();
	}

	update() {
		this.viewport.clear();

		this.viewport.position = this.scene.camera.position;
		this.viewport.zoom = this.scene.camera.zoom;

		if (this.background) {
			this.viewport.drawBackground(this.background);
		}

		this.scene.actors.forEach((actor) => {
			actor.update();
			this.viewport.drawActor(actor);
		});
	}
}

export { Engine };
