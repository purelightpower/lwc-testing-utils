import LightningCheckboxInputChange from "../changes/LightningCheckboxInputChange";
import LightningField from "../LightningField";

class LightningCheckboxInput extends LightningField {
    makeChange() {
        return new LightningCheckboxInputChange(this.element);
    }

    check() {
        return this.changeTo(LightningCheckboxInputChange.CHECK);
    }

    uncheck() {
        return this.changeTo(LightningCheckboxInputChange.UNCHECK);
    }
}

export default LightningCheckboxInput;