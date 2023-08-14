import { ElementRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CanvasPoint } from '@doodle-together/shared';
import { customizationState } from '@modules/state/customization.slice';
import { drawEraser, drawPoint } from '../lib/room-draw.lib';
import { RoomDrawEraserPayload, RoomDrawPointPayload } from '../types/room.types';

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
  const canvasRef = useRef<ElementRef<'canvas'>>(null);

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

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) return;

    const context = getCanvasContext();
    if (!context) return;

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  const handleCanvasDraw = (event: MouseEvent) => {
    if (!canvasRef.current) return;

    const context = getCanvasContext();
    if (!context) return;

    const { tool, color, size } = customizationState;

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

  const handleOnMouseDown = useCallback(() => {
    setMouseDown(true);
  }, []);

  const handleOnMouseRelease = useCallback(() => {
    setMouseDown(false);
    previousPoint.current = null;
  }, []);

  // Setup canvas size on ref change
  useEffect(() => {
    handleCanvasResize();
  }, [canvasRef]);

  // Setup canvas size on window resize
  useLayoutEffect(() => {
    window.addEventListener('resize', handleCanvasResize);

    return () => window.removeEventListener('resize', handleCanvasResize);
  }, []);

  // Mouse handling events
  useEffect(() => {
    window.addEventListener('mousemove', handleOnMouseMove);
    window.addEventListener('mouseup', handleOnMouseRelease);

    return () => {
      window.removeEventListener('mousemove', handleOnMouseMove);
      window.removeEventListener('mouseup', handleOnMouseRelease);
    };
  }, [mouseDown]);

  return { wrapperRef, canvasRef, handleOnMouseDown, clearCanvas };
};
