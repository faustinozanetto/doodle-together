import { useCanvasTree } from '@hooks/tree/use-canvas-tree';
import { ICanvasShapeCustomization } from '@shapes/types';
import { useCanvasCustomizationStore } from '@state/canvas-customization.slice';

export const useCanvasCustomization = () => {
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
