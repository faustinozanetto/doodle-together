import React, { useEffect } from 'react';
import { useCanvasTree } from '@hooks/tree/use-canvas-tree';
import { CanvasNodesContainer } from './canvas-nodes-container';
import { CanvasNode } from './node/canvas-node';
import { CanvasBackground } from './canvas-background';
import { CanvasSerializer } from 'serialization/canvas-serializer';
import { CanvasContainer } from './canvas-container';
import { useToolsKeysInput } from '@hooks/input/use-tools-keys-input';
import { useCanvasCoreStore } from '@state/canvas-core.slice';

export const Canvas = () => {
  const { setNodes, nodes, activeNodeId, selectedNodeId } = useCanvasTree();

  const { currentState } = useCanvasCoreStore();

  useToolsKeysInput();

  useEffect(() => {
    const nodesFromStorage = localStorage.getItem('nodes');
    if (!nodesFromStorage) return;

    const serializer = new CanvasSerializer();
    const deserialized = serializer.deserialize(nodesFromStorage);
    setNodes(deserialized);
  }, []);

  return (
    <CanvasContainer>
      <CanvasBackground />
      <span className="absolute top-2 left-2 pointer-events-none select-none">{`STATE: ${currentState} | ACTIVE: ${activeNodeId} | SELECTED: ${selectedNodeId}`}</span>

      <CanvasNodesContainer>
        {nodes.map((node) => {
          return <CanvasNode key={node.id} node={node} />;
        })}
      </CanvasNodesContainer>
    </CanvasContainer>
  );
};
