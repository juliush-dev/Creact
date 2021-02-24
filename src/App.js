import React from "react";
import "./App.css";
import Carousel from "./components/Carousel";
import Story from "./components/Story";

//width x height = the dimension of one image
const width = 900;
const height = 600;

const collection = [
  `https://source.unsplash.com/collection/647976/${width}x${height}`,
  `https://source.unsplash.com/collection/211624/${width}x${height}`,
  `https://source.unsplash.com/collection/677236/${width}x${height}`,
  `https://source.unsplash.com/collection/1259559/${width}x${height}`,
  `https://source.unsplash.com/collection/2592950/${width}x${height}`,
  `https://source.unsplash.com/collection/1025231/${width}x${height}`,
  `https://source.unsplash.com/collection/3369840/${width}x${height}`,
];

const stories = collection.map((value, index) => (
  <Story
    src={value}
    width={width}
    height={height}
    alt="somewhere in japan"
    key={index}
    title="Lorem Ipsum"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur.
  </Story>
));

class App extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Carousel
          collection={stories}
          width={width}
          height={height}
          title="One day in Texas"
        />
      </div>
    );
  }
}

export default App;
