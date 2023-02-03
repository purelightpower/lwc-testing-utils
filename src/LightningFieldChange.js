import Waiter from "./Waiter";

class LightningFieldChange {
    static EVENT_NAME = "change";

    constructor(element) {
        this.element = element;
        this.waiter = new Waiter(element);
    }

    change(value) {
        return new Promise((resolve) => {
            this.waiter.listenOnce(resolve);
            this.setValue(value);
        });
    }

    trigger(detail = null) {
        let event = LightningFieldChange.getDomEvent(detail);
        this.element.dispatchEvent(event);
    }

    static getDomEvent(detail = null) {
        if (detail) {
            return new CustomEvent(this.EVENT_NAME, { detail });
        }
        return new CustomEvent(this.EVENT_NAME);
    }

    waitForAfterChange(waiter) {
        this.waiter = waiter;
        return this;
    }
}

export default LightningFieldChange;