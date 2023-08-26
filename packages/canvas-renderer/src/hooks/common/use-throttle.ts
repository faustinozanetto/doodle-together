import { useEffect, useRef } from 'react';

/**
 * Creates a throttled function that delays the execution of the provided callback.
 * @param delay The delay in milliseconds before the callback can be executed again.
 * @returns A throttled function.
 */
export const useThrottle = (delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Throttles the provided callback by delaying its execution.
   * @param callback The callback to be throttled.
   * @returns A function that, when called, executes the throttled callback.
   */
  const throttle =
    <T extends any[]>(callback: (...args: T) => void) =>
    (...args: T) => {
      if (!timeoutRef.current) {
        callback(...args);
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null; // Allow another call to be throttled
        }, delay);
      }
    };

  // Cleanup effect to clear any ongoing timeouts when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return throttle;
};
