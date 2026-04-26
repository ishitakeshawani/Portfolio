import type { MouseEvent } from 'react';

export const handleSpotlight = (event: MouseEvent<HTMLElement>) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
  el.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
};
