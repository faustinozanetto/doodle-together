import { useCanvasCore } from '@hooks/core/use-canvas-core';
import { useMemo } from 'react';
import clsx from 'clsx';
import { CommonUtils } from '@utils/common-utils';

/**
 * Hook responsible for the styling of the canvas div.
 */
export const useCanvasStyles = () => {
  const { currentState } = useCanvasCore();

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
