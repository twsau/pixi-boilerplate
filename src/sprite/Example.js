import { Loader, Sprite } from "pixi.js";
const loader = Loader.shared;

export default class Example extends Sprite {
  constructor() {
    super(loader.resources['example'].texture);
    this.attributes = {
      name: 'exampleName'
    }
  }
}