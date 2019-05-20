import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { PhotoshopPicker } from "react-color";
import { setRandomColor } from "./ColorButtonsPalette";

const styles = {
  root: {
    position: "relative",
    marginLeft: 20
  },
  swatch: {
    padding: 5,
    width: 120,
    height: 120,
    borderRadius: "50%",
    cursor: "pointer"
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

const randomColor = setRandomColor();

function BigColorButton(props) {
  const {
    classes,
    setColorFocusButton,
    colorFocusButton: color,
    prevColor
  } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const prevColorButton = prevColor ? prevColor : setRandomColor();
  const colorRGB = `${color.r}, ${color.g}, ${color.b}`;
  const prevColorRGB = `${prevColorButton.r}, ${prevColorButton.g}, ${
    prevColorButton.b
  }`;
  const randomColorRGB = `${randomColor.r}, ${randomColor.g}, ${randomColor.b}`;

  const style = {
    background: `linear-gradient(45deg, rgba(${colorRGB}, 1) 0%, rgba(${colorRGB}, 0) 80%),
    linear-gradient(285deg, rgba(${prevColorRGB}, 1) 0%, rgba(${prevColorRGB}, 0) 80%),
    linear-gradient(165deg, rgba(${randomColorRGB}, 1) 0%, rgba(${randomColorRGB}, 0) 80%)`
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.swatch} style={style} onClick={handleClick} />
      {displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <PhotoshopPicker
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
