import { RefObject, useEffect, useRef } from "react";

type EventType = keyof WindowEventMap | "change";

type UseEventListener = <K extends EventType, E extends Event>(
  eventType: K,
  callback: (event: E) => void,
  element?:
    | Window
    | Document
    | HTMLElement
    | MediaQueryList
    | RefObject<HTMLElement | null>
) => void;

export const useEventListener: UseEventListener = <
  K extends EventType,
  E extends Event
>(
  eventType: K,
  callback: (event: E) => void,
  element:
    | Window
    | Document
    | HTMLElement
    | MediaQueryList
    | RefObject<HTMLElement | null> = window
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetElement:
      | HTMLElement
      | Window
      | Document
      | MediaQueryList
      | null = element && "current" in element ? element.current : element;
    if (!targetElement) return;

    const handler = (event: E) => callbackRef.current(event);

    targetElement.addEventListener(eventType, handler as EventListener);
    return () =>
      targetElement.removeEventListener(eventType, handler as EventListener);
  }, [eventType, element]);
};
