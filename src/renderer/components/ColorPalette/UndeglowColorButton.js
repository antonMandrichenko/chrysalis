// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2019  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * This is Reactjs functional component that create button for change color of all undeglow elements
 */
import React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { setButtonSizeTamplate } from "../../../renderer/utils/setTemplates";

UndeglowColorButton.propTypes = {
  //   classes: PropTypes.object.isRequired,
  //   isFocus: PropTypes.bool.isRequired,
  //   setIsFocus: PropTypes.func.isRequired,
  //   index: PropTypes.number.isRequired,
  //   color: PropTypes.object.isRequired,
  //   disabled: PropTypes.bool.isRequired,
  //   isSelected: PropTypes.bool
};

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6
  },
  button: {
    ...setButtonSizeTamplate(40),
    margin: 5,
    borderRadius: 5,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      ...setButtonSizeTamplate(35)
    }
  }
});

const styleDisabled = {
  background: "rgb(155, 155, 155)",
  pointerEvents: "none",
  cursor: "default"
};

///Minimum value for rendering border on white button
// const minWhiteColorValue = 140;

/**
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {boolean} isFocus Change CSS styles
 * @param {function} setIsFocus Callback function from ColorPalette component. Parameters are: first - index of color button in palette (from 0 to 15), second - object with keys that defining colors using the Red-green-blue-alpha (RGBA) model, third - event
 * @param {number} index Current index of button
 * @param {object} color Current color of button
 * @param {boolean} disabled Property that disable component
 */
function UndeglowColorButton(props) {
  const {
    classes,
    colorFocusButton,
    indexFocusButton,
    disabled,
    theme,
    toChangeAllUnderglowsColor
  } = props;
  console.log(props, indexFocusButton);

  const style = {
    background:
      indexFocusButton !== null &&
      `rgb(${colorFocusButton.r}, ${colorFocusButton.g}, ${
        colorFocusButton.b
      })`,
    color:
      indexFocusButton !== null &&
      theme.palette.getContrastText(colorFocusButton.rgb)
  };

  return (
    <Tooltip placement="top-start" title={props.children}>
      <div className={classes.root}>
        <Button
          variant="contained"
          className={classes.button}
          style={indexFocusButton === null || disabled ? styleDisabled : style}
          onClick={toChangeAllUnderglowsColor.bind(this, indexFocusButton)}
        >
          {"LED"}
        </Button>
      </div>
    </Tooltip>
  );
}

export default withStyles(styles)(UndeglowColorButton);
