import * as PIXI from 'pixi.js';
import * as WebFont from 'webfontloader';
import App from './app/App.js';
const loader = PIXI.Loader.shared;
const manifest = {};
const preload = () => {
  for (const [key, value] of Object.entries(manifest)) {
    loader.add(ley, value);
  }
}
const load = () => {
  loader.load(() => {
    WebFont.load({
      google: {
        families: ['Press Start 2P']
      },
      active: e => {
        PIXI.utils.skipHello();
        let app = new App();
        console.log('loader completed');
      }
    })
  })
}
preload();
load();