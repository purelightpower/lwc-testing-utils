import LightningAddressInputChange from "../changes/LightningAddressInputChange";
import LightningField from "../LightningField";

class LightningAddressInput extends LightningField {
    makeChange() {
        return new LightningAddressInputChange(this.element);
    }
}

export default LightningAddressInput;