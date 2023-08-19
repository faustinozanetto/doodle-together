export interface ICanvasPoint {
  x: number;
  y: number;
}

export class CanvasPoint {
  static add = (A: ICanvasPoint, B: ICanvasPoint): ICanvasPoint => {
    return { x: A.x + B.x, y: A.y + B.y };
  };

  static sub = (A: ICanvasPoint, B: ICanvasPoint): ICanvasPoint => {
    return { x: A.x - B.x, y: A.y - B.y };
  };

  static mul = (A: ICanvasPoint, n: number): ICanvasPoint => {
    return { x: A.x * n, y: A.y * n };
  };

  static div = (A: ICanvasPoint, n: number): ICanvasPoint => {
    return { x: A.x / n, y: A.y / n };
  };
}
