const ALL_CHILDREN = "*";
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
