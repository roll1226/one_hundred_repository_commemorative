import { dotEnv } from "@app/env";
import { LocalStorages } from "@shared/lib";

const authToken = LocalStorages.getAuthToken();
export const clientHeader: Record<string, string> = authToken
  ? {
      Authorization: `Bearer ${authToken}`,
    }
  : {
      "x-hasura-admin-secret": `${dotEnv.getHasuraGraphQLAdminSecret()}`,
      "x-hasura-role": "anonymous",
    };
