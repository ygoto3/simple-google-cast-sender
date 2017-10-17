import { Cast } from 'https://ygoto3.github.io/simple-google-cast-sender/cast/index.js';
import 'https://ygoto3.github.io/simple-google-cast-sender/components/index.js';

Promise.all([
  new Promise(resolve => window['__onGCastApiAvailable'] = resolve),
  new Promise(resolve => setTimeout(resolve, 800)),
])
.then(([isAvailable, _]) => {
  if (!isAvailable) return;
  document.getElementById('app')
    .innerHTML = '<sender-page></sender-page>';
});
