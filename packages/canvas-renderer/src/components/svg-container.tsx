import React from 'react';

type SVGContainerProps = React.SVGProps<SVGSVGElement> & {
  id: string;
  children: React.ReactNode;
};

const SVGContainer: React.FC<SVGContainerProps> = (props) => {
  const { id, children, className, ...rest } = props;

  return (
    <svg id={`svg:${id}`} className="w-full h-full overflow-clip" {...rest}>
      <g id={id} style={{ transform: 'translate(24px, 24px)' }}>
        {children}
      </g>
    </svg>
  );
};

export default SVGContainer;
