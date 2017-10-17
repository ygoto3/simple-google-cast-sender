export default class EventListeners {
  constructor() {
    this.listeners = [];
  }

  addEventListener(name, callback) {
    this.listeners
      .push({ name, callback });
  }

  removeEventListener(name, callback) {
    const idx = this.listeners.findIndex((v, i) => {
      if (v.name === name, v.callback === callback) return true;
      return false;
    });
    if (idx === -1) return;

    this.listeners.splice(idx, 1);
  }

  dispatchEvent(name) {
    this.listeners
      .filter(v => v.name === name)
      .forEach(v => v.callback.apply(null, [].slice.call(arguments, 1)));
  }
}
