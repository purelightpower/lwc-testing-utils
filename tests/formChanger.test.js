import { createElement } from "lwc";
import SignupForm from "c/signupForm";
import SignupCard from "c/signupCard";
import FormChanger from "../src/FormChanger";
import AddressParser from "../src/utils/AddressParser";
import LightningInputWaiter from "../src/waiters/LightningInputWaiter";
import LightningAddressInputWaiter from "../src/waiters/LightningAddressInputWaiter";
import LightningCheckboxChange from "../src/changes/LightningCheckboxInputChange";

const WHITE_HOUSE = "1600 Pennsylvania Ave NW, Washington, DC 20500, US";

describe("FormChanger standard tests", () => {
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
        let address = AddressParser.parse(addressString);
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

    let whenPremiumPlanIsSelected = () => {
        let waiter = LightningInputWaiter.fromFormParser(changer.parser, "Billing address is same as home address");
        return changer
            .getLightningRadioGroupField("Plan")
            .makeChange()
            .waitForAfterChange(waiter)
            .change("premium");
    };

    let comboboxValueEquals = (label, value) => {
        let element = changer.parser.findLightningCombobox(label);
        expect(element.value).toBe(value);
    }

    it("Set combobox value", () => {
        return changer
            .changeLightningCombobox("Gender", "male")
            .then(() => comboboxValueEquals("Gender", "male"));
    });

    let thenInputAppeared = (label) => {
        let field = changer.getLightningInputField(label);
        expect(field.element.tagName.toLowerCase()).toBe("lightning-input");
        expect(field.element.label).toBe(label);
    }

    it("Wait for element to appear after change", () => {
        return whenPremiumPlanIsSelected()
            .then(() => thenInputAppeared("Billing address is same as home address"));
    });

    let whenBillingAddressIsDifferent = () => {
        let waiter = LightningAddressInputWaiter.fromFormParser(changer.parser, "Billing Address");
        return changer
            .getLightningCheckboxInputField("Billing address is same as home address")
            .makeChange()
            .waitForAfterChange(waiter)
            .change(LightningCheckboxChange.UNCHECK);
    }

    let thenAddressInputAppeared = (label) => {
        let field = changer.getAddressInputField(label);
        expect(field.element.tagName.toLowerCase()).toBe("lightning-input-address");
        expect(field.element.addressLabel).toBe(label);
    }

    it("Wait for address input to appear after change", () => {
        return whenPremiumPlanIsSelected()
            .then(() => whenBillingAddressIsDifferent())
            .then(() => thenAddressInputAppeared("Billing Address"));
    });
});

describe("FormChanger nested form tests", () => {
    let parent;

    beforeEach(() => {
        parent = createElement("c-signup-card", {
            is: SignupCard,
        });
        document.body.appendChild(parent);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        parent = null;
    });

    it("Can find nested form", () => {
        let changer = FormChanger.fromParentTemplate(parent);

        expect(changer.parser.parent.tagName.toLowerCase()).toBe("c-signup-form");
        expect(changer.parser.parent.parentNode.parentNode.host.tagName.toLowerCase()).toBe("c-signup-card");
    });
});
