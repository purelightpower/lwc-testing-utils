import { createElement } from "lwc";
import SignupForm from "c/signupForm";
import FormChanger from "../src/FormChanger";

const WHITE_HOUSE = "1600 Pennsylvania Ave NW, Washington, DC 20500, US";

describe("FormChanger tests", () => {
    let changer;

    beforeEach(() => {
        let element = createElement("c-signup-form", {
            is: SignupForm,
        });
        document.body.appendChild(element);
        changer = FormChanger.fromElement(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        changer = null;
    });

    let inputValueEquals = (label, value) => {
        let inputElement = changer.parser.findLightningInputByLabel(label);
        expect(inputElement.value).toBe(value);
    };

    it("Set value of input", () => {
        return changer
            .changeLightningInput("First Name", "John")
            .then(() => inputValueEquals("First Name", "John"));
    });

    let checkboxIsChecked = (label) => {
        let inputElement = changer.parser.findLightningInputByLabel(label);
        expect(inputElement.checked).toBeTruthy();
    };

    let checkboxIsUnchecked = (label) => {
        let inputElement = changer.parser.findLightningInputByLabel(label);
        expect(inputElement.checked).toBeFalsy();
    };

    it("Check and uncheck a checkbox", () => {
        return changer
            .checkLightningCheckboxInput("Send me mail")
            .then(() => checkboxIsChecked("Send me mail"))
            .then(() => changer.uncheckLightningCheckboxInput("Send me mail"))
            .then(() => checkboxIsUnchecked("Send me mail"));
    });

    let radioGroupValueIs = (label, value) => {
        let radioGroupElement =
            changer.parser.findLightningRadioGroupByLabel(label);
        expect(radioGroupElement.value).toBe(value);
    };

    it("Change a radio group input", () => {
        return changer
            .changeLightningRadioGroup("Plan", "free")
            .then(() => radioGroupValueIs("Plan", "free"));
    });

    let addressValueIs = (label, addressString) => {
        let inputElement = changer.parser.findLightningAddressInput(label);
        let address = FormChanger.getAddressFromString(addressString);
        expect(inputElement.street).toBe(address.street);
        expect(inputElement.city).toBe(address.city);
        expect(inputElement.province).toBe(address.province);
        expect(inputElement.postalCode).toBe(address.postalCode);
        expect(inputElement.country).toBe(address.country);
    }

    it("Set address input", () => {
        return changer
            .changeLightningAddressInput("Home Address", WHITE_HOUSE)
            .then(() => addressValueIs("Home Address", WHITE_HOUSE));
    });
});
