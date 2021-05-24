import { Application } from 'pixi.js';
import Example from './sprite/Example.js';

export default class App extends Application {
  constructor() {
    super({
      backgroundColor: 0x081820,
      height: 540,
      width: 990,
      view: document.querySelector('canvas')
    });
    this.example = new Example();
    this.example.anchor.set(0.5);
    this.example.position.set(this.screen.width / 2, this.screen.height / 2);
    this.example.scale.set(0.2);
    this.stage.addChild(this.example);
    this.ticker.add(delta => this.update(delta));
  }
  update() {
    
  }
}