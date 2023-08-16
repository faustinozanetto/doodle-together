import React, { createContext, useState } from 'react';
import { RendererTree } from '../renderer/renderer-tree';

type CanvasContextData = {
  rendererTree: RendererTree | null;
};

export const CanvasContext = createContext<CanvasContextData>({ rendererTree: null });

type CanvasProviderProps = {
  children: React.ReactNode;
};

export const CanvasProvider: React.FC<CanvasProviderProps> = (props) => {
  const { children } = props;

  const [rendererTree, setRendererTree] = useState<RendererTree>(() => new RendererTree());

  return <CanvasContext.Provider value={{ rendererTree }}>{children}</CanvasContext.Provider>;
};
