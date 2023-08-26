import { useEffect } from 'react';

type UseKeydownEventParams = {
  onKeyDownCallback: (event: KeyboardEvent) => void;
};

export const useKeydownEvent = ({ onKeyDownCallback }: UseKeydownEventParams) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDownCallback);

    return () => {
      window.removeEventListener('keydown', onKeyDownCallback);
    };
  }, []);
};
