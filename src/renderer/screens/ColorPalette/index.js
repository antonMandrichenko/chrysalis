import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ColorButtonsPalette from "./ColorButtonsPalette";
import BigColorButton from "./BigColorButton";

const styles = {
  ourPalette: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    padding: 20
  }
};

function ColorPalette(props) {
  const { classes, changeBackgroundColor } = props;

  const [colorFocusButton, setColorFocusButton] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1
  });

  const [prevColor, setPrevColor] = useState(null);

  const toSetColorFocusButton = color => {
    setColorFocusButton(color);
    setPrevColor(colorFocusButton);
  };

  return (
    <div>
      <Paper className={classes.ourPalette}>
        <ColorButtonsPalette
          setColorFocusButton={toSetColorFocusButton}
          colorFocusButton={colorFocusButton}
          changeBackgroundColor={changeBackgroundColor}
        />
        <BigColorButton
          setColorFocusButton={toSetColorFocusButton}
          colorFocusButton={colorFocusButton}
          prevColor={prevColor}
        />
      </Paper>
    </div>
  );
}

export default withStyles(styles)(ColorPalette);
