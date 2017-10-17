export class Header extends HTMLElement {

  static get template() {
    return `
      <style>
        :host {
          background-color: #4284f4;
          display: block;
          padding: 10px;
          box-shadow: 0 1px 1px rgba(0,0,0,0.3);
        }
      </style>

      <slot></slot>
    `;
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open',
    }).innerHTML = Header.template;
  }

}
