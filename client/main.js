import { render } from "react-dom";
import { onPageLoad } from "meteor/server-render";
import { hydrate } from "emotion";
import { BrowserRouter } from "react-router-dom";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import HttpLink from "apollo-link-http";
import InmemoryCache from "apollo-cache-inmemory";

import { ApolloLink } from "apollo-link-core";
import { print } from "graphql/language/printer";

import { App } from "/imports/app";

const logger = (operation, forward) => {
  const { operationName, query, variables, context } = operation;

  // create group
  console.group(operationName);
  // log operation
  console.log({ operationName, variables, context, query: print(query) });

  // make request
  return forward(operation).map(({ data, errors }) => {
    // log result
    console.log({ data, errors });
    console.groupEnd();
    return { data, errors };
  });
};

export const start = () => {
  hydrate(window.__CSS__);

  const client = new ApolloClient({
    cache: new InmemoryCache(window.__APOLLO_STATE__),
    link: ApolloLink.from([logger, new HttpLink({ uri: "/graphql" })]),
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
