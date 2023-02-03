import Waiter from "../Waiter";

class LightningInputWaiter extends Waiter {
    constructor(parser, formElement, inputLabel) {
        super(formElement);
        this.parser = parser;
        this.label = inputLabel;
    }

    fromFormParser(parser, inputLabel) {
        return new LightningInputWaiter(parser, parser.parent, inputLabel);
    }

    isDoneWaiting() {
        this.parser.setNestedComponents();
        return this.parser.hasLightningInput(this.label);
    }
}

export default LightningInputWaiter;