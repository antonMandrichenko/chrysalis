/**
 * This is Reactjs functional component that create area for color battons
 * @extends ColorPalette
 */
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ColorButton from "./ColorButton";

const styles = {
  palette: {
    width: 440,
    padding: 10,
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    flexWrap: "wrap"
  }
};

/**
 * Reactjs functional component that create palette for selection background color
 * @return {object} The color object that defines colors using the Red-green-blue-alpha (RGBA) model.
 */

const setRandomColor = () => {
  const maxValue = 255;
  const randomR = Math.random();
  const randomG = Math.random();
  const randomB = Math.random();
  return {
    r: maxValue * randomR,
    g: maxValue * randomG,
    b: maxValue * randomB,
    a: 1
  };
};

/// Creates array of buttons colors and assigns values to it

let colorButtonsAmount = new Array(16).fill(0).map(() => setRandomColor());

/**
 * Reactjs functional component that create area for color battons
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {object} colorFocusButton Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model for focus button
 * @param {function} setColorFocusButton Function that set color of focus button
 * @param {function} changeBackgroundColor Function for change background color App.js
 */

function ColorButtonsPalette(props) {
  const {
    classes,
    colorFocusButton,
    setColorFocusButton,
    changeBackgroundColor
  } = props;

  /**
   * This is Hook that lets add React state "focusButton" to functional components
   * @param {object} [initialState=0] - Sets initial state for "focusButton".
   */

  const [focusButton, setFocusButton] = useState(0);

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
    colorButtonsAmount = colorButtonsAmount.map((colorButton, i) => {
      if (focusButton === i) return { ...colorFocusButton };
      return colorButton;
    });
  };

  return (
    <Paper className={classes.palette}>
      {colorButtonsAmount.map((colorButton, i) => {
        const isIdentity = i === focusButton;
        return (
          <ColorButton
            key={i}
            isFocus={isIdentity}
            setIsFocus={setIsFocus}
            index={i}
            color={isIdentity ? colorFocusButton : colorButton}
          />
        );
      })}
    </Paper>
  );
}

export default withStyles(styles)(ColorButtonsPalette);
