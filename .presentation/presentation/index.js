// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Deck,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  S,
  Slide,
  Spectacle,
  Text,
} from "spectacle";

import CodeSlide from "spectacle-code-slide";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

import { theme } from "./theme";

const purple = {
  backgroundSize: "cover",
  backgroundPosition: "top left",
  backgroundImage:
    "url(https://www.apollodata.com/images/bg-image-orbit.svg), linear-gradient(160deg, #440F35 -15%, #533D72 20%, #EBF7FF 90%, #FFFFFF 105%)",
};
const dark = {
  backgroundImage:
    "url(https://www.apollodata.com/images/bg-image-orbit.svg), linear-gradient(165deg, #050325 0%, #3A3353 40%, #D38981 80%, #FED3CF 95%)",
};
const getImage = image => {
  if (image && images[image]) {
    return images[image].replace("/", "");
  }
  return images.orange.replace("/", "");
};

const Presentation = () =>
  <Spectacle theme={theme}>
    <Deck transition={["fade", "slide"]} transitionDuration={500}>
      {/* Intro */}
      <Slide transition={[]} style={purple}>
        <Heading
          size={1}
          margin="0 0 20px 0"
          lineHeight={1}
          style={{ fontWeight: 300 }}
          textColor="light-primary"
          textAlign="left"
        >
          Apollo Client 2.0
        </Heading>
        <Heading
          textAlign="left"
          size={6}
          style={{ fontWeight: 400, fontSize: "28px" }}
          textFont="secondary"
          textColor="light-primary"
        >
          Expanding GraphQL without breaking your app
        </Heading>
      </Slide>
      <Slide transition={[]} style={purple}>
        <Heading
          size={3}
          margin="0 0 20px 0"
          lineHeight={1}
          style={{ fontWeight: 300 }}
          textColor="light-primary"
          textAlign="center"
        >
          Hello! I'm James
        </Heading>
      </Slide>
      <Slide transition={[]} style={purple}>
        <Heading
          size={2}
          textAlign="left"
          style={{ fontWeight: 300 }}
          lineHeight={1}
          textColor="primary"
        >
          Apollo Client 1.0
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          Apollo Client 1.0 focused on stabilzing the core expereience around
          integrating GraphQL into your app. It shipped with a network layer,
          caching layer, and core manager for orchestrating operation
          executions.
          <List textFont="secondary" textColor="light-primary">
            <ListItem textSize="28px" margin="0 0 10px 0">
              Network Interface
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Apollo Store / Redux
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Query Manager
            </ListItem>
          </List>
        </Text>
      </Slide>
      <Slide transition={[]} style={purple}>
        <Heading
          size={2}
          textAlign="left"
          style={{ fontWeight: 300 }}
          lineHeight={1}
          textColor="primary"
        >
          Problems
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          As more people adopted Apollo Client (thank you!) more edge case /
          advanced usage patterns began to come into the core code base. This
          made Apollo large and more prone to edge case bugs
          <List textFont="secondary" textColor="light-primary">
            <ListItem textSize="28px" margin="0 0 10px 0">
              Query Batching
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Store Updates
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Polling
            </ListItem>
          </List>
        </Text>
      </Slide>
      <Slide transition={[]} style={purple}>
        <Heading
          size={2}
          textAlign="left"
          style={{ fontWeight: 300 }}
          lineHeight={1}
          textColor="primary"
        >
          Solution
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          Apollo Client 2.0 is an itterative improvement on the 1.0 with a focus
          on backwards compatibility. Instead of breaking your application code,
          you just enhance your client
          <List textFont="secondary" textColor="light-primary">
            <ListItem textSize="28px" margin="0 0 10px 0">
              Apollo Link
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Apollo Cache
            </ListItem>
          </List>
        </Text>
      </Slide>
      <Slide transition={[]} style={purple}>
        <Heading
          size={2}
          textAlign="left"
          style={{ fontWeight: 300 }}
          lineHeight={1}
          textColor="primary"
        >
          Demos [excite]
        </Heading>
      </Slide>
    </Deck>
  </Spectacle>;

export default Presentation;
