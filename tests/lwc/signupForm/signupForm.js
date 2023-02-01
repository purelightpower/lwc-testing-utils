import { LightningElement } from "lwc";

export default class SignupForm extends LightningElement {
    sendMail = false;
    plans = [{ label: "Free", value: "free" }, { label: "Premium", value: "premium" }];
    plan = "";

    handleMailChange(event) {
        this.sendMail = event.detail.checked;
    }

    handlePlanChange(event) {
        this.plan = event.detail.value;
    }

    get isPaid() {
        return this.plan === "premium";
    }
}