import { App } from './game/App.js';
const loader = PIXI.Loader.shared;

const manifest = {
  // load assets here using loader.add(alias: filepath)
};

const preload = () => {
  for (const [key, value] of Object.entries(manifest)) {
    loader.add(key, value)
  }
}

const load = () => {
  loader.load(() => {
    $(document).ready(() => {
      WebFont.load({
        google: {
          families: ['Press Start 2P']
        },
        active: e => {
          PIXI.utils.skipHello();
          let app = new App();
        }
      });
    });
  });
}

preload();
load();