import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    padding: 5,
    cursor: "pointer"
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 5
  }
};

function ColorButton(props) {
  const { classes, isFocus, setIsFocus, index, color } = props;

  const isNotWhiteColor = color.r !== 255 && color.g !== 255 && color.b !== 255;

  const style = {
    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
    border: isNotWhiteColor
      ? `1px solid rgb(${color.r}, ${color.g}, ${color.b})`
      : "1px solid rgb(155, 155, 155)"
  };

  const styleInFocus = {
    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
    boxShadow: isNotWhiteColor
      ? `0px 0px 26px 4px rgb(${color.r}, ${color.g}, ${color.b})`
      : `0px 0px 26px 4px rgb(155, 155, 155)`
  };

  return (
    <div className={classes.root}>
      <div
        className={classes.button}
        style={isFocus ? styleInFocus : style}
        tabIndex="1"
        onClick={setIsFocus.bind(this, index, color)}
      />
    </div>
  );
}

export default withStyles(styles)(ColorButton);
