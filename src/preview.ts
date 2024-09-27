import { Actor } from "src/core/Actor";
import { Animation } from "src/features/animator/Animation";
import { Engine } from "src/core/Engine";
import { Path } from "src/features/motor";
import { Scene } from "src/core/Scene";
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
		});

		const engine = new Engine({
			rootElement: rootElement,
			viewport: {
				size: new Vector(400, 400),
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

		actor.animator.animate(catRun, { looped: true });
		setTimeout(() => {
			actor.motor.move(
				new Path({
					start: new Vector(0, 0),
					steps: [
						{
							position: new Vector(0, -150),
							acceleration: 0.001,
							velocity: 0.3,
						},
						{
							position: new Vector(0, 0),
							acceleration: 0.001,
							velocity: 0,
						},
					],
				}),
			);
		}, 800);

		setTimeout(() => {
			actor.motor.stop();
		}, 1000);
	}
});
