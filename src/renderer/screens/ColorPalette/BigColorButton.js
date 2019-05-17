import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { PhotoshopPicker } from "react-color";

const styles = {
  root: {
    position: "relative",
    marginLeft: 20
  },
  swatch: {
    padding: 5,
    width: 250,
    height: 120,
    background: `linear-gradient(to right, #F00 16.6%,
      #FF7400 16.6%, #FF7400 33.2%,
      #FFF400 33.2%, #FFF400 49.8%, 
      #41DB00 49.8%, #41DB00 66.5%, 
      #2618B1 66.5%, #2618B1 83.1%, 
      #640CAB 83.1%)`,
    cursor: "pointer"
  }
};

const popover = {
  position: "absolute",
  zIndex: "2",
  bottom: 0,
  right: 260
};
const cover = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

function BigColorButton(props) {
  const { classes, setColorFocusButton, colorFocusButton } = props;

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
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <PhotoshopPicker
            color={colorFocusButton}
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
