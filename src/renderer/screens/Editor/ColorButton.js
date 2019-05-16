import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";

const styles = {
  swatch: {
    padding: 5,
    background: "#fff",
    borderRadius: "1px",
    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
    display: "inline-block",
    cursor: "pointer"
  },
  popover: {
    position: "absolute",
    zIndex: 2
  },
  cover: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

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

function ColorButton(props) {
  const { classes, changeColor, isKeyDown, handleKeyDown, handleKeyUp } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(null);
  const [color, setColor] = useState(setRandomColor());

  const style = {
    background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    width: 50,
    height: 25,
    borderRadius: 2
  };

  const handleClick = () => {
    if (!isKeyDown) {
      setDisplayColorPicker(!displayColorPicker);
    } else {
      changeColor(color);
    }
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = color => {
    setColor(color.rgb);
    changeColor(color.rgb);
  };

  return (
    <div>
      <div
        className={classes.swatch}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex="0"
      >
        <div style={style} />
      </div>
      {displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(ColorButton);
