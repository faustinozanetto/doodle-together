import { CanvasToolTypes } from '@shapes/types';

export class ToolUtils {
  static isShapeTool(tool: CanvasToolTypes): boolean {
    const tools: CanvasToolTypes[] = ['box', 'circle', 'draw'];
    return tools.includes(tool);
  }

  static isUtilityTool(tool: CanvasToolTypes): boolean {
    const tools: CanvasToolTypes[] = ['select', 'hand', 'clear', 'eraser'];
    return tools.includes(tool);
  }
}
