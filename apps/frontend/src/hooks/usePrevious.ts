/**
 * Code from
 * https://fastnguyen.medium.com/build-otp-input-with-reactjs-hooks-5699eb58b427
 */
import { useRef, useEffect } from 'react';

function usePrevious<T>(value?: T) {
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default usePrevious;
