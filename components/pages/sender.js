import { Cast } from '/cast/index.js';
import storage from '/utils/storage.js';

export class SenderPage extends HTMLElement {

  static get template() {
    return `
      <style>
        .hidden {
          display: none;
          visibility: hidden;
        }

        .cast-wrapper {
          text-align: right;
        }

        .cast-button {
          width: 30px;
        }

        .header {
          display: flex;
        }

        .button-wrapper {
          text-align: right;
        }

        .flex-1 {
          flex: 1;
        }

        #controller {
          box-sizing: border-box;
          padding: 0 10px;
        }

        h1 {
          color: #fff;
          font-size: 1em;
          margin: 0;
          transform: translateY(2px);
        }
      </style>

      <app-header class="cast-wrapper">
        <div class="header">
          <h1>
            Simple Google Cast Sender
          </h1>
          <div class="button-wrapper flex-1">
            <button is="google-cast-button" class="cast-button"></button>
          </div>
        </div>
      </app-header>
      <div id="controller" class="hidden">
        <cast-form></cast-form>
        <!-- <div>
          <label for="content-id">Content ID</label>
          <text-box id="content-id"></text-box>
        </div>
        <div>
          <label for="custom-data">Custom Data</label>
          <text-box id="custom-data"></text-box>
        </div>
        <div>
          <button-primary>Cast</button-primary>
        </div> -->
      </div>
    `;
  }

  connectedCallback() {
    const shadow = this.attachShadow({
      mode: 'closed',
    })
    shadow.innerHTML = SenderPage.template;

    var previousValues = JSON.parse(storage.get('previous-data') || '{}');

    const castInstance = Cast.getInstance();

    const controller = shadow.querySelector('#controller');

    castInstance.addEventListener('sessionstarted', () => {
      controller.classList.remove('hidden');
    });

    castInstance.addEventListener('sessionresumed', () => {
      controller.classList.remove('hidden');
    });

    castInstance.addEventListener('sessionended', () => {
      controller.classList.add('hidden');
    });

    castInstance.addEventListener('loadfailed', err => {
      alert(`Error code: ${err}`);
    });

    const castForm = shadow.querySelector('cast-form');
    castForm.addEventListener('cast', e => {
      e.preventDefault();
      const {
        contentId,
        customData,
      } = e.data;

      const contentType = contentId.indexOf(/\.m3u8/) ? 'application/x-mpegURL' : 'application/dash+xml';

      previousValues = {
        contentId,
        customData,
      };
      storage.set('previous-data', JSON.stringify(previousValues));

      castInstance.castMedia(contentId, contentType, customData);
    });
    castForm.value = previousValues;
  }

}
