export default {

  prefix: 'simple-chromecast-sender-',

  set(key, value) {
    localStorage.setItem(`${this.prefix}key`, value);
  },

  get(key) {
    return localStorage.getItem(`${this.prefix}key`);
  },

};
