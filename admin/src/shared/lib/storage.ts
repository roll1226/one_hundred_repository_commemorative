import { LOCAL_STORAGE_TYPE } from "@app/consts";

export const LocalStorages = {
  /**
   * LocalStorageに保存したJWTを取得
   *
   * @return string
   */
  getAuthToken: () => {
    if (typeof window === "undefined") return;
    return localStorage.getItem(LOCAL_STORAGE_TYPE.AUTH_TOKEN);
  },

  /**
   * Firebase AUthから取得してきたJWTをLocalStorageに保存
   *
   * @param token string
   */
  setAuthToken: (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(LOCAL_STORAGE_TYPE.AUTH_TOKEN, token);
  },

  /**
   * LocalStorageに保存してあるJWTを削除
   */
  removeAuthToken: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(LOCAL_STORAGE_TYPE.AUTH_TOKEN);
  },
} as const;
