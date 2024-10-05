import { useEffect } from "react";

type UseEffectOnce = (cb: React.EffectCallback) => void;

export const useEffectOnce: UseEffectOnce = (cb) => {
  /** TODO: StrictMode時はマウント処理が二回実行される */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(cb, []);
};
