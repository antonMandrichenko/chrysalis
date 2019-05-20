import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";

const styles = {
  root: {
    margin: 5
  },
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
  const { classes, changeColor } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(null);
  const [color, setColor] = useState(setRandomColor());

  const style = {
    background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    width: 50,
    height: 25,
    borderRadius: 2
  };

  const handleClick = e => {
    if (e.ctrlKey || e.shiftKey) {
      setDisplayColorPicker(!displayColorPicker);
    } else {
      changeColor(color);
    }
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color, e) => {
    setColor(color.rgb);
    changeColor(color.rgb, e);
  };

  return (
    <div className={classes.root}>
      <div className={classes.swatch} onClick={handleClick}>
        <div style={style} />
      </div>
      {displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <SketchPicker
            color={color}
            onChange={(color, e) => {
              handleChange(color, e);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default withStyles(styles)(ColorButton);
