class ShadowDomParser {
    constructor(parent) {
        this.parent = parent;
    }

    findOne(selector) {
            return this.findOneInImmediateChildren(selector);
    }

    findOneInImmediateChildren(selector) {
        let element = this.parent.shadowRoot.querySelector(selector);
        if (element) {
            return element;
        }
        throw new Error(`No element with a the ${selector} selector could be found in any of the component's immediate children.`);
    }

}

export default ShadowDomParser;