import { renderToString } from "react-dom/server";
import { onPageLoad } from "meteor/server-render";
import { getDataFromTree, ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloLink, Observable } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Helmet } from "react-helmet";
import { extractCritical } from "emotion/server";
import { StaticRouter } from "react-router";

import { WebApp } from "meteor/webapp";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";
import { graphql } from "graphql";
import { print } from "graphql/language/printer";

import { schema } from "/imports/schema";
import { App } from "/imports/app";

export const render = async sink => {
  const client = new ApolloClient({
    // simple local interface to query graphql directly
    link: new ApolloLink(({ query, variables, operationName }) => {
      return new Observable(obs => {
        graphql(schema, print(query), {}, {}, variables, operationName)
          .then(result => {
            obs.next(result);
            obs.complete();
          })
          .catch(obs.error.bind(obs));
      });
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  const context = {};
  const WrappedApp = (
    <ApolloProvider client={client}>
      <StaticRouter location={sink.request.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  // load all data from local server;
  await getDataFromTree(WrappedApp);

  const { html, ids, css } = extractCritical(renderToString(WrappedApp));
  const meta = Helmet.renderStatic();

  sink.appendToHead(meta.title.toString());
  sink.appendToHead(`<style>${css}</style>`);

  sink.renderIntoElementById("app", html);

  sink.appendToBody(`
    <script>
      window.__APOLLO_STATE__=${JSON.stringify(client.cache.extract())};
      window.__CSS__=${JSON.stringify(ids)}
    </script>
  `);
};

// hanlde SSR
onPageLoad(render);

// expose graphql endpoint
// setup GraphQL endpoint and GraphiQL
const server = express();

server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
  })),
);
server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

WebApp.connectHandlers.use(server);
