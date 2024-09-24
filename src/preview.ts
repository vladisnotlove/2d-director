import { Actor } from "src/core/Actor";
import { Engine } from "src/core/Engine";
import { Scene } from "src/core/Scene";
import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

window.addEventListener("load", () => {
	const rootElement = document.getElementById("root");
	if (rootElement) {
		const engine = new Engine({
			rootElement: rootElement,
			scene: new Scene({
				actors: [
					new Actor({
						position: new Vector(0, 0),
						sprite: new Sprite({ src: "img/cat.svg" }),
					}),
					new Actor({
						position: new Vector(100, 0),
						sprite: new Sprite({ src: "img/cat.svg" }),
					}),
				],
				camera: {
					position: new Vector(0, 0),
					zoom: 1,
				},
			}),
		});
		engine.start();
	}
});
