import { dotEnv } from "@app/env";

export const Logger = {
  debug: (message?: unknown, ...optionalParams: never[]) => {
    if (dotEnv.isDevelopment()) {
      console.log(message, optionalParams);
    }
  },

  table: (message?: unknown, ...optionalParams: never[]) => {
    if (dotEnv.isDevelopment()) {
      console.table(message, optionalParams);
    }
  },
} as const;
