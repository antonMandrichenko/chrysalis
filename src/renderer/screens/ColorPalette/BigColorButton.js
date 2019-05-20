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
    background: `url(https://cdn.shopify.com/s/files/1/0285/1316/products/pw571-1_1000x1000.jpg?v=1472052730)`,
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
