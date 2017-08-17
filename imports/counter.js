// counter
import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query GetData {
    counter: local_counter {
      count
    }
    author(id: 1) {
      firstName
    }
  }
`;

const UPVOTE = gql`
  mutation UpVote {
    counter: local_upvote {
      count
    }
  }
`;

const DOWNVOTE = gql`
  mutation DownVote {
    counter: local_downvote {
      count
    }
  }
`;
const update = (store, { data: { counter } }) => {
  // Read the data from our cache for this query.
  const data = store.readQuery({ query: QUERY });
  // Add our comment from the mutation to the end.
  data.counter = counter;
  // Write our data back to the cache.
  store.writeQuery({ query: QUERY, data });
};

const withUpvote = graphql(UPVOTE, {
  props: ({ mutate }) => ({
    upvote: () => mutate({ update }),
  }),
});
const withDownvote = graphql(DOWNVOTE, {
  props: ({ mutate }) => ({
    downvote: () => mutate({ update }),
  }),
});

const withData = graphql(QUERY);

class Counter extends React.Component {
  render() {
    const { counter, author, loading } = this.props.data;
    const { downvote, upvote } = this.props;
    return (
      <div>
        <h5>
          Counter is {loading ? "loading..." : counter.count}
        </h5>
        {author &&
          <h6>
            written by {author.firstName}
          </h6>}
        <button type="button" data-spec="increment" onClick={upvote}>
          Up
        </button>
        <button type="button" data-spec="decrement" onClick={downvote}>
          Down
        </button>
      </div>
    );
  }
}

export default compose(withUpvote, withDownvote, withData)(Counter);
