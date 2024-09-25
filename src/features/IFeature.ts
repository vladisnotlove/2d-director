import { Actor } from "src/core/Actor";

interface IFeature {
	actor: Actor;
	update(deltaTime): void;
}

export { IFeature };
