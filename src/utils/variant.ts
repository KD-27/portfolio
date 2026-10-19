import { useEffect, useState } from 'react';

// Layout previews: the chosen variant per section lives in the URL (?projects=...&lab=...)
// so a link reproduces exactly what was on screen.
const EVENT = 'variantchange';

const read = (key: string, fallback: string) => new URLSearchParams(window.location.search).get(key) ?? fallback;

export const useVariant = (key: string, fallback: string) => {
  const [value, setValue] = useState(() => read(key, fallback));
  useEffect(() => {
    const sync = () => setValue(read(key, fallback));
    window.addEventListener(EVENT, sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('popstate', sync);
    };
  }, [key, fallback]);
  return value;
};

export const setVariant = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(EVENT));
};
