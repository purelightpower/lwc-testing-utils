import LightningAddressInput from "./fields/LightningAddressInput";
import LightningCheckboxInput from "./fields/LightningCheckboxInput";
import LightningInput from "./fields/LightningInput";
import LightningRadioGroup from "./fields/LightningRadioGroup";
import ShadowDomParser from "./ShadowDomParser";

class FormChanger {
    constructor(parser) {
        this.parser = parser;
    }

    static fromElement(element) {
        let parser = new ShadowDomParser(element);
        return new FormChanger(parser);
    }

    static fromParentTemplate(parent) {
        let parser = new ShadowDomParser(parent);
        let formElement = parser.findFormElement();
        return FormChanger.fromElement(formElement);
    }

    changeLightningInput(label, value) {
        let field = this.getLightningInputField(label);
        return field.changeTo(value);
    }

    getLightningInputField(label) {
        let element = this.parser.findLightningInputByLabel(label);
        return new LightningInput(element);
    }

    changeLightningRadioGroup(label, value) {
        let field = this.getLightningRadioGroupField(label);
        return field.changeTo(value);
    }

    getLightningRadioGroupField(label) {
        let element = this.parser.findLightningRadioGroupByLabel(label);
        return new LightningRadioGroup(element);
    }

    changeElementValue(element, value) {
        element.value = value;
        let changeEvent = FormChanger.getChangeEvent();
        return FormChanger.triggerEvent(element, changeEvent);
    }

    changeLightningAddressInput(label, addressString) {
        let field = this.getAddressInputField(label);
        return field.changeTo(addressString);
    }

    getAddressInputField(label) {
        let element = this.parser.findLightningAddressInput(label);
        return new LightningAddressInput(element);
    }

    checkLightningCheckboxInput(label) {
        let field = this.getLightningCheckboxInputField(label);
        return field.check();
    }

    uncheckLightningCheckboxInput(label) {
        let field = this.getLightningCheckboxInputField(label);
        return field.uncheck();
    }

    getLightningCheckboxInputField(label) {
        let element = this.parser.findLightningInputByLabel(label);
        return new LightningCheckboxInput(element);
    }

    static triggerEvent(element, event) {
        let promise = FormChanger.createListenerPromise(element, event.type);
        element.dispatchEvent(event);
        return promise;
    }

    static createListenerPromise(element, event) {
        return new Promise((resolve) => {
            let callback = () => {
                element.removeEventListener(event, callback);
                resolve();
            };
            element.addEventListener(event, callback);
        });
    }

    static getChangeEvent(detail = null) {
        if (detail) {
            return new CustomEvent("change", { detail });
        }
        return new CustomEvent("change");
    }

    static getCheckboxCheckedEvent() {
        return new CustomEvent("change", { detail: { checked: true } });
    }

    static getCheckboxNotCheckedEvent() {
        return new CustomEvent("change", { detail: { checked: false } });
    }

    static getAddressFromString(addressString) {
        let parts = addressString.split(", ");
        let [province, postalCode] = parts[2].split(" ");
        return {
            street: parts[0],
            city: parts[1],
            province,
            postalCode,
            country: parts[3],
        };
    }
}

export default FormChanger;
