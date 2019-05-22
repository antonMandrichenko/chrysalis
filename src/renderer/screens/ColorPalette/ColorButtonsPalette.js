/**
 * This is Reactjs functional component that create area for color battons
 */
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ColorButton from "./ColorButton";
import PickerColorButton from "./PickerColorButton";

const styles = {
  palette: {
    padding: 10,
    border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

/**
 * Function that independently sets color using the Red-green-blue-alpha (RGBA) model
 * @return {object} The color object that defines color
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

const arrayLength = 16;

/**
 * Reactjs functional component that create area for color battons
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {object} colorFocusButton Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model for focus button
 * @param {number} panelNumber
 * @param {number} focusButton Number of focus button
 * @param {function} setIsFocus Callback function from ColorPalette component
 */
function ColorButtonsPalette(props) {
  const {
    classes,
    colorFocusButton,
    panelNumber,
    focusButton,
    setIsFocus,
    setColorFocusButton
  } = props;

  /**
   * This is Hook that lets add React state "colorButtonsAmount" to function components
   * @param {array} [state] Array with eight color elements
   */
  const [colorButtonsAmount, setColorButtonsAmount] = useState(
    new Array(arrayLength).fill(0).map(() => setRandomColor())
  );

  /**
   * Change "colorButtonsAmount", if "colorFocusButton" is different
   */
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
            key={indexButton}
            isFocus={isIdentity}
            setIsFocus={setIsFocus}
            index={indexButton}
            color={isIdentity ? colorFocusButton : colorButton}
          />
        );
      })}
      <PickerColorButton
        setColorFocusButton={setColorFocusButton}
        colorFocusButton={colorFocusButton}
      />
    </Paper>
  );
}

export default withStyles(styles)(ColorButtonsPalette);
