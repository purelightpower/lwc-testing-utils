import { createElement } from "lwc";
import HelloWorld from "c/helloWorld";
import ShadowDomParser from "../src/ShadowDomParser";

describe("ShadowDomParser tests", () => {
    let parser;

    beforeEach(() => {
        let element = createElement("c-hello-world", {
            is: HelloWorld
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
});