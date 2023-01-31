import { createElement } from "lwc";
import HelloWorld from "c/helloWorld";

describe("Basic hello world test", () => {
    let element;

    beforeEach(() => {
        element = createElement("c-hello-world", {
            is: HelloWorld,
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it("Has div", () => {
        let div = element.shadowRoot.querySelector("div");

        expect(div.tagName).toBe("DIV");
    });
});
