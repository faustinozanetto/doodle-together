import { ElementRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CanvasPoint } from '../types/room.types';
import { useRoomContext } from './use-room-context';
import { getToolSizeToWidth } from '../lib/room.lib';

export const useRoomDraw = () => {
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
  };

  const getCanvasContext = (): CanvasRenderingContext2D | null => {
    if (!canvasRef.current) return null;

    const context = canvasRef.current.getContext('2d');
    if (!context) return null;

    return context;
  };

  const drawPoint = (point: CanvasPoint, context: CanvasRenderingContext2D) => {
    if (!previousPoint.current) return;

    const { toolCustomization } = state;
    // Setup style.
    context.globalCompositeOperation = 'source-over';
    context.strokeStyle = toolCustomization.color;
    context.lineWidth = getToolSizeToWidth(toolCustomization.size);
    context.lineJoin = 'round';
    context.lineCap = 'round';

    const startPoint: CanvasPoint = previousPoint.current ?? point;

    // Draw
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const drawEraser = (point: CanvasPoint, context: CanvasRenderingContext2D) => {
    if (!previousPoint.current) return;

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

  const handleCanvasDraw = (event: MouseEvent, context: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;

    const { tool } = state;

    // Create current point object from canvas ref element.
    const { clientX, clientY } = event;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const currentPoint: CanvasPoint = {
      x: clientX - left,
      y: clientY - top,
    };

    // Pencil draw logic
    if (tool === 'pencil') {
      drawPoint(currentPoint, context);
      previousPoint.current = currentPoint;
    } else if (tool === 'eraser') {
      drawEraser(currentPoint, context);
      previousPoint.current = currentPoint;
    } else if (tool === 'clear') {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleOnMouseMove = (event: MouseEvent) => {
    if (!mouseDown) return;

    const context = getCanvasContext();
    if (!context) return;

    handleCanvasDraw(event, context);
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

    // Cleanup
    return () => window.removeEventListener('resize', handleCanvasResize);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleOnMouseMove);
    window.addEventListener('mouseup', handleOnMouseRelease);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleOnMouseMove);
      window.removeEventListener('mouseup', handleOnMouseRelease);
    };
  }, [mouseDown]);

  return { wrapperRef, canvasRef, handleOnMouseDown };
};
