import { useMemo } from 'react';
import clsx from 'clsx';
import { CommonUtils } from '@utils/common-utils';
import { useCanvasCoreStore } from '@state/canvas-core.slice';

type UseCanvasStylesReturn = {
  canvasStyles: React.CSSProperties;
  canvasClassNames: string;
};

/**
 * Hook responsible for the styling of the canvas div.
 */
export const useCanvasStyles = (): UseCanvasStylesReturn => {
  const { currentState } = useCanvasCoreStore();

  const canvasStyles = useMemo(() => {
    const styles: React.CSSProperties = {
      transformOrigin: 'center center',
      cursor: CommonUtils.getCursorStylesByState(currentState),
    };

    return styles;
  }, [currentState]);

  const canvasClassNames = useMemo(() => {
    return clsx('absolute inset-0 w-full h-full overflow-hidden');
  }, []);

  return { canvasStyles, canvasClassNames };
};
