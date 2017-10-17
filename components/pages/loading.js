export class LoadingPage extends HTMLElement {

  static get template() {
    return `
      <style>
        dialog {
          background-color: #fff;
          border: none;
          box-sizing: border-box;
          height: 100%;
          width: 100%;
        }
        div {
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      </style>

      <dialog open>
        <div>
          <loading-indicator></loading-indicator>
        </div>
      </dialog>
    `;
  }

  connectedCallback() {
    this.style.height = '100%';
    this.attachShadow({
      mode: 'closed',
    }).innerHTML = LoadingPage.template;
  }

}
