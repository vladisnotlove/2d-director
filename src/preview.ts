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
			viewport: {
				size: new Vector(200, 200),
			},
			scene: new Scene({
				actors: [
					new Actor({
						position: new Vector(0, 0),
						sprite: new Sprite({
							src: "img/cat.svg",
							size: new Vector(50, 50),
						}),
					}),
				],
				camera: {
					position: new Vector(-60, -60),
					zoom: 1,
				},
			}),
			debug: true,
		});
		engine.start();
	}
});
