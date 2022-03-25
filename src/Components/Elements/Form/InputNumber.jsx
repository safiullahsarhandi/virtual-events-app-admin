import React, { Component } from "react";

class InputNumber extends React.Component {
  handleChange = (e) => {
    if (this.props.max ? e.target.value.length <= this.props.max : true)
      if (e.target.value >= 0) this.props.onChange(e.target.value);
  };

  formatInput = (e) => {
    // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
    let checkIfNum;
    if (e.key !== undefined) {
      // Check if it's a "e", ".", "+" or "-"
      const filter = this.props.enable_dot
        ? e.key === "e" || e.key === "+" || e.key === "-"
        : e.key === "e" || e.key === "." || e.key === "+" || e.key === "-";
      checkIfNum = filter;
    } else if (e.keyCode !== undefined) {
      // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
      checkIfNum =
        e.keyCode === 69 ||
        e.keyCode === 190 ||
        e.keyCode === 187 ||
        e.keyCode === 189;
    }
    return checkIfNum && e.preventDefault();
  };

  render() {
    return (
      <>
        <input
          name="numInput"
          value={this.props.value}
          onChange={this.handleChange}
          onKeyDown={this.formatInput}
          className={this.props.className}
          type="number"
          style={this.props.style}
          id={this.props.id}
          placeholder={this.props.placeholder}
        />
        <div className="form-control-position" style={{ width: "3rem" }}>
          {this.props.startIcon ? this.props.startIcon : null}
          {this.props.endIcon ? this.props.endIcon : null}
        </div>
      </>
    );
  }
}

export default InputNumber;
