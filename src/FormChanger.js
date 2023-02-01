import ShadowDomParser from "./ShadowDomParser";

class FormChanger {
    constructor(parser) {
        this.parser = parser;
    }

    static fromElement(element) {
        let parser = new ShadowDomParser(element);
        return new FormChanger(parser);
    }

    changeLightningInput(label, value) {
        let field = this.parser.findLightningInputByLabel(label);
        return this.changeElementValue(field, value);
    }

    changeElementValue(element, value) {
        element.value = value;
        let changeEvent = FormChanger.getChangeEvent();
        return FormChanger.triggerEvent(element, changeEvent);
    }

    checkLightningCheckboxInput(label) {
        let field = this.parser.findLightningInputByLabel(label);
        field.checked = true;
        let event = FormChanger.getCheckboxCheckedEvent();
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
}

export default FormChanger;
