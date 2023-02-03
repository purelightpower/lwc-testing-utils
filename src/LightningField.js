import LightningFieldChange from "./LightningFieldChange";

class LightningField {
    constructor(element) {
        this.element = element;
    }

    makeChange() {
        return new LightningFieldChange(this.element);
    }

    changeTo(value) {
        let change = this.makeChange();
        return change.change(value);
    }
}

export default LightningField;