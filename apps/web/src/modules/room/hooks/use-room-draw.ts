import { ElementRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CanvasPoint } from '@doodle-together/shared';
import { drawEraser, drawPoint } from '../lib/room-draw.lib';
import { useRoomStore } from '@modules/state/room.slice';
import { RoomDrawEraserPayload, RoomDrawPointPayload } from '../types/room.types';
import { useCustomizationStore } from '@modules/state/customization.slice';

type UseRoomDrawProps = {
  onCanvasCleared: () => void;
  onCanvasResized: (width: number, height: number) => void;
  onEraserDraw: (drawEraserPayload: RoomDrawEraserPayload) => void;
  onPointDraw: (drawPointPayload: RoomDrawPointPayload) => void;
};

export const useRoomDraw = ({ onPointDraw, onCanvasCleared, onCanvasResized, onEraserDraw }: UseRoomDrawProps) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const previousPoint = useRef<CanvasPoint | null>(null);
  const wrapperRef = useRef<ElementRef<'div'>>(null);

  const { canvasRef } = useRoomStore();
  const customization = useCustomizationStore();

  const handleCanvasResize = () => {
    if (!wrapperRef.current || !canvasRef.current) return;

    const { width, height } = wrapperRef.current.getBoundingClientRect();
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    onCanvasResized(width, height);
  };

  const getCanvasContext = (): CanvasRenderingContext2D | null => {
    if (!canvasRef.current) return null;

    const context = canvasRef.current.getContext('2d');
    if (!context) return null;

    return context;
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;

    const context = getCanvasContext();
    if (!context) return;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleCanvasDraw = (event: MouseEvent) => {
    if (!canvasRef.current) return;

    const context = getCanvasContext();
    if (!context) return;

    const { tool, color, size } = customization;

    // Create current point object from canvas ref element.
    const { clientX, clientY } = event;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const currentPoint: CanvasPoint = {
      x: clientX - left,
      y: clientY - top,
    };

    if (tool === 'pencil') {
      const drawPointPayload: RoomDrawPointPayload = {
        point: currentPoint,
        prevPoint: previousPoint.current,
        color,
        size,
        context,
      };

      drawPoint(drawPointPayload);
      onPointDraw(drawPointPayload);
    } else if (tool === 'eraser') {
      const drawEraserPayload: RoomDrawEraserPayload = {
        context,
        point: currentPoint,
        prevPoint: previousPoint.current,
      };
      drawEraser(drawEraserPayload);
      onEraserDraw(drawEraserPayload);
    } else if (tool === 'clear') {
      clearCanvas();
      onCanvasCleared();
    }

    previousPoint.current = currentPoint;
  };

  const handleOnMouseMove = (event: MouseEvent) => {
    if (!mouseDown) return;

    handleCanvasDraw(event);
  };

  const handleOnMouseDown = () => {
    setMouseDown(true);
  };

  const handleOnMouseRelease = () => {
    setMouseDown(false);
    previousPoint.current = null;
  };

  // Setup canvas size on ref change
  useEffect(() => {
    handleCanvasResize();
  }, [canvasRef]);

  // Setup canvas size on window resize
  useLayoutEffect(() => {
    window.addEventListener('resize', handleCanvasResize);

    return () => window.removeEventListener('resize', handleCanvasResize);
  }, [canvasRef]);

  // Mouse handling events
  useEffect(() => {
    window.addEventListener('mousemove', handleOnMouseMove);
    window.addEventListener('mouseup', handleOnMouseRelease);

    return () => {
      window.removeEventListener('mousemove', handleOnMouseMove);
      window.removeEventListener('mouseup', handleOnMouseRelease);
    };
  }, [mouseDown]);

  return { wrapperRef, handleOnMouseDown, clearCanvas };
};
