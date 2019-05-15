import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { SketchPicker } from "react-color";

const styles = {
  swatch: {
    padding: "5px",
    background: "#fff",
    borderRadius: "1px",
    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
    display: "inline-block",
    cursor: "pointer"
  },
  popover: {
    position: "absolute",
    zIndex: "2"
  },
  cover: {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px"
  }
};

function ColorButton(props) {
  const { classes } = props;

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1"
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = color => {
    console.log(color);
    setColor(color.rgb);
  };

  return (
    <React.Fragment>
      <div className={classes.swatch} onClick={handleClick}>
        <div
          style={{
            background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
            width: "36px",
            height: "14px",
            borderRadius: "2px"
          }}
        />
      </div>
      {displayColorPicker ? (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default withStyles(styles)(ColorButton);
