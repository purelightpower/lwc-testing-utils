import LightningFieldChange from "../LightningFieldChange";
import AddressParser from "../utils/AddressParser";

class LightningAddressInputChange extends LightningFieldChange {
    setValue(value) {
        let address = LightningAddressInputChange.getAddressFromValue(value);
        this.trigger(address);
    }

    static getAddressFromValue(value) {
        if (this.isAddressObject(value)) {
            return value;
        }
        return this.getAddressFromString(value);
    }

    static getAddressFromString(value) {
        if (this.isString(value)) {
            return AddressParser.parse(value);
        }
        throw new Error(`A(n) ${typeof value} cannot be converted to an address.`);
    }

    static isString(value) {
        return typeof value === "string";
    }

    static isAddressObject(value) {
        if (typeof value === "object") {
            let keys = Object.keys(value);
            return keys.includes("street") && keys.includes("city")
        }
        return false;
    }

    static objectHasAddressSchema(value) {
        let keys = Object.keys(value);
        return (
            keys.includes("street") &&
            keys.includes("city") &&
            keys.includes("province") &&
            keys.includes("postalCode") &&
            keys.includes("country")
        );
    }
}

export default LightningAddressInputChange;