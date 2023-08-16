import { CanvasShapeTypes, ICanvasShape, ShapesFactory } from '../shapes';
import { DrawShape } from '../shapes/draw-shape';

export class RendererTree {
  private tree: ICanvasShape[];
  private idMapping: Map<string, ICanvasShape>;

  constructor() {
    this.tree = [];
    this.idMapping = new Map<string, ICanvasShape>();

    this.addNode(CanvasShapeTypes.Draw);
    this.addNode(CanvasShapeTypes.Draw);
    this.addNode(CanvasShapeTypes.Draw);
  }

  addNode(shapeType: CanvasShapeTypes) {
    let node: DrawShape | null = null;

    switch (shapeType) {
      case CanvasShapeTypes.Draw: {
        node = ShapesFactory.createDrawShape();
        break;
      }
    }

    if (!node) throw new Error('Node could not be created!');

    this.tree.push(node.getData());
  }

  getTree() {
    return this.tree;
  }
}
