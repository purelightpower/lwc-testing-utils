import Waiter from "./Waiter";

const CHANGE_EVENT = "change";

class FormLightningInputChange {
    constructor(formParser, element) {
        this.formParser = formParser;
        this.element = element;
        this.waiter = new Waiter(element);
    }

    waitForLightningInputToAppearAfterChange(label) {
        this.waiter = new LightningInputWaiter(this.formParser, label);
        return this;
    }

    changeTo(value) {
        return new Promise((resolve) => {
            this.waiter.listenOnce(resolve);
            this.setValue(value);
        });
    }

    setValue(value) {
        this.element.value = value;
        this.triggerChangeEvent();
    }

    triggerChangeEvent() {
        let event = FormLightningInputChange.getChangeEvent();
        this.element.dispatchEvent(event);
    }

    static getChangeEvent(detail = null) {
        if (detail) {
            return new CustomEvent(CHANGE_EVENT, { detail });
        }
        return new CustomEvent(CHANGE_EVENT);
    }
}

export default FormLightningInputChange;