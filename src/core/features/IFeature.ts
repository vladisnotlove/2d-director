import { Actor } from "src/core/Actor";

interface IFeature {
	update({ actor, deltaTime }: { actor: Actor; deltaTime: number }): void;
}

export { IFeature };
