import { KeysUtils } from '@utils/keys-utils';
import { useKeydownEvent } from './use-keydown-event';
import { CanvasState, useCanvasCoreStore } from '@state/canvas-core.slice';
import { useCanvasTree } from '@hooks/tree/use-canvas-tree';

/**
 * Hook responsible for selecting tools with keys.
 */
export const useToolsKeysInput = () => {
  const { setSelectedToolType, setCurrentState } = useCanvasCoreStore();
  const { clearActiveNode, clearSelectedNode } = useCanvasTree();

  useKeydownEvent({
    onKeyDownCallback(event) {
      const { key } = event;

      const toolType = KeysUtils.getToolTypeByKey(key);
      setCurrentState(CanvasState.Idling);
      clearActiveNode();
      clearSelectedNode();
      setSelectedToolType(toolType);
    },
  });
};
