type UseCanvasEventsParams = {
  /**
   * Callback function executed when pointer up.
   * @param event Event
   */
  onPointerUpCallback: (event: React.PointerEvent<HTMLDivElement>) => void;
  /**
   * Callback function executed when pointer down.
   * @param event Event
   */
  onPointerDownCallback: (event: React.PointerEvent<HTMLDivElement>) => void;
  /**
   * Callback function executed when pointer moves.
   * @param event Event
   */
  onPointerMoveCallback: (event: React.PointerEvent<HTMLDivElement>) => void;
  /**
   * Callback function executed when click
   * @param event Event
   */
  onClickCallback: (event: React.MouseEvent<HTMLDivElement>) => void;
};

type UseCanvasEventsReturn = {
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

/**
 * Main hook responsible for the mouse interactions and points registrations.
 */
export const useCanvasEvents = ({
  onPointerUpCallback,
  onPointerDownCallback,
  onPointerMoveCallback,
  onClickCallback,
}: UseCanvasEventsParams): UseCanvasEventsReturn => {
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerMoveCallback(event);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerUpCallback(event);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDownCallback(event);
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClickCallback(event);
  };

  return {
    onPointerMove,
    onPointerUp,
    onPointerDown,
    onClick,
  };
};
