import LightningFieldChange from "../LightningFieldChange";

class LightningRadioGroupChange extends LightningFieldChange {
    setValue(value) {
        this.trigger({ value });
    }
}

export default LightningRadioGroupChange;