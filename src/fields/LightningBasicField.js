import LightningBasicFieldChange from "../changes/LightningBasicFieldChange";
import LightningField from "../LightningField";

class LightningBasicField extends LightningField {
    makeChange() {
        return new LightningBasicFieldChange(this.element);
    }
}

export default LightningBasicField;