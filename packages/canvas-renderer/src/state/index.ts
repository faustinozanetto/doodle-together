import { Shape, CanvasShapes } from '../shapes';
import { create } from 'zustand';

export interface ICanvasRendererNode {
  node: Shape<CanvasShapes>;
  children: ICanvasRendererNode[];
}

export interface ICanvasRendererState {
  root: ICanvasRendererNode;
}

export const store = create<ICanvasRendererState>(() => ({
  root: { node: { data } },
}));
