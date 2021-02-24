import React from "react";
import "./CarouselNavigationControl.css";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

export class CarouselNavigationControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prevClicked: false, nextClicked: false };
  }

  handleOnPrevClicked(callback, e) {
    callback(e);
    this.setState({ prevClicked: true });
  }

  handleOnNextClicked(callback, e) {
    callback(e);
    this.setState({ nextClicked: true });
  }

  handleOnPrevMouseUp() {
    this.setState({ prevClicked: false });
  }
  handleOnNextMouseUp() {
    this.setState({ nextClicked: false });
  }

  render() {
    return (
      <div className="carouselNavigationControl">
        <ChevronLeft
          className={`prev ${
            this.state.prevClicked ? "prev-clicked" : "prev-unclicked"
          }`}
          color={this.props.prevBtnColor}
          onMouseDown={this.handleOnPrevClicked.bind(
            this,
            this.props.onPrevClick
          )}
          fontSize="large"
          onMouseUp={this.handleOnPrevMouseUp.bind(this)}
        />
        <ChevronRight
          className={`next ${
            this.state.nextClicked ? "next-clicked" : "next-unclicked"
          }`}
          color={this.props.nextBtnColor}
          onMouseDown={this.handleOnNextClicked.bind(
            this,
            this.props.onNextClick
          )}
          fontSize="large"
          onMouseUp={this.handleOnNextMouseUp.bind(this)}
        />
      </div>
    );
  }
}
