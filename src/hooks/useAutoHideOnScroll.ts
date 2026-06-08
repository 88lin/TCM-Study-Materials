import { useEffect, useRef, useState } from 'react';

export function useAutoHideOnScroll(hideAfter = 96) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const delta = 8;
    const showAtTop = 24;
    let lastTouchY: number | null = null;

    function update() {
      const currentY = Math.max(window.scrollY, 0);
      const diff = currentY - lastScrollY.current;

      if (currentY <= showAtTop) {
        setHidden(false);
      } else if (diff > delta && currentY > hideAfter) {
        setHidden(true);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    }

    function onScroll() {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    }

    function onWheel(event: WheelEvent) {
      if (event.deltaY > 12 && window.scrollY > hideAfter) {
        setHidden(true);
      }
    }

    function onTouchStart(event: TouchEvent) {
      lastTouchY = event.touches[0]?.clientY ?? null;
    }

    function onTouchMove(event: TouchEvent) {
      const currentTouchY = event.touches[0]?.clientY;
      if (typeof currentTouchY !== 'number' || lastTouchY === null) return;

      const touchDiff = currentTouchY - lastTouchY;
      if (touchDiff < -10 && window.scrollY > hideAfter) {
        setHidden(true);
      }

      lastTouchY = currentTouchY;
    }

    lastScrollY.current = Math.max(window.scrollY, 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [hideAfter]);

  return hidden;
}
