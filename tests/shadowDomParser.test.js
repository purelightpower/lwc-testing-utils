import { createElement } from "lwc";
import HelloWorld from "c/helloWorld";
import ShadowDomParser from "../src/ShadowDomParser";

describe("ShadowDomParser tests", () => {
    let parser;

    beforeEach(() => {
        let element = createElement("c-hello-world", {
            is: HelloWorld,
        });
        document.body.appendChild(element);
        parser = new ShadowDomParser(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        parser = null;
    });

    it("Find an immediate child by query selector", () => {
        let child = parser.findOne(".title");

        expect(child.textContent).toBe("Hello World!");
    });

    it("Find many in immediate children", () => {
        let children = parser.findAll(".updates > li");

        expect(children).toHaveLength(3);
    });

    it("Find a child of a nested component", () => {
        let child = parser.findOne(".posts");

        expect(child.tagName).toBe("UL");
        expect(child.parentNode.host.tagName).toBe("C-POST-LIST");
    });

    it("Find many children of a nested component", () => {
        let children = parser.findAll(".posts > li");

        expect(children).toHaveLength(3);
    });
});
