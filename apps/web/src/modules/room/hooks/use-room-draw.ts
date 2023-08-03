import { ElementRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRoomContext } from './use-room-context';
import { CanvasPoint } from '@doodle-together/types';
import { drawPoint } from '../lib/room-draw.lib';
import { RoomDrawPointPayload } from '../types/room.types';

type UseRoomDrawProps = {
  onPointDraw: (data: RoomDrawPointPayload) => void;
  onCanvasCleared: () => void;
  onCanvasResized: (width: number, height: number) => void;
};

export const useRoomDraw = ({ onPointDraw, onCanvasCleared, onCanvasResized }: UseRoomDrawProps) => {
  const { state } = useRoomContext();

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

  const drawEraser = (point: CanvasPoint) => {
    if (!previousPoint.current) return;

    const context = getCanvasContext();
    if (!context) return;

    // Setup style.
    context.globalCompositeOperation = 'destination-out';
    context.lineWidth = 25;

    const startPoint: CanvasPoint = previousPoint.current ?? point;

    // Draw
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(point.x, point.y);
    context.stroke();
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

    const { tool } = state;

    // Create current point object from canvas ref element.
    const { clientX, clientY } = event;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const currentPoint: CanvasPoint = {
      x: clientX - left,
      y: clientY - top,
    };

    if (tool === 'pencil') {
      const { toolCustomization } = state;
      const drawPointData: RoomDrawPointPayload = {
        point: currentPoint,
        prevPoint: previousPoint.current,
        color: toolCustomization.color,
        size: toolCustomization.size,
        context,
      };

      drawPoint(drawPointData);
      onPointDraw(drawPointData);
    } else if (tool === 'eraser') {
      drawEraser(currentPoint);
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

  return { wrapperRef, canvasRef, handleOnMouseDown, drawPoint, clearCanvas };
};
