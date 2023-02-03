import LightningField from "../LightningField";

class LightningRadioGroup extends LightningField {
    makeChange() {
        return new LightningRadioGroup(this.element);
    }
}

export default LightningRadioGroup;