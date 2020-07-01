import { useState, useEffect } from 'react';

export default function useHeight(initialHeight: number = 0) {
  const [height, setHeight] = useState<number>(initialHeight);
  useEffect(() => {
    const handleResize = () => {
      setHeight(window.outerHeight);
      return () => setHeight(window.outerHeight);
    };
    window.addEventListener('resize', handleResize);
    return window.removeEventListener('resize', handleResize);
  }, []);

  return height;
}
