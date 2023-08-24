import { CanvasTreeNode } from '@state/canvas-tree.slice';

export class CanvasSerializer {
  serialize(nodes: CanvasTreeNode[]): string {
    const textEncoder = new TextEncoder();
    const nodesContent = JSON.stringify(nodes);
    const encoded = textEncoder.encode(nodesContent);

    return encoded.toString();
  }

  deserialize(serialized: string) {
    const textDecoder = new TextDecoder();
    const buffer = new Uint8Array(serialized.split(',').map((v) => Number(v)));
    const decoded = textDecoder.decode(buffer);
    const nodesContent = JSON.parse(decoded) as CanvasTreeNode[];

    return nodesContent;
  }
}
