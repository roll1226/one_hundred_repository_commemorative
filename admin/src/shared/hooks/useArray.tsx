import { useState } from "react";

type UseArrayReturn<T> = {
  array: T[];
  set: React.Dispatch<React.SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
};

type UseArray = <T>(defaultValue: T[]) => UseArrayReturn<T>;

export const useArray: UseArray = <T,>(
  defaultValue: T[]
): UseArrayReturn<T> => {
  const [array, setArray] = useState<T[]>(defaultValue);

  const push = (element: T) => {
    setArray((a) => [...a, element]);
  };

  const filter = (
    callback: (value: T, index: number, array: T[]) => boolean
  ) => {
    setArray((a) => a.filter(callback));
  };

  const update = (index: number, newElement: T) => {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  };

  const remove = (index: number) => {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  };

  const clear = () => {
    setArray([]);
  };

  return { array, set: setArray, push, filter, update, remove, clear };
};
