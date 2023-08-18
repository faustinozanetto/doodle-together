import { nanoid } from 'nanoid';
import { CanvasShapeTypes, CanvasShapes, ICanvasDrawShape } from './types';
import { ShapeUtils } from './shape-utils';

export class ShapesFactory {
  static createShape(shapeType: CanvasShapeTypes): CanvasShapes {
    switch (shapeType) {
      case CanvasShapeTypes.Draw:
        return this.createDrawShape();
    }
    throw new Error('Could not create shape!');
  }

  static createDrawShape(): ICanvasDrawShape {
    const shape: ICanvasDrawShape = {
      id: nanoid(),
      type: CanvasShapeTypes.Draw,
      points: [],
      position: {
        x: 0,
        y: 0,
      },
      customization: ShapeUtils.getShapeBaseCustomization(),
    };

    return shape;
  }
}
