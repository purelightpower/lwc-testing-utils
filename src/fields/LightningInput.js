import LightningInputChange from "../changes/LightningInputChange";
import LightningField from "../LightningField";

class LightningInput extends LightningField {
    makeChange() {
        return new LightningInputChange(this.element);
    }
}

export default LightningInput;