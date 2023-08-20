import React from 'react';
import { Canvas } from '@components/canvas/canvas';
import { CanvasCameraProvider } from '@context/canvas-camera/canvas-camera-context';
import { CanvasCoreProvider } from '@context/canvas-core/canvas-core-context';
import { CanvasCustomizationProvider } from '@context/canvas-customization/canvas-customization-context';
import { CanvasTreeProvider } from '@context/canvas-tree/canvas-tree-context';

export const CanvasRenderer = () => {
  return (
    <CanvasCoreProvider>
      <CanvasTreeProvider>
        <CanvasCameraProvider>
          <CanvasCustomizationProvider>
            <div className="absolute top-0 left-0 w-full h-full max-w-full max-h-full p-0 m-0 overscroll-none overflow-clip">
              <Canvas />
            </div>
          </CanvasCustomizationProvider>
        </CanvasCameraProvider>
      </CanvasTreeProvider>
    </CanvasCoreProvider>
  );
};
