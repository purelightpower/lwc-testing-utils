import LightningFieldChange from "../LightningFieldChange";

class LightningInputChange extends LightningFieldChange {
    setValue(value) {
        this.element.value = value;
        this.trigger();
    }
}

export default LightningInputChange;