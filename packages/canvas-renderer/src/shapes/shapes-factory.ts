import { nanoid } from 'nanoid';
import { ShapeUtils } from './shape-utils';
import { CanvasShapeTypes, CanvasShapes, ICanvasDrawShape, ICanvasBoxShape, ICanvasCircleShape } from './types';

export class ShapesFactory {
  static createShape(shapeType: CanvasShapeTypes): CanvasShapes {
    switch (shapeType) {
      case CanvasShapeTypes.Draw:
        return this.createDrawShape();
      case CanvasShapeTypes.Box:
        return this.createBoxShape();
      case CanvasShapeTypes.Circle:
        return this.createCircleShape();
    }
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
        size: { width: 1, height: 1 },
      },
    };
    return shape;
  }

  static createCircleShape(): ICanvasCircleShape {
    const shape: ICanvasCircleShape = {
      id: nanoid(),
      type: CanvasShapeTypes.Circle,
      position: {
        x: 0,
        y: 0,
      },
      rotation: 0,
      customization: ShapeUtils.getShapeBaseCustomization(),
      props: {
        radius: 1,
      },
    };
    return shape;
  }
}
