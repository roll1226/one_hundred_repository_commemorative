export const LOCAL_STORAGE_TYPE = {
  AUTH_TOKEN: "hasura-auth-token",
} as const;
export type LOCAL_STORAGE_TYPE =
  (typeof LOCAL_STORAGE_TYPE)[keyof typeof LOCAL_STORAGE_TYPE];
