/**
 * This is Reactjs functional component that create palette for selection background color
 */
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ColorButtonsPalette from "./ColorButtonsPalette";
import BigColorButton from "./BigColorButton";

const styles = {
  ourPalette: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
};

const numberFirstPanel = 10;
const numberSecondPanel = 20;

/**
 * Reactjs functional component that create palette for selection background color
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} changeBackgroundColor Function for change background color App.js
 */
function ColorPalette(props) {
  const { classes, changeBackgroundColor } = props;

  /**
   * This is Hook that lets add React state "colorFocusButton" to function components
   * @param {object} [initialState={r: 255, g: 255, b: 255, a: 1 }] - Sets initial state for "colorFocusButton" (white color).
   */
  const [colorFocusButton, setColorFocusButton] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1
  });

  /**
   * This is Hook that lets add React state "focusButton" to functional components
   * @param {object} [initialState=0] - Sets initial state for "focusButton".
   */
  const [focusButton, setFocusButton] = useState(10);

  /**
   * Change "colorFocusButton" and "prevColor" in functional component state
   * @param {object} color Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model
   */
  const toSetColorFocusButton = color => {
    setColorFocusButton(color);
  };

  /**
   * Change "focusButton" in its state, "colorFocusButton" in ColorPalette's state, "color" in App's state. Modify array of buttons colors
   * @param {number} index Number of value in array that focusing by mouse
   * @param {object} color Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model
   * @param {object} e This property is actually an object containing information about the action that just happened
   */
  const setIsFocus = (index, color, e) => {
    setFocusButton(index);
    setColorFocusButton(color);
    if (e.shiftKey || e.ctrlKey) changeBackgroundColor(color);
  };

  const propsToChild = {
    colorFocusButton,
    focusButton,
    setIsFocus
  };

  return (
    <React.Fragment>
      <Paper className={classes.ourPalette}>
        <ColorButtonsPalette {...propsToChild} panelNumber={numberFirstPanel} />
        <BigColorButton
          setColorFocusButton={toSetColorFocusButton}
          colorFocusButton={colorFocusButton}
        />
        <ColorButtonsPalette
          {...propsToChild}
          panelNumber={numberSecondPanel}
        />
      </Paper>
    </React.Fragment>
  );
}

export default withStyles(styles)(ColorPalette);
