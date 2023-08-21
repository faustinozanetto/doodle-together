import React from 'react';
import { ICanvasShapeDimensions } from '@shapes/types';
import { CommonUtils } from '@utils/common-utils';

type CanvasNodeSVGContainerProps = React.SVGProps<SVGSVGElement> & {
  id: string;
  dimensions: ICanvasShapeDimensions;
  isActiveNode: boolean;
  isSelectedNode: boolean;
  children: React.ReactNode;
};

const CanvasNodeSVGContainer: React.FC<CanvasNodeSVGContainerProps> = (props) => {
  const { id, children, dimensions, isActiveNode, isSelectedNode, className, ...rest } = props;

  const getOutlineRectColor = () => {
    if (isActiveNode) return 'red';
    if (isSelectedNode) return 'blue';
    return 'transparent';
  };

  const shouldRenderOutlineRect = isActiveNode || isSelectedNode;

  return (
    <svg id={`svg:${id}`} className="w-full h-full overflow-clip" {...rest}>
      {shouldRenderOutlineRect && (
        <rect
          width={dimensions.width}
          height={dimensions.height}
          stroke={getOutlineRectColor()}
          strokeWidth={4}
          fill="transparent"
        />
      )}
      <g id={id} style={{ transform: `translate(${CommonUtils.SHAPE_PADDING}px, ${CommonUtils.SHAPE_PADDING}px)` }}>
        {children}
      </g>
    </svg>
  );
};

export default CanvasNodeSVGContainer;
