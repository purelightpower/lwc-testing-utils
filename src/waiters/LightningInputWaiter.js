import Waiter from "../Waiter";

class LightningInputWaiter extends Waiter {
    constructor(parser, formElement, inputLabel) {
        super(formElement);
        this.parser = parser;
        this.label = inputLabel;
    }

    static fromFormParser(parser, inputLabel) {
        return new LightningInputWaiter(parser, parser.parent, inputLabel);
    }

    isDoneWaiting() {
        this.parser.setNestedComponents();
        return this.parser.hasLightningInput(this.label);
    }
}

export default LightningInputWaiter;