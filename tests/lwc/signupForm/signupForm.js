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
    plans = [{ label: "Free", value: "free" }, { label: "Premium", value: "premium" }];
    plan = "";
    billingAddressIsSame = true;
    billing = {
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
    };

    handleHomeChange(event) {
        this.home = event.detail;
    }

    handleMailChange(event) {
        this.sendMail = event.detail.checked;
    }

    handlePlanChange(event) {
        this.plan = event.detail.value;
    }

    handleBillingAddressIsSameChange(event) {
        this.billingAddressIsSame = event.detail.checked;
    }

    handleBillingChange(event) {
        this.billing = event.detail;
    }

    get isPaid() {
        return this.plan === "premium";
    }
}