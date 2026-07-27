import { useEffect, useState } from 'react';

/**
 * Increments when the viewport width changes so GSAP layouts that measure
 * pixels (or bake breakpoint config) can fully rebuild without a page reload.
 */
export function useViewportRebuildKey() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const onChange = () => {
      setKey((prev) => prev + 1);
    };

    window.addEventListener('nw:viewport-width-change', onChange);
    return () => window.removeEventListener('nw:viewport-width-change', onChange);
  }, []);

  return key;
}
