import LightningCheckboxInputChange from "../changes/LightningCheckboxInputChange";
import LightningField from "../LightningField";

class LightningCheckboxInput extends LightningField {
    makeChange() {
        return new LightningCheckboxInputChange(this.element);
    }
}

export default LightningCheckboxInput;