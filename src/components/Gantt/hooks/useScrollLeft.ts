import { RefObject, useCallback, useEffect, useState } from "react";
import { debounce } from "../utils/debounce";

export const useScrollLeft = (
  ref: RefObject<HTMLDivElement>,
  debounceTime: number = 100
): number => {
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  // Create a debounced version of setScrollLeft
  const debouncedSetScrollLeft = useCallback(
    debounce((value: number) => {
      setScrollLeft(value);
    }, debounceTime),
    [debounceTime]
  );

  useEffect(() => {
    const currentElement = ref.current;

    if (!currentElement) return;

    const handleScroll = () => {
      debouncedSetScrollLeft(currentElement.scrollLeft);
    };

    currentElement.addEventListener("scroll", handleScroll);

    setScrollLeft(currentElement.scrollLeft);

    return () => {
      currentElement.removeEventListener("scroll", handleScroll);
    };
  }, [ref, debouncedSetScrollLeft]);

  return scrollLeft;
};
