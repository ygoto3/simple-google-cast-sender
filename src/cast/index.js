import EventListeners from '../utils/EventListeners.js';

export class Cast extends EventListeners {

  static getInstance() {
    if (Cast.instance) {
      return Cast.instance;
    }
    const applicationId = (location.search.match(/[?&]applicationId=([^&#]*)/i) || [])[1]
    return new Cast(applicationId);
  }

  constructor(applicationId) {
    super();

    this.context = cast.framework.CastContext.getInstance();

    this.context.setOptions({
      receiverApplicationId: applicationId,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });

    this.context.addEventListener(
      cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      ev => {
        switch (ev.sessionState) {
          case cast.framework.SessionState.SESSION_STARTED:
            console.log('SESSION_STARTED');
            this.dispatchEvent('sessionstarted');
            break;
          case cast.framework.SessionState.SESSION_RESUMED:
            console.log('SESSION_RESUMED');
            this.dispatchEvent('sessionresumed');
            break;
          case cast.framework.SessionState.SESSION_ENDED:
            console.log('SESSION_ENDED');
            this.dispatchEvent('sessionended');
            break;
        }
      },
    );

    this.listeners = [];

    Cast.instance = this;
  }

  castMedia(mediaURL, contentType, customData) {
    const castSession = this.context.getCurrentSession();
    const mediaInfo = new chrome.cast.media.MediaInfo(mediaURL, contentType);
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
  
    if (customData) {
      mediaInfo.customData = customData;
    }
  
    castSession.loadMedia(request)
      .then(
        () => {
          console.log('Load succeed');
        },
        err => {
          console.log(`Error code: ${err}`);
          this.dispatchEvent('loadfailed', err);
        },
      );
  }

}
