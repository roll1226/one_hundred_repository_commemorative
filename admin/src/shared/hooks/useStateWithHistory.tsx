import { useCallback, useRef, useState } from "react";

type Options = {
  capacity?: number;
};

type UseStateWithHistoryReturn<T> = [
  T,
  (value: T | ((prevValue: T) => T)) => void,
  {
    history: T[];
    pointer: number;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
  }
];

type UseStateWithHistory = <T>(
  defaultValue: T,
  { capacity }?: Options
) => UseStateWithHistoryReturn<T>;

export const useStateWithHistory: UseStateWithHistory = <T,>(
  defaultValue: T,
  { capacity = 10 } = {}
) => {
  const [value, setValue] = useState<T>(defaultValue);
  const historyRef = useRef<T[]>([value]);
  const pointerRef = useRef(0);

  const set = useCallback(
    (v: T | ((prevValue: T) => T)) => {
      const resolvedValue =
        typeof v === "function" ? (v as (prevValue: T) => T)(value) : v;
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);
        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setValue(resolvedValue);
    },
    [capacity, value]
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback((index: number) => {
    if (index < 0 || index > historyRef.current.length - 1) return;
    pointerRef.current = index;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go,
    },
  ];
};
