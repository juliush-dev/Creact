import React from "react";
import "./Story.css";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = {
      btnMaximizeView: (
        <FullscreenIcon
          className="btn-fullsize btn-fullsize-more"
          onClick={this.handleMaximizeView.bind(this, this.props.onMaximize)}
        />
      ),
      btnMinimizeView: (
        <FullscreenExitIcon
          className="btn-fullsize btn-fullsize-less"
          onClick={this.handleMinimizeView.bind(this, this.props.onMinimize)}
        />
      ),
      btnMore: (
        <ExpandMore
          className="btn-expand btn-expand-more"
          onClick={this.handleMore.bind(this, this.props.onLess)}
        />
      ),
      btnLess: (
        <ExpandLess
          className="btn-expand btn-expand-less"
          onClick={this.handleLess.bind(this, this.props.onMore)}
        />
      ),
    };

    this.state = {
      maxOrMinimizeBtn: this.buttons.btnMaximizeView,
      moreOrLess: this.buttons.btnLess,
      maximized: false,
    };
  }

  handleMaximizeView(callback) {
    this.setState({
      maxOrMinimizeBtn: this.buttons.btnMinimizeView,
      maximized: true,
    });
    callback && callback();
  }

  handleMinimizeView(callback) {
    this.setState({
      maxOrMinimizeBtn: this.buttons.btnMaximizeView,
      maximized: false,
    });
    callback && callback();
  }

  handleLess(callback) {
    this.setState({ moreOrLess: this.buttons.btnMore });
    callback && callback();
  }

  handleMore(callback) {
    this.setState({ moreOrLess: this.buttons.btnLess });
    callback && callback();
  }

  render() {
    return (
      <div className="title-bar">
        <h3 className="title">{this.props.title}</h3>
        &nbsp;
        <div className="title-bar-control-buttons">
          {!this.state.maximized && this.state.moreOrLess}
          {this.state.maxOrMinimizeBtn}
        </div>
      </div>
    );
  }
}

export default class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = { storyExpanded: false, storyFullView: false };
  }

  handleMaximizeView(callback) {
    this.setState({ storyFullView: true });
  }

  handleMinimizeView(callback) {
    this.setState({ storyFullView: false });
  }

  handleLess(callback) {
    this.setState({ storyExpanded: false });
  }

  handleMore(callback) {
    this.setState({ storyExpanded: true });
  }

  render() {
    return (
      <div className="story-container">
        <div className="story-wrapper">
          <header className="story-header">
            <img
              src={this.props.src}
              alt={this.props.alt}
              width={this.props.width}
              height={this.props.height}
            />
          </header>
          <section
            className={`story ${
              this.state.storyExpanded ? "story-expanded" : ""
            } ${this.state.storyFullView ? "story-full-view" : ""}`}
          >
            <TitleBar
              title={this.props.title}
              onMaximize={this.handleMaximizeView.bind(this)}
              onMinimize={this.handleMinimizeView.bind(this)}
              onMore={this.handleMore.bind(this)}
              onLess={this.handleLess.bind(this)}
            />
            <p className="story-text">{this.props.children}</p>
          </section>
        </div>
      </div>
    );
  }
}
