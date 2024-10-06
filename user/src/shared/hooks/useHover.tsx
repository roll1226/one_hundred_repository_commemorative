import { MutableRefObject, useState } from "react";
import { useEventListener } from "./useEventListener";

type UseHover = (ref: MutableRefObject<HTMLElement | null>) => boolean;

export const useHover: UseHover = (ref) => {
  const [hovered, setHovered] = useState(false);
  useEventListener("mouseover", () => setHovered(true), ref);
  useEventListener("mouseout", () => setHovered(false), ref);
  return hovered;
};
