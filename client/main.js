import { render } from "react-dom";
import { onPageLoad } from "meteor/server-render";
import { BrowserRouter } from "react-router-dom";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import InmemoryCache from "apollo-cache-inmemory";
import HttpLink from "apollo-link-http";

import App from "/imports/counter";
import {
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} from "graphql-tools";
import { graphql } from "graphql";
import { ApolloLink, Observable } from "apollo-link-core";
import { createApolloFetch } from "apollo-fetch";
import { print } from "graphql/language/printer";
import { parse } from "graphql/language/parser";

let state = {
  count: 0,
};
const schemaString = `
schema {
  query: Query
  mutation: Mutation
}

type Query {
  counter: Counter
}

type Counter {
  count: Int!
}

type Mutation {
  upvote: Counter
  downvote: Counter
}
`;

const resolvers = {
  Query: {
    counter: () => state,
  },
  Mutation: {
    upvote: () => {
      state.count++;
      return state;
    },
    downvote: () => {
      state.count--;
      return state;
    },
  },
  Counter: {
    count: ({ count }) => count,
  },
};

const localSchema = makeExecutableSchema({
  typeDefs: [schemaString],
  resolvers,
});

const http = new HttpLink({ uri: "/graphql" });

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

export const start = async () => {
  const remoteSchema = await makeRemoteExecutableSchema(
    createApolloFetch({
      uri: "https://1jzxrj179.lp.gql.zone/graphql",
    }),
  );

  const schema = mergeSchemas({
    schemas: [
      { schema: remoteSchema },
      { schema: localSchema, prefix: "local" },
    ],
  });

  // simple local interface to query graphql directly
  const link = operation =>
    new Observable(observer => {
      const { query, variables, operationName } = operation;
      graphql(schema, print(query), {}, {}, variables, operationName)
        .then(result => {
          observer.next(result);
          observer.complete(result);
        })
        .catch(e => observer.error(e));
    });

  const client = new ApolloClient({
    cache: new InmemoryCache(window.__APOLLO_STATE__),
    link: ApolloLink.from([logger, link]),
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
