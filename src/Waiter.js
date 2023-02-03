import EventEmitter from "events";

const CHANGE_EVENT = "change";

class Waiter {
    #resolve;

    constructor(element) {
        this.emitter = new EventEmitter();
        this.element = element;
        this.#resolve = Promise.resolve;
        this.handleChange = this.handleChange.bind(this);
    }

    listenOnce(resolve) {
        this.emitter.once("change", this.stop.bind(this));
        this.start(resolve);
    }

    start(resolve) {
        this.#resolve = resolve;
        this.element.addEventListener(CHANGE_EVENT, this.handleChange);
    }

    stop() {
        this.element.removeEventListener(CHANGE_EVENT, this.handleChange);
    }
    
    handleChange(event) {
        setTimeout(() => {
            if (this.isDoneWaiting(event)) {
                this.emitter.emit("change", event);
                this.#resolve();
            }
        }, 0);
    }

    isDoneWaiting() {
        return true;
    }
}

export default Waiter;