import LightningAddressInput from "./fields/LightningAddressInput";
import LightningCheckboxInput from "./fields/LightningCheckboxInput";
import LightningInput from "./fields/LightningInput";
import LightningBasicField from "./fields/LightningBasicField";
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
        return new LightningBasicField(element);
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

    changeLightningCombobox(label, value) {
        let field = this.getLightningComboboxField(label);
        return field.changeTo(value);
    }

    getLightningComboboxField(label) {
        let element = this.parser.findLightningCombobox(label);
        return new LightningBasicField(element);
    }
}

export default FormChanger;
