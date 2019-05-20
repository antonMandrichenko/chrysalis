/**
 * This is Reactjs functional component that create area for color battons
 * @extends ColorPalette
 */
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ColorButton from "./ColorButton";

const styles = {
  palette: {
    width: 260,
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
    panelNumber,
    focusButton,
    setIsFocus
  } = props;

  const [colorButtonsAmount, setColorButtonsAmount] = useState(
    new Array(8).fill(0).map(() => setRandomColor())
  );

  useEffect(() => {
    setColorButtonsAmount(
      colorButtonsAmount.map((colorButton, i) => {
        if (focusButton === i + panelNumber) return { ...colorFocusButton };
        return colorButton;
      })
    );
  }, [colorFocusButton]);

  return (
    <Paper className={classes.palette}>
      {colorButtonsAmount.map((colorButton, i) => {
        const indexButton = i + panelNumber;
        const isIdentity = indexButton === focusButton;
        return (
          <ColorButton
            key={i}
            isFocus={isIdentity}
            setIsFocus={setIsFocus}
            index={indexButton}
            color={isIdentity ? colorFocusButton : colorButton}
          />
        );
      })}
    </Paper>
  );
}

export default withStyles(styles)(ColorButtonsPalette);
