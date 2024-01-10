# Custom Button Components

This document describes two approaches to creating custom button components: one using vanilla JavaScript with Web Components (`JsBtn`) and the other using Lit (`LitBtn`).

## JsBtn Component (Vanilla Web Components)

[example](src%2Fjs-btn.js)

`JsBtn` is a standard Web Component using the native Custom Elements API. It demonstrates several key concepts:

- **Shadow DOM**: Uses Shadow DOM for encapsulation.
- **Attribute Observation**: Observes and reacts to changes in the `exampleValue` attribute.
- **Event Handling**: Dispatches a custom event (`example-event`) when clicked.
- **Lifecycle Callbacks**: Sets up and cleans up event listeners in lifecycle callbacks.
- **Dynamic Rendering**: Updates the button's inner HTML to reflect changes in `exampleValue`.

## LitBtn Component (Lit)

[example](src%2Flit-btn.ts)

`LitBtn` is built using Lit, a library for building fast, lightweight web components:

- **Property Declaration**: Uses the `@property` decorator for reactive properties (`exampleValue`).
- **Event Dispatching**: Dispatches a custom event upon button click (`example-event`).
- **Templating**: Utilizes Lit's `html` tag for templating.
- **Styling**: Demonstrates scoped styling with Lit's `css` tag.
- **Simplicity and Reactivity**: Offers a more concise and maintainable component structure.

```cmd
 npm i @lit/react react @types/react
```
