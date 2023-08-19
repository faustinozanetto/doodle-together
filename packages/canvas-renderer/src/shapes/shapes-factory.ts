import { nanoid } from 'nanoid';
import { CanvasShapeTypes, CanvasShapes, ICanvasBoxShape, ICanvasCircleShape, ICanvasDrawShape } from './types';
import { ShapeUtils } from './shape-utils';

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
        point: { x: 0, y: 0 },
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
