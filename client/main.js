import { render } from "react-dom";
import { onPageLoad } from "meteor/server-render";
import { hydrate } from "emotion";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface,
} from "react-apollo";

import { App } from "/imports/app";

export const start = () => {
  hydrate(window.__CSS__);

  const client = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: "/graphql" }),
    initialState: { apollo: window.__APOLLO_STATE__ },
  });

  const WrappedApp = (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );

  render(WrappedApp, document.getElementById("app"));
};

onPageLoad(start);
