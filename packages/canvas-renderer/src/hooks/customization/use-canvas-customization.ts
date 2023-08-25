import { useCanvasTree } from '@hooks/tree/use-canvas-tree';
import { ICanvasBackgroundCustomization, ICanvasShapeCustomization } from '@shapes/types';
import { useCanvasCustomizationStore } from '@state/canvas-customization.slice';

type UseCanvasCustomizationReturn = {
  /**
   * Sets current color.
   * @param color Color.
   */
  setColor: (color: ICanvasShapeCustomization['color']) => void;
  /**
   * Sets current size.
   * @param size Size.
   */
  setSize: (size: ICanvasShapeCustomization['size']) => void;
  /**
   * Sets current style.
   * @param style Style.
   */
  setStyle: (style: ICanvasShapeCustomization['style']) => void;
  /**
   * Sets background grid enabled or not.
   * @param enableGrid Enable grid or not.
   */
  setBackgroundGridEnabled: (enableGrid: boolean) => void;
  /**
   * Sets background grid size.
   * @param gridSize Grid size.
   */
  setBackgroundGridSize: (gridSize: number) => void;
  /**
   * Returns the selected node customization data.
   * @returns Customization data.
   */
  getSelectedNodeCustomization: () => ICanvasShapeCustomization;
  /**
   * Global customization data.
   */
  customization: ICanvasShapeCustomization;
  /**
   * Background csutomization.
   */
  background: ICanvasBackgroundCustomization;
};

/**
 * Hook responsible for managing the customization of canvas.
 */
export const useCanvasCustomization = (): UseCanvasCustomizationReturn => {
  const { getSelectedNode, updateNode } = useCanvasTree();

  const {
    setColor: setColorStore,
    setSize: setSizeStore,
    setStyle: setStyleStore,
    setBackgroundGridEnabled,
    setBackgroundGridSize,
    customization,
    background,
  } = useCanvasCustomizationStore();

  const setColor = (color: ICanvasShapeCustomization['color']) => {
    const selectedNode = getSelectedNode();
    if (selectedNode) {
      const updatedCustomization: ICanvasShapeCustomization = {
        ...selectedNode.customization,
        color,
      };
      updateNode(selectedNode.id, {
        ...selectedNode,
        customization: updatedCustomization,
      });
      return;
    }

    setColorStore(color);
  };

  const setSize = (size: ICanvasShapeCustomization['size']) => {
    const selectedNode = getSelectedNode();
    if (selectedNode) {
      const updatedCustomization: ICanvasShapeCustomization = {
        ...selectedNode.customization,
        size,
      };
      updateNode(selectedNode.id, {
        ...selectedNode,
        customization: updatedCustomization,
      });
      return;
    }

    setSizeStore(size);
  };

  const setStyle = (style: ICanvasShapeCustomization['style']) => {
    const selectedNode = getSelectedNode();
    if (selectedNode) {
      const updatedCustomization: ICanvasShapeCustomization = {
        ...selectedNode.customization,
        style,
      };
      updateNode(selectedNode.id, {
        ...selectedNode,
        customization: updatedCustomization,
      });
      return;
    }

    setStyleStore(style);
  };

  const getSelectedNodeCustomization = () => {
    const selectedNode = getSelectedNode();
    if (selectedNode) return selectedNode.customization;

    return customization;
  };

  return {
    setColor,
    setSize,
    setStyle,
    setBackgroundGridEnabled,
    setBackgroundGridSize,
    getSelectedNodeCustomization,
    customization,
    background,
  };
};
