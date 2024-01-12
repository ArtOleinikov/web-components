import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators.js";

import { getCookieValue, parseCookie } from "./cookieService";

@customElement("lit-btn")
export class LitBtn extends LitElement {
  @property({ type: String }) exampleValue = "default value";
  @property({ type: String }) products = '[]';

  async addToCart() {
    const lansaCart = await this.addToLansaCart();
    const customEvent = new CustomEvent("addedToCart", {
      bubbles: true,
      composed: true,
      detail: lansaCart,
    });

    this.dispatchEvent(customEvent);
  }

  private async addToLansaCart() {
    const C_SESSION = getCookieValue("C_SESSION");
    const variables = {
      addToCartData: {
        data: JSON.parse(this.products),
        cookie: C_SESSION ? `C_SESSION=${C_SESSION};` : "",
      },
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{
        "query": "mutation wAddToCart($addToCartData: Object!) { wAddToCart(addToCartData: $addToCartData) }",
        "operationName": "wAddToCart",
        "variables": ${JSON.stringify(variables)} 
      }`,
    };

    const resp = await fetch("https://api.wiley.dev.viax.io/graphql", options);
    const json = await resp.json();

    this.updateCookie(json.data.wAddToCart.cookie);

    return json;
  }

  private updateCookie(cookie: string) {
    const data = parseCookie(cookie);
    const C_SESSION = data.C_SESSION;
    document.cookie = `C_SESSION=${C_SESSION}; Secure; Samesite=None`;
  }

  render() {
    console.log('Render');
    
    document.addEventListener('cart:setProducts', (event) => {
      // @ts-ignore
      console.log('cart:setProducts', event.detail);
      // @ts-ignore
      this.products = event.detail[0]
    })

    return html`
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
          integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
          crossorigin="anonymous"
        ></script>
      </head>
      <button class="btn btn-primary btn-custom" @click=${this.addToCart}>
        <slot name="title">Default Title</slot>, type: ${this.exampleValue}
      </button>
    `;
  }

  static styles = css`
    .btn-custom {
      font-size: 24px;
      background: var(--bg-btn, inherit);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-btn": LitBtn;
  }
}

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'lit-btn': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { /* additional props here */ };
//     }
//   }
// }

// export const LitButtonReactComponent = createComponent({
//   tagName: 'lit-btn',
//   elementClass: LitBtn,
//   react: React,
//   events: {
//     exampleEvent: 'example-event'
//   },
// });
