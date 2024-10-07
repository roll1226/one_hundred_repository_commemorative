import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type UseStorageReturn<T> = [T, Dispatch<SetStateAction<T>>, () => void];
type UseLocalStorage = <T>(key: string, defaultValue: T) => UseStorageReturn<T>;
type UseSessionStorage = <T>(
  key: string,
  defaultValue: T
) => UseStorageReturn<T>;
type UseStorage = <T>(
  key: string,
  defaultValue: T,
  storageObject: Storage
) => UseStorageReturn<T>;

export const useLocalStorage: UseLocalStorage = (key, defaultValue) => {
  return useStorage(key, defaultValue, window.localStorage);
};

export const useSessionStorage: UseSessionStorage = (key, defaultValue) => {
  return useStorage(key, defaultValue, window.sessionStorage);
};

const useStorage: UseStorage = <T,>(
  key: string,
  defaultValue: T,
  storageObject: Storage
): UseStorageReturn<T> => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof defaultValue === "function") {
      return (defaultValue as () => T)();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined as unknown as T);
  }, []);

  return [value, setValue, remove];
};
