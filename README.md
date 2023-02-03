# LWC Testing Utils

A JavaScript library with helpful functionality for testing Salesforce Lightning Web Components (LWC).

## Usage

The two main utilities in this library are the `ShadowDomParser` and the `FormChanger`.

### Shadow Dom Parser

The `ShadowDomParser` allows us to parse the lwc shadow dom for certain elements and components:

```html
<!-- hello/hello.html -->
<template>
    <div class="message">Hello World!</div>
    <c-user-profile></c-user-profile>
</template>
```

```html
 <!-- userProfile/userProfile.html -->
<template>
    <div class="userName">
        You are signed in as {user.Username}.
    </div>
    <lightning-input type="text" label="Change Username" onchange={updateUsername}></lightning-input>
    <button onclick={changeUsername}>Update</button>
    <ul class="changes">
        <template for:each={usernameChanges} for:item="change">
            <li key={change.id} class="change">
                <a href={change.url} class="change-link">
                    {change.datetime}
                </a>
            </li>
        </template>
    </ul>
</template>
```

```js
// parser.example.js
import { createElement } from "lwc";
import Hello from "c/hello";
import { ShadowDomParser } from "@purelightpower/lwc-testing-utils";

let element = createElement("c-hello", {
    is: Hello
});

let parser = new ShadowDomParser(element);

// Allows us to use it like a query selector for the top level component
let messageElement = parser.findOne(".message");

// Also allows us to use it as a query selector for elements nested in child components.
let userNameElement = parser.findOne(".userName");

// Find many elements
let changes = parser.findAll("ul.changes li.change");

// Select a lightning input
let lightningInputElement = parser.findLightningInputByLabel("Change Username");
```

### Form Changer

The form changer class allows us to change the fields in a custom lwc form.

```html
<!-- form/form.html -->
<template>
    <div class="slds-form">
        <div class="slds-form-element">
            <lightning-input
                type="text"
                label="First Name"
            ></lightning-input>
        </div>
        <div class="slds-form-element">
            <lightning-input
                type="text"
                label="Last Name"
            ></lightning-input>
        </div>
        <div class="slds-form-element">
            <lightning-input
                type="text"
                label="Nickname"
            ></lightning-input>
        </div>
        <div class="slds-form-element">
            <button onclick={submit}>
                Submit
            </button>
        </div>
    </div>
</template>
```

```js
// changer.example.js
import { createElement } from "lwc";
import Form from "c/form";
import { FormChanger } from "@purelightpower/lwc-testing-utils";

let element = createElement("c-form", {
    is: Form
});

let changer = FormChanger.fromElement(element);

// Change the value of a lightning input field
changer.changeLightningInput("First Name", "John")
    .then(() => (
        changer.changeLightningInput("Last Name", "Doe")
    ))
    .then(() => (
        changer.changeLightningInput("Nickname", "Johnny")
    ));
```

## Tools

- [Jest](https://jestjs.io/) - A JavaScript testing framework.
- [LWC](https://lwc.dev/) - Lightning web components are custom elements built using HTML and modern JavaScript.

## Contributors

- Morgan Billingsley - mbillingsley@purelightpower.com