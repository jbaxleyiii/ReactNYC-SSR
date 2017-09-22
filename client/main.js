import { render } from "react-dom";
import { onPageLoad } from "meteor/server-render";
import { hydrate } from "emotion";
import { BrowserRouter } from "react-router-dom";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import HttpLink from "apollo-link-http";
import InmemoryCache from "apollo-cache-inmemory";

import { App } from "/imports/app";

export const start = () => {
  hydrate(window.__CSS__);

  const client = new ApolloClient({
    cache: new InmemoryCache().restore(window.__APOLLO_STATE__ || {}),
    link: new HttpLink({ uri: "/graphql" }),
    connectToDevTools: true,
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
