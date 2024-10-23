import { useEffect, useState } from "react";

export function useFadeIn(delay: number = 100) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setFadeIn(true), delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  return fadeIn;
}
