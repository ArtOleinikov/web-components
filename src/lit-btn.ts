import { LitElement, html, css } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from "lit/decorators.js";
import { createComponent } from '@lit/react';
import React from "react";

@customElement('lit-btn')
export class LitBtn extends LitElement {
  @property({ type: String }) exampleValue = 'default value';

  completedEvent() {
    const customEvent = new CustomEvent('example-event', {
      bubbles: true,
      composed: true,
      detail: this.exampleValue
    });
    this.dispatchEvent(customEvent);
  }

  render() {
    return html`
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
      </head>
      <button class="btn btn-primary btn-custom" @click=${this.completedEvent}>
        <slot name="title">Default Title</slot>, type: ${this.exampleValue}
      </button>
    `;
  }

  static styles = css`
    .btn-custom {
      font-size: 24px;
      background: var(--bg-btn, inherit)
    }
  `;
}


declare global {
  interface HTMLElementTagNameMap {
    'lit-btn': LitBtn
  }
}

export const LitButtonReactComponent = createComponent({
  tagName: 'lit-btn',
  elementClass: LitBtn,
  react: React,
  events: {
    exampleEvent: 'example-event'
  },
});
