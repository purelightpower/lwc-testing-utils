const ALL_CHILDREN = "*";
const LIGHTNING_INPUT = "lightning-input";
const LIGHTNING_RADIO_GROUP = "lightning-radio-group";
const LIGHTNING_ADDRESS_INPUT = "lightning-input-address";

class ShadowDomParser {
    constructor(parent) {
        this.parent = parent;
        this.nestedComponents = [];
    }

    findOne(selector) {
        try {
            return this.findOneInImmediateChildren(selector);
        } catch (_) {
            return this.findOneInNestedComponents(selector);
        }
    }

    findAll(selector) {
        let fromParent = this.findAllInParent(selector);
        let fromNested = this.findAllInNested(selector);
        return [...fromParent, ...fromNested];
    }

    findLightningInputByLabel(label) {
        return this.findByLabel(label, LIGHTNING_INPUT);
    }

    findLightningRadioGroupByLabel(label) {
        return this.findByLabel(label, LIGHTNING_RADIO_GROUP);
    }

    findLightningAddressInput(label) {
        let elements = this.findAll(LIGHTNING_ADDRESS_INPUT);
        for (let element of elements) {
            if (element.addressLabel && element.addressLabel === label) {
                return element;
            }
        }
        throw new Error(
            `No ${LIGHTNING_ADDRESS_INPUT} element labeled ${label} was found in the dom.`
        );
    }

    findByLabel(label, selector) {
        let elements = this.findAll(selector);
        for (let element of elements) {
            if (element.label === label) {
                return element;
            }
        }
        throw new Error(
            `No ${selector} element labeled ${label} was found in the dom.`
        );
    }

    findOneInImmediateChildren(selector) {
        let element = this.parent.shadowRoot.querySelector(selector);
        if (element) {
            return element;
        }
        throw new Error(
            `No element with a the ${selector} selector could be found in any of the component's immediate children.`
        );
    }

    findOneInNestedComponents(selector) {
        this.conditionallySetNestedComponents();
        for (let component of this.nestedComponents) {
            try {
                return component.findOne(selector);
            } catch (_) {
                /** */
            }
        }
        throw new Error(
            `No element with a the ${selector} selector could be found.`
        );
    }

    findAllInParent(selector) {
        let nodes = this.parent.shadowRoot.querySelectorAll(selector);
        return Array.from(nodes);
    }

    findAllInNested(selector) {
        this.conditionallySetNestedComponents();
        let elements = [];
        for (let component of this.nestedComponents) {
            let children = component.findAll(selector);
            elements.push(...children);
        }
        return elements;
    }

    conditionallySetNestedComponents() {
        if (this.nestedComponents.length < 1) {
            this.setNestedComponents();
        }
    }

    setNestedComponents() {
        this.nestedComponents = [];
        let children = this.getChildren();
        this.setNestedComponentsFromChildren(children);
    }

    getChildren() {
        return this.parent.shadowRoot.querySelectorAll(ALL_CHILDREN);
    }

    setNestedComponentsFromChildren(children) {
        for (let child of children) {
            if (ShadowDomParser.isCustomComponent(child)) {
                let parser = new ShadowDomParser(child);
                this.nestedComponents.push(parser);
            }
        }
    }

    static isCustomComponent(element) {
        let lowerCaseTagName = element.tagName.toLowerCase();
        return lowerCaseTagName.startsWith("c-");
    }

}

export default ShadowDomParser;
