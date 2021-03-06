/**
 * This is Reactjs functional component that create color batton
 */
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    padding: 5,
    cursor: "pointer"
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      width: 35,
      height: 35
    }
  }
});

const minWhiteColorValue = 220;

/**
 * Reactjs functional component that create area for color buttons
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {boolean} isFocus Change CSS styles
 * @param {function} setIsFocus Callback function from ColorPalette component
 * @param {number} index Current index of button
 * @param {object} color Current color of button
 */
function ColorButton(props) {
  const { classes, isFocus, setIsFocus, index, color } = props;

  ///checks background is white or not
  const isWhiteColor =
    color.r >= minWhiteColorValue &&
    color.g >= minWhiteColorValue &&
    color.b >= minWhiteColorValue;

  const style = {
    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
    border: !isWhiteColor
      ? `1px solid rgb(${color.r}, ${color.g}, ${color.b})`
      : "1px solid rgb(155, 155, 155)"
  };

  const styleInFocus = {
    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
    boxShadow: !isWhiteColor
      ? `0px 0px 26px 4px rgb(${color.r}, ${color.g}, ${color.b})`
      : `0px 0px 26px 4px rgb(155, 155, 155)`
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.button}
        style={isFocus ? styleInFocus : style}
        onClick={setIsFocus.bind(this, index, color)}
      />
    </div>
  );
}

export default withStyles(styles)(ColorButton);
