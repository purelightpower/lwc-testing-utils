import LightningFieldChange from "../LightningFieldChange";

class LightningBasicFieldChange extends LightningFieldChange {
    setValue(value) {
        this.trigger({ value });
    }
}

export default LightningBasicFieldChange;