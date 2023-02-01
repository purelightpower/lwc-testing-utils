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
        let field = this.parser.findLightningInputByLabel(label);
        return this.changeElementValue(field, value);
    }

    changeLightningRadioGroup(label, value) {
        let field = this.parser.findLightningRadioGroupByLabel(label);
        let changeEvent = FormChanger.getChangeEvent({ value });
        return FormChanger.triggerEvent(field, changeEvent);
    }

    changeElementValue(element, value) {
        element.value = value;
        let changeEvent = FormChanger.getChangeEvent();
        return FormChanger.triggerEvent(element, changeEvent);
    }

    changeLightningAddressInput(label, addressString) {
        let field = this.parser.findLightningAddressInput(label);
        let address = FormChanger.getAddressFromString(addressString);
        let changeEvent = FormChanger.getChangeEvent(address);
        return FormChanger.triggerEvent(field, changeEvent);
    }

    checkLightningCheckboxInput(label) {
        let field = this.parser.findLightningInputByLabel(label);
        field.checked = true;
        let event = FormChanger.getCheckboxCheckedEvent();
        return FormChanger.triggerEvent(field, event);
    }

    uncheckLightningCheckboxInput(label) {
        let field = this.parser.findLightningInputByLabel(label);
        field.checked = false;
        let event = FormChanger.getCheckboxNotCheckedEvent();
        return FormChanger.triggerEvent(field, event);
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
