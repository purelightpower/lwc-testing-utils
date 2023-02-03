import LightningRadioGroupChange from "../changes/LightningRadioGroupChange";
import LightningField from "../LightningField";

class LightningRadioGroup extends LightningField {
    makeChange() {
        return new LightningRadioGroupChange(this.element);
    }
}

export default LightningRadioGroup;