import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { TabNavigationController } from "./NavigationController";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <TabNavigationController />
  </ApolloProvider>
);

export default App;
