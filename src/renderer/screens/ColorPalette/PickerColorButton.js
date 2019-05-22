/**
 * This is Reactjs functional component that button to choose colors from Color Picker
 */
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";
import paletteIcon from "./palette.svg";

const styles = theme => ({
  root: {
    position: "relative",
    margin: "0 20px",
    [theme.breakpoints.down("sm")]: {
      order: "-1"
    }
  },
  swatch: {
    padding: 5,
    width: 40,
    height: 40,
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: "blue",
    background: `url(${paletteIcon}) no-repeat center center`,
    backgroundSize: "50% auto",
    boxShadow: "0px 11px 21px -9px rgba(0,0,0,0.75)"
  },
  popover: {
    position: "absolute",
    zIndex: "2",
    bottom: 42,
    left: -130,
    [theme.breakpoints.down("sm")]: {
      bottom: 0,
      left: 50
    },
    [theme.breakpoints.up(1320)]: {
      bottom: 0,
      left: 42
    }
  },
  cover: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});

/**
 * Reactjs functional component that create button to choose colors from Color Picker
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} setColorFocusButton Callback function from ColorPalette component
 * @param {object} colorFocusButton Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model for focus button
 */
function PickerColorButton(props) {
  const { classes, setColorFocusButton, colorFocusButton: color } = props;

  /**
   * This is Hook that lets add React state "displayColorPicker" to functional components
   * @param {boolean} [initialState=false] - Sets initial state for "displayColorPicker".
   */
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  /**
   * Change "displayColorPicker" in functional component state to open(close) Color Picker
   */
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  /**
   * Change "displayColorPicker" in functional component state to close Color Picker
   */
  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.swatch} onClick={handleClick} />
      {displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <SketchPicker
            color={color}
            onChange={color => {
              setColorFocusButton(color.rgb);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(PickerColorButton);
