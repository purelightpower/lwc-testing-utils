import EventEmitter from "events";

class Waiter {
    #resolve;

    constructor(element) {
        this.emitter = new EventEmitter();
        this.element = element;
        this.#resolve = Promise.resolve;
        this.#listenerCallback = this.#handleChange.bind(this);
    }

    listenOnce(resolve) {
        this.emitter.once("change", this.stop.bind(this));
        this.start(resolve);
    }

    start(resolve) {
        this.#resolve = resolve;
        this.element.addEventListener(CHANGE_EVENT, this.#listenerCallback);
    }

    stop() {
        this.element.removeEventListener(CHANGE_EVENT, this.#listenerCallback);
    }
    
    #handleChange(event) {
        if (this.isDoneWaiting(event)) {
            this.emitter.emit("change", event);
            this.#resolve();
        }
    }

    isDoneWaiting() {
        return true;
    }
}

export default Waiter;