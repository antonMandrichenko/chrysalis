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
  const { classes, changeColor, isKeyDown, handleKeyDown, handleKeyUp } = props;

  const [colorFocusButton, setColorFocusButton] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1
  });

  const toSetColorFocusButton = color => {
    setColorFocusButton(color);
  };

  return (
    <div>
      <Paper className={classes.ourPalette}>
        <ColorButtonsPalette
          setColorFocusButton={toSetColorFocusButton}
          colorFocusButton={colorFocusButton}
          changeColor={changeColor}
          isKeyDown={isKeyDown}
          handleKeyDown={handleKeyDown}
          handleKeyUp={handleKeyUp}
        />
        <BigColorButton
          setColorFocusButton={toSetColorFocusButton}
          colorFocusButton={colorFocusButton}
        />
      </Paper>
    </div>
  );
}

export default withStyles(styles)(ColorPalette);
