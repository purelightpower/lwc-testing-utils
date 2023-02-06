import LightningFieldChange from "../LightningFieldChange";

class LightningCheckboxChange extends LightningFieldChange {
    static CHECK = "check";
    static UNCHECK = "uncheck";

    check() {
        return this.change(LightningCheckboxChange.CHECK);
    }

    uncheck() {
        return this.change(LightningCheckboxChange.UNCHECK);
    }

    setValue(value) {
        if (LightningCheckboxChange.valueIsCheck(value)) {
            this.setAsChecked();
        } else {
            this.setAsUnchecked();
        }
    }

    static valueIsCheck(value) {
        return value === this.CHECK;
    }

    setAsChecked() {
        this.element.checked = true;
        this.trigger({ checked: true });
    }

    setAsUnchecked() {
        this.element.checked = false;
        this.trigger({ checked: false });
    }
}

export default LightningCheckboxChange;