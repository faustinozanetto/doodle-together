import { ICanvasShape } from '../shapes/shape';

export class RendererTree {
  private tree: ICanvasShape[];

  constructor() {
    this.tree = [];
  }

  getTree() {
    return this.tree;
  }
}
