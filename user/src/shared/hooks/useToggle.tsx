import { MouseEvent, useState } from "react";

type ToggleValue = (
  value?: boolean | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
) => void;

type UseToggleReturn = [boolean, ToggleValue];

type UseToggle = (defaultValue: boolean) => UseToggleReturn;

export const useToggle: UseToggle = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const toggleValue: ToggleValue = (value) => {
    setValue((currentValue: boolean) =>
      typeof value === "boolean" ? value : !currentValue
    );
  };
  return [value, toggleValue];
};
