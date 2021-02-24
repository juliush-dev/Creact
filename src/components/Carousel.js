import React from "react";
import { CarouselNavigationControl } from "./CarouselNavigationControl";
import { CarouselImgCollection } from "./CarouselImgCollection";
import { DurationInput } from "./DurationInput";
import "./Carousel.css";

export default class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.btnColor = {
      primary: "primary",
      disabled: "disabled",
    };

    this.autoPlayDirection = {
      forward: "fw",
      backward: "bw",
    };

    this.state = {
      translation: 0,
      isNext: true,
      isPrevious: false,
      count: 1,
      speedRangeDisabled: false,
      autoPlaySpeed: 1,
      prevBtnColor: this.btnColor.disabled,
      nextBtnColor: this.btnColor.primary,
      autoPlayDirection: this.autoPlayDirection.forward,
    };
    this.autoPlayActivate = false;

    this.setIntervalID = 0;

    this.index = 0;
    this.width = Number.parseInt(this.props.width);
    this.height = Number.parseInt(this.props.height);
    this.collection = this.props.collection;
    this.step = this.width;
    this.autoPlayMinSpeed = this.state.autoPlaySpeed;
    this.autoPlayMaxSpeed = 9;
    this.autoPlaySpeedStep = 1;
  }

  nextImage(e) {
    if (e && this.autoPlayActivate) {
      clearInterval(this.setIntervalID);
      this.autoPlay(this.autoPlayDirection.forward);
      return;
    }

    if (this.index < this.collection.length - 1) {
      this.setNextBtnOn(true);
      this.index++;

      this.setState((state) => {
        return { translation: state.translation - this.step };
      });
      this.setState({ count: this.index + 1 });
      this.setNextBtnOn(false);
    }
  }

  setNextBtnOn(choice) {
    if (choice && this.index === 0) {
      this.setState({ isPrevious: false });
      this.setState({ prevBtnColor: this.btnColor.primary });
    } else if (this.index === this.collection.length - 1) {
      this.setState({ isNext: false });
      this.setState({ nextBtnColor: this.btnColor.disabled });
      if (this.autoPlayActivate) {
        clearInterval(this.setIntervalID);
      }
    }
  }

  previousImage(e) {
    if (e && this.autoPlayActivate) {
      clearInterval(this.setIntervalID);
      this.autoPlay(this.autoPlayDirection.backward);
      return;
    }
    if (this.index > 0) {
      this.setPrevBtnOn(true);
      this.index--;
      this.setState((state) => {
        return { translation: state.translation + this.step };
      });
      this.setState({ count: this.index + 1 });
      this.setPrevBtnOn(false);
    }
  }

  setPrevBtnOn(value) {
    if (value && this.index === this.collection.length - 1) {
      this.setState({ isNext: true });
      this.setState({ nextBtnColor: this.btnColor.primary });
    } else if (this.index === 0) {
      this.setState({ isPrevious: false });
      this.setState({ prevBtnColor: this.btnColor.disabled });
      if (this.autoPlayActivate) {
        clearInterval(this.setIntervalID);
      }
    }
  }

  //   initCarouselCollection() {
  //     return this.images.map((value, index) => (
  //       <img
  //         key={index.toString()}
  //         src={value}
  //         alt={value.split(".")[1]}
  //         style={{
  //           width: `${this.width}px`,
  //           height: `${this.height}px`,
  //         }}
  //       />
  //     ));
  //   }

  autoPlay(direction, e) {
    if (e) {
      //if the call comes from the user interaction
      this.autoPlayActivate = e.target.checked;
      this.setState({ speedRangeDisabled: this.autoPlayActivate });
      if (!this.autoPlayActivate && this.setIntervalID) {
        clearInterval(this.setIntervalID);
      }
    }
    if (this.autoPlayActivate) {
      this.setIntervalID = setInterval(() => {
        switch (direction) {
          case this.autoPlayDirection.forward:
            this.nextImage();
            break;
          case this.autoPlayDirection.backward:
            this.previousImage();
            break;
          default:
            break;
        }
      }, this.state.autoPlaySpeed * 1000);
    }
  }

  setAutoPlaySpeed(e) {
    this.setState({ autoPlaySpeed: e.target.value });
  }

  render() {
    return (
      <div className="carousel-container">
        <header>
          <h2>{this.props.title}</h2>
        </header>
        <section
          className="carousel-content"
          style={{
            width: `${this.width + 20}px`,
            height: `${this.height + 20}px`,
          }}
        >
          <div className="wrapper">
            <CarouselImgCollection
              collection={this.collection}
              style={{ transform: `translateX(${this.state.translation}px)` }}
            />
            <CarouselNavigationControl
              prevBtnColor={this.state.prevBtnColor}
              nextBtnColor={this.state.nextBtnColor}
              onPrevClick={this.previousImage.bind(this)}
              onNextClick={this.nextImage.bind(this)}
            />
          </div>
        </section>
        <footer>
          <h3>
            {this.state.count} / {this.collection.length}
          </h3>
          <form>
            <label>
              <input
                type="checkbox"
                onClick={this.autoPlay.bind(
                  this,
                  this.index >= 0 && this.index < this.collection.length - 1
                    ? this.autoPlayDirection.forward
                    : this.autoPlayDirection.backward
                )}
              />{" "}
              &nbsp; Auto play
            </label>
            <DurationInput
              onChange={this.setAutoPlaySpeed.bind(this)}
              min={this.autoPlayMinSpeed}
              max={this.autoPlayMaxSpeed}
              step={this.autoPlaySpeedStep}
              defaultValue={this.autoPlayMinSpeed}
              disabled={this.state.speedRangeDisabled}
              totalItems={this.collection.length}
            />
          </form>
        </footer>
      </div>
    );
  }
}
