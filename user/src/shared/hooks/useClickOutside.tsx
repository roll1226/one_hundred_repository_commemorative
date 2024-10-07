import { MutableRefObject } from "react";
import { useEventListener } from "./useEventListener";

type UseClickOutside = <E extends HTMLElement>(
  ref: MutableRefObject<E | null>,
  cb: (event: MouseEvent) => void
) => void;

export const useClickOutside: UseClickOutside = <E extends HTMLElement>(
  ref: MutableRefObject<E | null>,
  cb: (event: MouseEvent) => void
) => {
  useEventListener(
    "click",
    (e: MouseEvent) => {
      if (ref.current === null || ref.current.contains(e.target as Node))
        return;
      cb(e);
    },
    document
  );
};
