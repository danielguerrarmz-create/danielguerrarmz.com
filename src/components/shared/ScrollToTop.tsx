import { useEffect, useRef } from 'react';

export interface ScrollToTopProps {
  trigger: unknown;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

export function ScrollToTop({ trigger, scrollRef }: ScrollToTopProps) {
  const prevTriggerRef = useRef(trigger);

  useEffect(() => {
    if (prevTriggerRef.current !== trigger) {
      prevTriggerRef.current = trigger;
      const el = scrollRef?.current ?? document.querySelector('.overflow-y-auto');
      if (el) {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [trigger, scrollRef]);

  return null;
}
