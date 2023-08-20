import { Canvas } from '@components/canvas/canvas';

export const CanvasRenderer = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full max-w-full max-h-full p-0 m-0 overscroll-none overflow-clip">
      <Canvas />
    </div>
  );
};
