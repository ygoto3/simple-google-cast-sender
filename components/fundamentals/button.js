export class ButtonPrimary extends HTMLElement {

  static get template() {
    return `
      <style>
        button {
          background-color: #4284f4;
          border-radius: 4px;
          border-width: 0;
          color: #fff;
          padding: 5px 10px;
        }
      </style>
      <button><slot></slot></button>
    `;
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open',
    });
    shadow.innerHTML = ButtonPrimary.template;

    const button = shadow.querySelector('button');
    button.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      const ev = new e.constructor(e.type, e);
      this.dispatchEvent(ev);
    });
  }

}
