import { nanoid } from 'nanoid';
import { CanvasShapeTypes, CanvasShapes, ICanvasBoxShape, ICanvasDrawShape } from './types';
import { ShapeUtils } from './shape-utils';

export class ShapesFactory {
  static createShape(shapeType: CanvasShapeTypes): CanvasShapes {
    switch (shapeType) {
      case CanvasShapeTypes.Draw:
        return this.createDrawShape();
      case CanvasShapeTypes.Box:
        return this.createBoxShape();
    }
    throw new Error('Could not create shape!');
  }

  static createDrawShape(): ICanvasDrawShape {
    const shape: ICanvasDrawShape = {
      id: nanoid(),
      type: CanvasShapeTypes.Draw,
      position: {
        x: 0,
        y: 0,
      },
      rotation: 0,
      customization: ShapeUtils.getShapeBaseCustomization(),
      props: {
        points: [],
      },
    };

    return shape;
  }

  static createBoxShape(): ICanvasBoxShape {
    const shape: ICanvasBoxShape = {
      id: nanoid(),
      type: CanvasShapeTypes.Box,
      position: {
        x: 0,
        y: 0,
      },
      rotation: 0,
      customization: ShapeUtils.getShapeBaseCustomization(),
      props: {
        leftTop: { x: 0, y: 0 },
        bottomRight: { x: 0, y: 0 },
      },
    };
    return shape;
  }
}
