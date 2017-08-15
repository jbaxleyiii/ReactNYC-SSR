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
  backgroundImage:
    "url(https://www.apollodata.com/images/bg-image-orbit.svg), linear-gradient(160deg, #440F35 -5%, #533D72 10%, #EBF7FF 80%, #FFFFFF 90%)",
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
      <Slide transition={[]} style={dark}>
        <Heading size={8} textFont="secondary" textColor="light-secondary">
          <S type="italic">Expanding the React render target</S>
        </Heading>
        <Heading
          size={1}
          margin="20px 0 0 0"
          fit
          caps
          lineHeight={1}
          textColor="light-primary"
        >
          Server Side Rendering with GraphQL
        </Heading>
      </Slide>

      {/* Self */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="primary">
          Hello! I'm James
        </Heading>
        <Heading size={10} textFont="secondary" textColor="light-secondary">
          <S type="italic">Open Source at Meteor Development Group</S>
        </Heading>
      </Slide>

      {/* What */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="light-primary">
          Browser | Native | Server
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          React is a powerful abstraction for creating user interfaces. With
          render targets like React DOM and React Native, you can learn once,
          write anywhere to build powerful applications.<br />
          <br />
          <S type="bold italic">React SSR works.</S> It has a lot of room for
          improvement, but learning once and writing anywhere extends to server
          rendered apps as well.
        </Text>
      </Slide>

      {/* Frameworks */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="primary">
          Server Side React in the Community
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          Recently, SSR React apps have risen in popularity for library authors
          and framework developers alike.
          <List textFont="secondary" textColor="light-primary">
            <ListItem textSize="28px" margin="0 0 10px 0">
              Gatsby (https://www.gatsbyjs.org/)
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Next.js (https://github.com/zeit/next.js)
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Meteor (https://meteor.com)
            </ListItem>
          </List>
        </Text>
      </Slide>

      <Slide transition={[]} bgColor="light-primary">
        <Image
          width="80%"
          src="https://media.giphy.com/media/1M9fmo1WAFVK0/giphy.gif"
        />
      </Slide>

      {/* SEO */}
      <Slide transition={[]} style={dark}>
        <Heading caps lineHeight={1} textColor="primary">
          SEO
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          This is the most common reason that I hear from people of why they
          want SSR. It is true that crawlers like Google Bot have gotten better
          at crawling client side apps, however, SSR is still the best way to
          ensure your content is picked up by crawlers.
        </Text>
      </Slide>

      {/* Performance */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="primary">
          Performance
        </Heading>
        <Heading size={10} textFont="secondary" textColor="light-secondary">
          <S type="italic">* results may vary</S>
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          Depending on your target audience and key metric, SSR can actually
          slow down your application. It will put more pressure on your server
          and can create an "uncanny valley" of non interactable apps. However,
          for many use cases SSR can improve the useability of your site and
          lower the time it takes for people to use / enjoy your app.
        </Text>
      </Slide>

      {/* SEO */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="primary">
          Progressive Enhancement
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          For sites and apps that target a wide range of audiences, having SSR
          allows you to create a progressively enhanced expereience. When you
          deliver the basic expereience without requiring client side scripts,
          audiences with low end devices or poor connections are still able to
          engage your product. 30kb of html is easier to download and consume
          than 300kb + of js and parse time.
        </Text>
      </Slide>

      {/* Why GraphQL */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="primary">
          Why GraphQL
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          GraphQL is a query language for APIs and a runtime for fulfilling
          those queries with your existing data. One of the biggest wins of it
          is to make your apps more responsive than ever before by only loading
          the data you're actually using, and reducing the number of roundtrips
          to fetch all of the resources for a particular view. Instead of
          stacking network requests in componentDidMount, you can declare your
          data and render your component knowing you will have just what you
          requested.
        </Text>
      </Slide>

      {/* SSR Data */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="primary">
          Apollo makes data easy
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          One of the hardest problems with setting up SSR in javascript apps
          today is knowing how to adjust your client side code to work on the
          server. This is especially true of data fetching. Apollo solves this
          for you.
          <List textFont="secondary" textColor="light-primary">
            <ListItem textSize="28px" margin="0 0 10px 0">
              No route level data fetches
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Async data fetching
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Can support remote or local server data
            </ListItem>
          </List>
        </Text>
      </Slide>

      {/* Component */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="primary">
          Components Only
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          The React component model is incredibly effective. With tools like
          react-router 4 and popular css-in-js libs, all of the needs a
          component could have (routing, styling, content) live within the
          component model. Data should be the same way. Instead of declaring
          root level fetches and passing data way down the tree, we can use
          Apollo to let each component delcare its own data needs. This becomes
          especially critical on the server where we don't want to have to
          rewrite our data fetching code just for SSR.
        </Text>
      </Slide>

      <Slide transition={[]} style={dark}>
        <Heading
          size={1}
          margin="20px 0 0 0"
          fit
          caps
          lineHeight={1}
          textColor="light-primary"
        >
          Demo
        </Heading>
      </Slide>

      {/* Whats next */}
      <Slide transition={[]} style={dark}>
        <Heading fit caps lineHeight={1} textColor="primary">
          What's Next
        </Heading>
        <Text
          margin="30px 0 0 0"
          textColor="light-primary"
          textFont="secondary"
          textAlign="left"
          textSize="28px"
          lineHeight={1.4}
        >
          With React 16, support for stream rendering has been added. This is a
          great start, but as a render target, SSR React needs async data
          loading as a primary feature
          <List textFont="secondary" textColor="light-primary">
            <ListItem textSize="28px" margin="0 0 10px 0">
              renderToStreamWithData*
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Fragment SSR switches
            </ListItem>
            <ListItem textSize="28px" margin="0 0 10px 0">
              Server side mutations
            </ListItem>
          </List>
        </Text>
      </Slide>

      <Slide transition={[]} style={dark}>
        <Heading
          size={1}
          margin="20px 0 0 0"
          fit
          caps
          lineHeight={1}
          textColor="light-primary"
        >
          Questions?
        </Heading>
      </Slide>

      <Slide transition={[]} style={dark}>
        <Image
          width="100px"
          src={require("../assets/icon-apollo-white-128x128.png")}
        />

        <Heading
          size={1}
          margin="20px 0 0 0"
          fit
          caps
          lineHeight={1}
          textColor="light-primary"
        >
          Thank you!
        </Heading>
        <Heading size={6} textFont="secondary" textColor="light-primary">
          <S type="italic">@jbaxleyiii</S>
        </Heading>
      </Slide>
    </Deck>
  </Spectacle>;

export default Presentation;
