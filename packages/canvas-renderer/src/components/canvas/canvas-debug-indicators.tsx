import React from 'react';
import { ICanvasPoint } from '@common/canvas-point';

type CanvasDebugIndicatorsProps = {
  topLeftPoint: ICanvasPoint | null;
  originPoint: ICanvasPoint | null;
  cursorPoint: ICanvasPoint;
};

export const CanvasDebugIndicators: React.FC<CanvasDebugIndicatorsProps> = (props) => {
  const { originPoint, topLeftPoint, cursorPoint } = props;

  return (
    <>
      {originPoint ? (
        <div
          className="absolute inset-0 bg-red-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
          style={{
            transform: `translate(${originPoint.x}px, ${originPoint.y}px)`,
          }}
        />
      ) : null}
      {topLeftPoint ? (
        <div
          className="absolute inset-0 bg-blue-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
          style={{
            transform: `translate(${topLeftPoint.x}px, ${topLeftPoint.y}px)`,
          }}
        />
      ) : null}
      <div
        className="absolute inset-0 bg-violet-500 h-6 w-6 rounded-lg z-[800] pointer-events-none"
        style={{
          transform: `translate(${cursorPoint.x}px, ${cursorPoint.y}px)`,
        }}
      />
    </>
  );
};
