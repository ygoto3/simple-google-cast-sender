export class TextBox extends HTMLElement {
  static get cssTemplate() {
    return `
      <style>
        input, textarea {
          box-sizing: border-box;
          border: 1px solid #aaa;
          width: inherit;
        }
      </style>
    `;
  }

  static get onelineTemplate() {
    return `
      <input type="text"></input>
    `;
  }

  static get multilineTemplate() {
    return `
      <textarea></textarea>
    `;
  }

  get value() {
    return this.inputText.value;
  }

  set value(v) {
    this.inputText.value = v;
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open',
    })
    const multiline = this.getAttribute('rows') !== null;

    var template = TextBox.cssTemplate;
    if (multiline) {
      template += TextBox.multilineTemplate;
    } else {
      template += TextBox.onelineTemplate;
    }
    shadow.innerHTML = template;

    if (multiline) {
      this.inputText = shadow.querySelector('textarea');
      this.addAttributes(['rows', 'cols']);
    } else {
      this.inputText = shadow.querySelector('input');
    }
  }

  addAttributes(attrs) {
    attrs
    .filter(a => !!this.getAttribute(a))
    .forEach(a => {
      this.inputText.setAttribute(a, this.getAttribute(a));
    });
  }

}
