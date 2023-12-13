class JsBtn extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.exampleValue = this.getAttribute('exampleValue');
  }
  
  static get observedAttributes() {
    return ["exampleValue"];
  }
  
  connectedCallback() {
    this.render();
    // this.shadowRoot.querySelector('button').addEventListener('click', () => this.completedEvent());
  }
  
  disconnectedCallback() {
    // this.shadowRoot.querySelector('button').removeEventListener('click', () => this.completedEvent());
  }
  
  get exampleValue() {
    return this.getAttribute("exampleValue");
  }
  
  set exampleValue(value) {
    this.setAttribute("exampleValue", value);
    this.render();
  }
  
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'exampleValue' && oldValue !== newValue) {
      this.exampleValue = newValue;
      this.render();
    }
  }
  
  completedEvent() {
    const customEvent = new CustomEvent('example-event', {
      bubbles: true,
      composed: true,
      detail: this.exampleValue
    });
    this.dispatchEvent(customEvent);
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: var(--bg-btn, #646cff);
        }
      </style>
      <button type="${this.exampleValue}" class="btn btn-primary" onclick="this.getRootNode().host.completedEvent()">
        <slot name="title">Default Title</slot>, type: ${this.exampleValue}
      </button>
    `;
  }
}

window.customElements.define('js-btn', JsBtn);
