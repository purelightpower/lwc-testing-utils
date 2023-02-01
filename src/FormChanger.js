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

    static triggerEvent(element, event) {
        let promise = FormChanger.createListenerPromise(element, event.type);
        element.dispatchEvent(event);
        return promise;
    }

    static getChangeEvent(detail = null) {
        if (detail) {
            return new CustomEvent("change", { detail });
        }
        return new CustomEvent("change");
    }
}

export default FormChanger;
