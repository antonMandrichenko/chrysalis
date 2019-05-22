/**
 * This is Reactjs functional component that create palette for selection background color
 */
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ColorButtonsPalette from "./ColorButtonsPalette";
import PickerColorButton from "./PickerColorButton";

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px
    ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down("sm")]: {
      width: 500
    }
  },
  palette: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    border: "1px solid black",
    [theme.breakpoints.down("sm")]: {
      border: "none",
      flexDirection: "column"
    }
  },
  grid: {
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      border: "1px solid black"
    }
  }
});

const numberFirstPanel = 10;
const numberSecondPanel = 20;

/**
 * Reactjs functional component that create palette for selection background color
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
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
   * @param {object} [initialState=10] - Sets initial state for "focusButton".
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
   * Change "focusButton" in its state, "colorFocusButton" in ColorPalette's state.
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
    <div className={classes.root}>
      <Paper className={classes.palette}>
        <Paper className={classes.grid}>
          <Grid container alignContent="center">
            <Grid item xs={12} md={6}>
              <ColorButtonsPalette
                {...propsToChild}
                panelNumber={numberFirstPanel}
                setColorFocusButton={toSetColorFocusButton}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ColorButtonsPalette
                {...propsToChild}
                panelNumber={numberSecondPanel}
                setColorFocusButton={toSetColorFocusButton}
              />
            </Grid>
          </Grid>
        </Paper>
        <PickerColorButton
          setColorFocusButton={toSetColorFocusButton}
          colorFocusButton={colorFocusButton}
        />
      </Paper>
    </div>
  );
}

export default withStyles(styles)(ColorPalette);
