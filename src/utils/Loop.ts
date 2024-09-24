type Callback = (deltaTime: number) => void;

class Loop {
	active: boolean;
	private callback: Callback;
	private prevTimeStamp: number;

	constructor(callback: Callback) {
		this.active = false;
		this.callback = callback;
		this.prevTimeStamp = 0;
	}

	start() {
		if (!this.active) {
			this.active = true;
			this.prevTimeStamp = 0;
			const callbackWrapper = (timeStamp: number) => {
				if (this.active) {
					const deltaTime =
						this.prevTimeStamp === 0 ? 0 : timeStamp - this.prevTimeStamp;
					this.callback(deltaTime);
					this.prevTimeStamp = timeStamp;
					window.requestAnimationFrame(callbackWrapper);
				}
			};
			window.requestAnimationFrame(callbackWrapper);
		}
	}

	stop() {
		this.active = false;
	}
}

export { Loop };
