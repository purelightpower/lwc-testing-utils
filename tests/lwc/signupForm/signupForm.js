import { LightningElement } from "lwc";

export default class SignupForm extends LightningElement {
    home = {
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
    };
    sendMail = false;
    plans = [
        { label: "Free", value: "free" },
        { label: "Premium", value: "premium" },
    ];
    plan = "";
    billingAddressIsSame = true;
    billing = {
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
    };
    genders = [
        {
            label: "Male",
            value: "male",
        },
        {
            label: "Female",
            value: "female",
        },
        {
            label: "Prefer not to say",
            value: "private",
        },
    ];
    gender = "";

    handleHomeChange(event) {
        this.home = event.detail;
        this.triggerChange();
    }

    handleMailChange(event) {
        this.sendMail = event.detail.checked;
        this.triggerChange();
    }

    handlePlanChange(event) {
        this.plan = event.detail.value;
        this.triggerChange();
    }

    handleBillingAddressIsSameChange(event) {
        this.billingAddressIsSame = event.detail.checked;
        this.triggerChange();
    }

    handleBillingChange(event) {
        this.billing = event.detail;
        this.triggerChange();
    }

    handleGenderChange(event) {
        this.gender = event.detail.value;
        this.triggerChange();
    }

    get isPaid() {
        return this.plan === "premium";
    }

    triggerChange() {
        let event = new CustomEvent("change");
        this.dispatchEvent(event);
    }
}
