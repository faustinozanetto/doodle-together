import {
  CanvasPoint,
  CanvasShapes,
  ICanvasBounds,
  ICanvasMouseEvenetsUpdatePayload,
  ICanvasShapeDimensions,
} from '../types';

export abstract class Shape<T extends CanvasShapes> {
  /**
   * Method that is responsible for creating the final svg element.
   * @param data Shape data to pass.
   * @returns The react jsx svg element.
   */
  abstract render(data: T): React.JSX.Element;

  abstract mouseUpdate(data: T, updatePayload: ICanvasMouseEvenetsUpdatePayload): T;

  abstract shouldRender(prev: T, next: T): boolean;

  abstract calculateBounds(data: T): ICanvasBounds;

  abstract calculateDimensions(data: T): ICanvasShapeDimensions;
}
