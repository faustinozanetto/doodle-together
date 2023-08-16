import { CanvasShapes } from './types';

export abstract class Shape<T extends CanvasShapes> {
  protected abstract data: T;

  getData(): T {
    return this.data;
  }

  /**
   * Method that is responsible for creating the final svg element.
   * @param shape Shape data.
   * @returns The react jsx svg element.
   */
  abstract render(shape: T): React.JSX.Element;

  abstract shouldRender(prev: T, next: T): boolean;
}
