import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { dotEnv } from "@app/env";

export const Logger = {
  Messages: () => {
    if (dotEnv.isDevelopment()) {
      loadDevMessages();
      loadErrorMessages();
    }
  },
} as const;
