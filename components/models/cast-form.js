export class CastForm extends HTMLElement {

  static get template() {
    return `
      <style>
        :host {
          padding: 10px;
        }
        label {
          color: #777;
          font-size: .8em;
        }
        .full-w {
          width: 100%;
        }
        .row + .row {
          margin-top: 10px;
        }
      </style>

      <form>
        <div class="row">
          <label for="content-id">Content ID: </label>
          <text-box id="content-id" class="full-w"></text-box>
        </div>
        <div class="row">
          <label for="custom-data">Custom Data: </label>
          <text-box id="custom-data" class="full-w" rows="5"></text-box>
        </div>
        <div class="row">
          <button-primary>Cast</button-primary>
        </div>
      </form>
    `;
  }

  get value() {
    return {
      contentId: this.textBoxContentId.value,
      customData: JSON.parse(this.textBoxCustomData.value),
    }
  }

  set value(data) {
    this.textBoxContentId.value = data.contentId;
    this.textBoxCustomData.value = JSON.stringify(data.customData);
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'open',
    })
    shadow.innerHTML = CastForm.template;

    this.textBoxContentId = shadow.querySelector('text-box');
    this.textBoxCustomData = shadow.querySelector('#custom-data');

    const button = shadow.querySelector('button-primary');
    button.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      const ev = new e.constructor('cast', e);
      ev.data = this.value;
      this.dispatchEvent(ev);
    });
  }

}
