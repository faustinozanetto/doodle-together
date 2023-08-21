import { CanvasToolTypes } from '@shapes/types';

export class ToolUtils {
  static isShapeTool(tool: CanvasToolTypes): boolean {
    return tool === 'box' || tool === 'circle' || tool === 'draw';
  }

  static isUtilityTool(tool: CanvasToolTypes): boolean {
    return tool === 'select' || tool === 'eraser' || tool === 'clear';
  }
}
