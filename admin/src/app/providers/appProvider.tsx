// import { client } from "@/clients/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "@app/apollo";
import { FC, ReactNode } from "react";
// import { AuthProvider } from "./AuthProvider";

type Props = { children: ReactNode };

export const AppProvider: FC<Props> = ({ children }) => {
  return (
    <ApolloProvider client={ApolloClient}>
      {/* <AuthProvider>{children}</AuthProvider> */}
      {children}
    </ApolloProvider>
  );
};
