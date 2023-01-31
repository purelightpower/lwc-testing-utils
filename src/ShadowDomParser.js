class ShadowDomParser {
    constructor(parent) {
        this.parent = parent;
    }

    findOne(selector) {
            return this.findOneInImmediateChildren(selector);
    }

    findAll(selector) {
        let fromParent = this.findAllInParent(selector);
        return fromParent;
    }

    findOneInImmediateChildren(selector) {
        let element = this.parent.shadowRoot.querySelector(selector);
        if (element) {
            return element;
        }
    }

    findAllInParent(selector) {
        let nodes = this.parent.shadowRoot.querySelectorAll(selector);
        return Array.from(nodes);
    }

}

export default ShadowDomParser;