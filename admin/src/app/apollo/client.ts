import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { dotEnv } from "@app/env";
import { Logger } from "@shared/lib";
import { HasuraLogger } from "@app/hasura";
import { clientHeader } from "./clientHeader";

const errorLink = onError((errors) => {
  const { graphQLErrors, networkError } = errors;
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      Logger.debug(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) Logger.debug(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
  uri: dotEnv.getHasuraGraphQLEndpoint(),
  headers: clientHeader,
});

const wsLink = new WebSocketLink({
  uri: `${dotEnv.getHasuraGraphQLWebsocketEndpoint()}`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: clientHeader,
    },
  },
});

// NOTE:開発環境のみ読み出されるようにする
HasuraLogger.Messages();

const link = ApolloLink.from([errorLink]).split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache({
  typePolicies: {
    Subscription: {
      fields: {
        tasks: {
          merge: false,
        },
      },
    },
  },
});

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  cache,
  connectToDevTools: true, // NOTE: 開発環境のみtrueになるようにする
  link,
});
