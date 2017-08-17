// Import React
import React, { PropTypes } from "react";

// Import Spectacle Core tags
import { Deck, Spectacle, Slide, Heading, S } from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

export const theme = createTheme(
  {
    primary: "#DFECF2",
    secondary: "#22A699",
    tertiary: "#E5F2DE",

    "dark-primary": "#333333",
    "dark-secondary": "#444444",
    "dark-tertiary": "#666666",

    "light-primary": "#eeeeee",
    "light-secondary": "#cccccc",
    "light-tertiary": "#999999",

    alert: "#e04e4b",
  },
  {
    primary:
      "'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    secondary:
      "'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
);

const Presentation = () =>
  <Spectacle theme={theme}>
    <Deck transition={["zoom", "slide"]} transitionDuration={500}>
      {this.props.children}
    </Deck>
  </Spectacle>;

export default Presentation;

export const TitleSlide = ({ children }) =>
  <Slide transition={["zoom"]} bgColor="primary">
    {children}
  </Slide>;

TitleSlide.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const Title = ({ children }) =>
  <Heading
    size={1}
    margin="20px 0 0 0"
    fit
    caps
    lineHeight={1}
    textColor="light-primary"
  >
    {children}
  </Heading>;

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export const SubTitle = ({ children }) =>
  <Heading size={8} textFont="secondary" textColor="light-secondary">
    <S type="italic">
      {children}
    </S>
  </Heading>;

SubTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export { preloader };
