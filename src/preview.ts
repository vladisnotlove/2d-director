import { Actor } from "src/core/Actor";
import { SpriteAnimation } from "src/features/sprite-animator";
import { Animation } from "src/features/animator";
import { Engine } from "src/core/Engine";
import { Path } from "src/features/motor";
import { Scene } from "src/core/Scene";
import { Vector } from "src/utils/Vector";

window.addEventListener("load", async () => {
	const rootElement = document.getElementById("root");

	if (rootElement) {
		const catRun = await SpriteAnimation.fromUrl("img/cat-run.svg", {
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

		const fadeIn = new Animation(
			new Animation({
				tracks: {
					opacity: [
						{ from: 1, to: 0, duration: 1000, timingFunction: (x) => x },
					],
				},
			}),
		);

		const actor = new Actor({
			position: new Vector(0, 0),
			opacity: 0.5,
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

		actor.spriteAnimator.animate(catRun, { looped: true });
		actor.animator.animate(fadeIn);

		setTimeout(() => {
			actor.motor.stop();
		}, 1000);
	}
});
