import { graphql } from "react-apollo";
import { Helmet } from "react-helmet";
import gql from "graphql-tag";
import styled from "emotion/react";
import { css } from "emotion";
import { Link, Route, Switch } from "react-router-dom";

const Card = styled(Link)`
  width: 200px;
  height: 200px;
  border: 15px solid white;
  background-size: cover;
  background-position: center center;
  margin: auto;
  background-image: ${props => `url('${props.image}')`};
`;

const background = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Background = styled("div")`
  composes: ${background};
  background-color: darksalmon;
`;

const FullScreen = styled("div")`
  composes: ${background};
  background-color: transparent;
`;

const BlurryBackground = styled("div")`
  composes: ${background};
  background-image: ${props => `url('${props.image}')`};
  -webkit-filter: blur(.25px);
	filter: blur(.25px);
`;

const MOVIE_QUERY = gql`
  query GetMovies {
    movies {
      id
      name
      image
      episode
    }
  }
`;

const withMovies = graphql(MOVIE_QUERY, {
  props: ({ data }) => ({ ...data }),
});

export const Movies = withMovies(({ loading, movies, error }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <h1>ERROR</h1>;
  return (
    <div>
      <Helmet>
        <title>
          {movies.map(x => x.name).join(" || ")}
        </title>
      </Helmet>
      <Background>
        {movies.map(movie =>
          <Card to={`/${movie.episode}`} image={movie.image} key={movie.id} />,
        )}
      </Background>
    </div>
  );
});

const HERO_QUERY = gql`
  query GetEpisode($episode: Episode!) {
    character: hero(episode: $episode) {
      id
      name
      image
      friends {
        id
        name
        image
      }
    }
  }
`;

export const Character = ({ loading, character, error, networkStatus }) => {
  if (!character) return null;
  return (
    <div>
      <BlurryBackground image={character.image} />
      <FullScreen>
        {character.friends.map(friend =>
          <Card
            to={`/character/${friend.id}`}
            image={friend.image}
            key={friend.id}
          />,
        )}
      </FullScreen>
    </div>
  );
};

const withHero = graphql(HERO_QUERY, {
  options: ({ match }) => ({
    variables: {
      episode: match.params.episode,
    },
  }),
  props: ({ data }) => ({ ...data }),
});

export const Hero = withHero(Character);

export const CHARACTER_QUERY = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      friends {
        id
        name
        image
      }
    }
  }
`;

const withCharacter = graphql(CHARACTER_QUERY, {
  options: ({ match }) => ({ variables: { id: match.params.id } }),
  props: ({ data }) => ({ ...data }),
});

export const CharacterWithData = withCharacter(Character);

export const App = () =>
  <div>
    <Route exact path="/" component={Movies} />
    <Switch>
      <Route path="/character/:id" component={CharacterWithData} />
      <Route path="/:episode" component={Hero} />
    </Switch>
  </div>;
