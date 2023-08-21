import { CanvasShapes, ICanvasBounds, ICanvasMouseEvenetsUpdatePayload, ICanvasShapeDimensions } from '../types';

export abstract class Shape<T extends CanvasShapes> {
  /**
   * Method that is responsible for creating the final svg element.
   * @param data Shape data to pass.
   * @returns The react jsx svg element.
   */
  render(data: T): React.JSX.Element {
    switch (data.customization.style) {
      case 'drawn':
        return this.renderHandDrawn(data);
      case 'dashed':
        return this.renderDashed(data);
      case 'dotted':
        return this.renderDotted(data);
    }
  }

  protected abstract renderHandDrawn(data: T): React.JSX.Element;
  protected abstract renderDashed(data: T): React.JSX.Element;
  protected abstract renderDotted(data: T): React.JSX.Element;

  /**
   * Method that is executed while creating the shape on mouse move.
   * @param data Current shape data.
   * @param updatePayload Mouse move update payload.
   * @returns Updated shape data.
   */
  abstract mouseUpdate(data: T, updatePayload: ICanvasMouseEvenetsUpdatePayload): T;

  /**
   * Method that checks if the shape should re-render or not.
   * @param prev Prev shape data.
   * @param next Next shape data.
   */
  abstract shouldRender(prev: T, next: T): boolean;

  abstract calculateBounds(data: T): ICanvasBounds;

  abstract calculateDimensions(data: T): ICanvasShapeDimensions;
}
