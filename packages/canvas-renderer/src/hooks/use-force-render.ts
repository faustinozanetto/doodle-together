import { useLayoutEffect, useReducer } from 'react';

export const useForceUpdate = () => {
  const forceUpdate = useReducer((a) => a + 1, 0);
  useLayoutEffect(() => forceUpdate[1](), []);
};
