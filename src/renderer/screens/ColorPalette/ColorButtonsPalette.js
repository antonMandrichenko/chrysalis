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

export const setRandomColor = () => {
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

let colorButtonsAmount = new Array(16).fill(0).map(() => setRandomColor());

function ColorButtonsPalette(props) {
  const {
    classes,
    colorFocusButton,
    setColorFocusButton,
    changeBackgroundColor
  } = props;

  const [focusButton, setFocusButton] = useState(0);

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
