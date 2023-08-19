import React from 'react';
import { CanvasPoint } from '../shapes';

type SVGContainerProps = React.SVGProps<SVGSVGElement> & {
  id: string;
  children: React.ReactNode;
};

const SVGContainer: React.FC<SVGContainerProps> = (props) => {
  const { id, children, className, ...rest } = props;

  return (
    <svg id={`svg:${id}`} className="w-full h-full overflow-clip" {...rest}>
      <g id={id}>{children}</g>
    </svg>
  );
};

export default SVGContainer;
