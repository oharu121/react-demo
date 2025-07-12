import { useCallback, useLayoutEffect, useState } from "react";

type UseNextTickReturn = {
  /**
   * @returns A promise that resolves after the next DOM layout update.
   */
  nextTick: () => Promise<void>;
};

export const useNextTick = (): UseNextTickReturn => {
  const [resolver, setResolver] = useState<(() => void) | undefined>();

  // This effect runs *after* React has committed changes to the DOM.
  useLayoutEffect(() => {
    if (resolver) {
      resolver(); // Resolve the promise from the previous render.
      setResolver(undefined); // Clean up the resolver.
    }
  }, [resolver]);

  const nextTick = useCallback(() => {
    // Create a new promise and store its resolve function in state.
    // This state change triggers a re-render, which then triggers the
    // useLayoutEffect above.
    const { promise, resolve } = Promise.withResolvers<void>();
    setResolver(() => resolve);
    return promise;
  }, []);

  return { nextTick };
};