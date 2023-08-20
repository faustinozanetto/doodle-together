export interface ICanvasPoint {
  x: number;
  y: number;
}

export class CanvasPoint {
  static add = (a: ICanvasPoint, b: ICanvasPoint): ICanvasPoint => {
    return { x: a.x + b.x, y: a.y + b.y };
  };

  static sub = (a: ICanvasPoint, b: ICanvasPoint): ICanvasPoint => {
    return { x: a.x - b.x, y: a.y - b.y };
  };

  static mul = (a: ICanvasPoint, n: number): ICanvasPoint => {
    return { x: a.x * n, y: a.y * n };
  };

  static div = (a: ICanvasPoint, n: number): ICanvasPoint => {
    return { x: a.x / n, y: a.y / n };
  };

  static len = (a: ICanvasPoint): number => {
    return a.x * a.x + a.y * a.y;
  };

  static dist = (a: ICanvasPoint, b: ICanvasPoint): number => {
    return CanvasPoint.len(CanvasPoint.sub(a, b));
  };
}
