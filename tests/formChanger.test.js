import { createElement } from "lwc";
import SignupForm from "c/signupForm";
import FormChanger from "../src/FormChanger";

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
    }

    it("Check a checkbox", () => {
        return changer
            .checkLightningCheckboxInput("Send me mail")
            .then(() => checkboxIsChecked("Send me mail"));
    });
});
