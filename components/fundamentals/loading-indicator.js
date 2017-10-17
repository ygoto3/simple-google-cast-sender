export class LoadingIndicator extends HTMLElement {

  static get template() {
    return `
      <style>
        div {
          animation: rotate 800ms linear infinite;
          border-radius: 50%;
          border: 4px solid #000;
          border-bottom-color: transparent;
          display: inline-block;
          height: 20px;
          width: 20px;
        }
        @keyframes rotate {
          0% { transform: rotateZ(0deg) }
          100% { transform: rotateZ(360deg) }
        }
      </style>

      <div></div>
    `;
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open',
    }).innerHTML = LoadingIndicator.template;
  }

}
