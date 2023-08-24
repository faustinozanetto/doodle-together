import { ICanvasPoint } from '@common/canvas-point';
import { ICanvasBounds } from '@shapes/types';
import { CanvasCameraSliceState } from '@state/canvas-camera.slice';

export class CommonUtils {
  static SHAPE_PADDING: number = 48;

  private static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) & 0xffffffff;
    }
    return hash;
  }

  private static getNextSeedRandomValue(state: { s0: number; s1: number; s2: number; c: number }): number {
    const { s0, s1, s2, c } = state;
    const t = (s0 + s1 + s2) >>> 0;
    state.s0 = s1;
    state.s1 = s2;
    state.s2 = t;

    return ((t >>> 0) / 0x100000000) % 1;
  }

  static createSeededRandom(id: string) {
    const state = {
      s0: this.hashString(id),
      s1: this.hashString(id),
      s2: this.hashString(id),
      c: 1,
    };

    return () => this.getNextSeedRandomValue(state);
  }

  static getPoint(event: React.PointerEvent, bounds: ICanvasBounds): ICanvasPoint {
    const { clientX, clientY } = event;

    return {
      x: +clientX.toFixed(2) - bounds.min.x,
      y: +clientY.toFixed(2) - bounds.min.y,
    };
  }

  static getCameraTransformedPoint(point: ICanvasPoint, camera: CanvasCameraSliceState): ICanvasPoint {
    const { zoom, position } = camera;

    const zoomMapped: ICanvasPoint = {
      x: point.x / zoom,
      y: point.y / zoom,
    };

    const translated: ICanvasPoint = {
      x: zoomMapped.x - position.x,
      y: zoomMapped.y - position.y,
    };

    return translated;
  }

  static getTransformedEventPoint(
    event: React.PointerEvent<HTMLDivElement>,
    bounds: ICanvasBounds,
    camera: CanvasCameraSliceState
  ): ICanvasPoint {
    const point = this.getPoint(event, bounds);
    const transformedPoint = this.getCameraTransformedPoint(point, camera);

    return transformedPoint;
  }
}
