import React from 'react';
import { CommonUtils } from '@utils/common-utils';

type CanvasNodeSVGContainerProps = React.SVGProps<SVGSVGElement> & {
  id: string;
  children: React.ReactNode;
};

const CanvasNodeSVGContainer: React.FC<CanvasNodeSVGContainerProps> = (props) => {
  const { id, children, className, ...rest } = props;

  return (
    <svg id={`svg:${id}`} className="w-full h-full overflow-clip pointer-events-none select-none" {...rest}>
      <g
        id={id}
        className="pointer-events-none select-none"
        style={{ transform: `translate(${CommonUtils.SHAPE_PADDING}px, ${CommonUtils.SHAPE_PADDING}px)` }}
      >
        {children}
      </g>
    </svg>
  );
};

export default CanvasNodeSVGContainer;
