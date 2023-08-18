import { CanvasShapeTypes, CanvasShapes, ShapesFactory } from '../shapes';

export interface IRendererTreeNode {
  node: CanvasShapes;
  children: IRendererTreeNode[];
}

export class RendererTree {
  tree: IRendererTreeNode[];

  constructor() {
    this.tree = [];

    this.addNode(CanvasShapeTypes.Draw);
  }

  addNode(shapeType: CanvasShapeTypes) {
    let node: CanvasShapes | null = null;

    switch (shapeType) {
      case CanvasShapeTypes.Draw: {
        node = ShapesFactory.createDrawShape();
        break;
      }
    }

    if (!node) throw new Error('Node could not be created!');

    const treeNode: IRendererTreeNode = {
      node,
      children: [],
    };

    this.tree.push(treeNode);
    return treeNode;
  }

  getNodeById(id: string) {
    const node: IRendererTreeNode | null = this.treeDfs(this.tree[0], id);

    return node;
  }

  private treeDfs(root: IRendererTreeNode, targetId: string): IRendererTreeNode | null {
    if (root.node.id === targetId) return root;

    for (const child of root.children) {
      const result = this.treeDfs(child, targetId);
      if (result) return result;
    }

    return null;
  }

  getTree() {
    return this.tree;
  }
}
