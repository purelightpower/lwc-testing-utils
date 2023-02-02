import Waiter from "../Waiter";

class LightningInputWaiter extends Waiter {
    constructor(formParser, label) {
        super(formParser.parent);
        this.parser = formParser;
        this.label = label;
    }

    isDoneWaiting() {
        this.parser.setNestedComponents();
        return this.parser.hasLightningInput(this.label);
    }
}

export default LightningInputWaiter;