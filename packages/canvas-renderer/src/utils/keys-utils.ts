import { CanvasShapeToolTypes, CanvasToolTypes, CanvasUtilityToolTypes } from '@shapes/types';

const TOOLS_KEY_MAPPING: Record<CanvasToolTypes, string> = {
  // Shapes Tool
  draw: '1',
  box: '2',
  circle: '3',
  diamond: '4',
  hexagon: '5',
  triangle: '6',
  // Utilities Tool
  hand: 'h',
  clear: 'c',
  eraser: 'e',
  select: 's',
};

export class KeysUtils {
  static getUtilityToolKey(utilityTool: CanvasUtilityToolTypes) {
    return TOOLS_KEY_MAPPING[utilityTool];
  }

  static getShapeToolKey(shapeTool: CanvasShapeToolTypes) {
    return TOOLS_KEY_MAPPING[shapeTool];
  }

  static getToolKey(tool: CanvasToolTypes) {
    return TOOLS_KEY_MAPPING[tool];
  }

  static getToolTypeByKey(key: string): CanvasToolTypes {
    const keyMappingEntries = Object.entries(TOOLS_KEY_MAPPING);

    const tool = keyMappingEntries.find(([type, mappingKey]) => mappingKey === key);
    if (tool === undefined) return 'draw';

    return tool[0] as CanvasToolTypes;
  }
}
