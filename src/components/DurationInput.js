import React from "react";
import "./DurationInput.css";

export class DurationInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.min,
    };
  }

  handleOnChange(callback, e) {
    this.setState({ value: e.target.value });
    callback(e);
  }

  render() {
    const range = (
      <label htmlFor="range" className="durationInput">
        <input
          id="range"
          type="range"
          onChange={this.handleOnChange.bind(this, this.props.onChange)}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defaultValue={this.props.defaultValue}
          disabled={this.props.disabled}
        />
        &nbsp;
        {this.state.value}s
      </label>
    );
    return range;
  }
}
