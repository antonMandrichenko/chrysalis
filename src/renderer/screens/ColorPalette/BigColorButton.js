import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";

const styles = {
  root: {
    position: "relative",
    margin: "0 20px"
  },
  swatch: {
    padding: 5,
    width: 120,
    height: 120,
    borderRadius: "50%",
    cursor: "pointer",
    background: `url(https://cdn0.iconfinder.com/data/icons/design-25/24/color_palette_paint_colors-512.png)`,
    backgroundSize: "100% auto"
  },
  popover: {
    position: "absolute",
    zIndex: "2",
    bottom: 0,
    right: 130
  },
  cover: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

function BigColorButton(props) {
  const { classes, setColorFocusButton, colorFocusButton: color } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

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

export default withStyles(styles)(BigColorButton);
