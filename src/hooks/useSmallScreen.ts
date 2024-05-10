import { useState, useEffect } from 'react';

const useSmallScreen = (maxWidth = 768) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const matches = window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
      setIsSmallScreen(matches);
    };

    // Initial check on mount
    checkScreenSize();

    // Listen for resize events and update state
    const resizeListener = () => {
      checkScreenSize();
    };
    window.addEventListener('resize', resizeListener);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [maxWidth]); // Re-run effect if maxWidth changes

  return isSmallScreen;
};

export default useSmallScreen;
