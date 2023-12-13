import { LitElement, html, css } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement } from "lit/decorators.js";
import { createComponent } from '@lit/react';
import React from "react";

@customElement('lit-btn')
export class LitBtn extends LitElement {
  @property({ type: String }) exampleValue =  'default value'


  completedEvent() {
    const customEvent = new CustomEvent('example-event', { bubbles: true, composed: true, detail: this.exampleValue })
    this.dispatchEvent(customEvent);
  }

  protected render() {
    return html`
    <button @click=${this.completedEvent}><slot name="title">Default Title,</slot> type: ${this.exampleValue}</button>`
  }

  static styles = css`
    button {
      background: var(--bg-btn, #646cff)
    }
  `
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
