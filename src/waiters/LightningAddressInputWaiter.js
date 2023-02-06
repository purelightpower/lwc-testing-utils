import Waiter from "../Waiter";

class LightningAddressInputWaiter extends Waiter {
    constructor(parser, formElement, inputLabel) {
        super(formElement);
        this.parser = parser;
        this.label = inputLabel;
    }

    static fromFormParser(parser, inputLabel) {
        return new LightningAddressInputWaiter(parser, parser.parent, inputLabel);
    }

    isDoneWaiting() {
        this.parser.setNestedComponents();
        return this.parser.hasLightningAddressInput(this.label);
    }
}

export default LightningAddressInputWaiter;