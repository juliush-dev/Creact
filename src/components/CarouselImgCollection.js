import React from "react";
import "./CarouselImgCollection.css";

export class CarouselImgCollection extends React.Component {
  render() {
    return (
      <div className="carouselImgCollection" style={this.props.style}>
        {this.props.collection}
      </div>
    );
  }
}
