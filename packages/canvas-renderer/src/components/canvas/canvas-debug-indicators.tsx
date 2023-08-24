import React from 'react';
import { ICanvasPoint } from '@common/canvas-point';

type CanvasDebugIndicatorsProps = {
  topLeftPoint: ICanvasPoint | null;
  originPoint: ICanvasPoint | null;
  cursorPoint: ICanvasPoint;
  shapeBoundsCenter: ICanvasPoint;
};

export const CanvasDebugIndicators: React.FC<CanvasDebugIndicatorsProps> = (props) => {
  const { originPoint, topLeftPoint, cursorPoint, shapeBoundsCenter } = props;

  return (
    <>
      {originPoint ? (
        <div
          className="absolute inset-0 bg-red-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
          style={{
            transform: `translate(${originPoint.x}px, ${originPoint.y}px)`,
          }}
        >
          origin
        </div>
      ) : null}
      {topLeftPoint ? (
        <div
          className="absolute inset-0 bg-blue-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
          style={{
            transform: `translate(${topLeftPoint.x}px, ${topLeftPoint.y}px)`,
          }}
        >
          topleft
        </div>
      ) : null}
      <div
        className="absolute inset-0 bg-violet-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${cursorPoint.x}px, ${cursorPoint.y}px)`,
        }}
      >
        cursosr
      </div>
      <div
        className="absolute inset-0 bg-pink-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${shapeBoundsCenter.x}px, ${shapeBoundsCenter.y}px)`,
        }}
      >
        boundscenter
      </div>
    </>
  );
};
