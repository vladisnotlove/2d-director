import { Actor } from "src/core/Actor";
import { Animation } from "src/core/Animation";
import { Engine } from "src/core/Engine";
import { Scene } from "src/core/Scene";
import { Sprite } from "src/core/Sprite";
import { Vector } from "src/utils/Vector";

window.addEventListener("load", async () => {
	const rootElement = document.getElementById("root");

	if (rootElement) {
		const catRun = await Animation.fromUrl("img/cat-run.svg", {
			frameConfigs: [
				{
					slice: {
						position: new Vector(16, 16),
						size: new Vector(48, 48),
					},
					duration: 100,
				},
				{
					slice: {
						position: new Vector(16, 74),
						size: new Vector(48, 48),
					},
					duration: 100,
				},
				{
					slice: {
						position: new Vector(16, 132),
						size: new Vector(48, 48),
					},
					duration: 100,
				},
				{
					slice: {
						position: new Vector(16, 190),
						size: new Vector(48, 48),
					},
					duration: 100,
				},
				{
					slice: {
						position: new Vector(16, 248),
						size: new Vector(48, 48),
					},
					duration: 100,
				},
				{
					slice: {
						position: new Vector(16, 306),
						size: new Vector(48, 48),
					},
					duration: 100,
				},
			],
		});

		const actor = new Actor({
			position: new Vector(0, 0),
			sprite: catRun.frames[0].sprite,
		});

		const engine = new Engine({
			rootElement: rootElement,
			viewport: {
				size: new Vector(200, 200),
			},
			scene: new Scene({
				actors: [actor],
				camera: {
					position: new Vector(10, 10),
					zoom: 1,
				},
			}),
			debug: true,
		});

		engine.start();
		actor.animator.startAnimation(catRun, { looped: true });
	}
});
