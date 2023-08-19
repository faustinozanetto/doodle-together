import { useContext } from 'react';
import { CameraContext } from '../context';

export const useCameraContext = () => {
  const context = useContext(CameraContext);
  if (!context) throw new Error('Tried to use camera context outside the provider.');

  return context;
};
