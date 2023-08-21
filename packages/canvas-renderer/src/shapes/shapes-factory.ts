import { nanoid } from 'nanoid';
import { ShapeUtils } from '../utils/shape-utils';
import { CanvasShapeToolTypes, CanvasShapes, ICanvasDrawShape, ICanvasBoxShape, ICanvasCircleShape } from './types';

export class ShapesFactory {
  static createShape(shapeType: CanvasShapeToolTypes): CanvasShapes {
    switch (shapeType) {
      case 'draw':
        return this.createDrawShape();
      case 'box':
        return this.createBoxShape();
      case 'circle':
        return this.createCircleShape();
    }
  }

  static createDrawShape(): ICanvasDrawShape {
    const shape: ICanvasDrawShape = {
      id: nanoid(),
      type: 'draw',
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
      type: 'box',
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
      type: 'circle',
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
