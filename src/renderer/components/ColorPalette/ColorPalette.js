// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
 * This is Reactjs functional component that create palette for change buttons color on keyboard
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ColorButtonsArea from "./ColorButtonsArea";
import PickerColorButton from "./PickerColorButton";
import { setColorTamplate } from "../../../renderer/utils/setTemplates";
import i18n from "../../i18n";
// import ColorPaletteArea from "./ColorPaletteArea";

ColorPalette.propTypes = {
  classes: PropTypes.object.isRequired,
  onColorSelect: PropTypes.func.isRequired,
  palette: PropTypes.array.isRequired,
  onColorPick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.any,
  isColorButtonSelected: PropTypes.bool.isRequired,
  onColorButtonSelect: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  toChangeAllKeysColor: PropTypes.func.isRequired
};

const styles = () => ({
  root: {
    height: "calc(100vh - 230px)",
    width: 230,
    minHeight: 500,
    minWidth: 140,
    paddingTop: 25
  }
});

/**
 * Reactjs functional component that create palette for change buttons color on keyboard
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} onColorSelect Callback function from Editor component for change color of buttons in keyboard. Parameter is index of color button in palette (from 0 to 15)
 * @param {array} palette Array of colors. Format [{r: 200, g: 200, b: 200, rgb: "rgb(200, 200, 200)"}, ...]
 * @param {function} onColorPick Callback function from Editor component for change color of buttons in ColorPalette. Parameters are: first - index of color button in palette (from 0 to 15), second - index of color (r: from 0 to 255), third - index of color (g: from 0 to 255), fourth - index of color (b: from 0 to 255)
 * @param {boolean} disabled Property that disable component
 * @param {number} selected Number of selected color button in palette (from 0 to 15)
 * @param {boolean} isMultiSelected Property of state Editor.js component, that gives a possibility to change colors of keyboard
 * @param {boolean} isColorButtonSelected Property for disabled PickerColorButton
 * @param {function} onColorButtonSelect Callback function from Editor component for change state of selected color button in palette
 * @param {number} theme To use theme object from Material UI
 * @param {object} toChangeAllKeysColor Callback function from Editor component. Parameter is index of color palette 16
 * @param {function} onBacklightColorSelect Callback function from Editor component for change color of buttons in keyboard. Parameter is index of color button in palette (from 0 to 15)
 */
function ColorPalette(props) {
  const {
    classes,
    onColorSelect,
    palette,
    onColorPick,
    disabled,
    selected,
    isColorButtonSelected,
    onColorButtonSelect,
    theme,
    toChangeAllKeysColor,
    onBacklightColorSelect
  } = props;

  /**
   * This is Hook that lets add React state "indexFocusButton" to functional components
   * @param {object} [initialState=selected] - Sets initial state for "indexFocusButton"
   */
  const [indexFocusButton, setIndexFocusButton] = useState(selected);
  /**
   * This is Hook that lets add React state "colorFocusButton" to functional components
   * @param {object} [initialState] - Sets initial state for "colorFocusButton" (selected element in palette or in keyboard)
   */
  const [colorFocusButton, setColorFocusButton] = useState(
    selected !== null
      ? {
          ...palette[selected]
        }
      : null
  );
  /**
   * Change "indexFocusButton" and "colorFocusButton", if prop "selected" is different
   */
  useEffect(() => {
    setIndexFocusButton(selected);
    if (selected !== null) {
      setColorFocusButton({
        ...palette[selected]
      });
    }
  }, [selected, palette]);
  /**
   * Change "colorFocusButton" and pick color of button from PickerColorButton component in functional component state
   * @param {object} color Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model
   */
  const toSetColorFocusButton = color => {
    onColorPick(indexFocusButton, color.r, color.g, color.b);
    setColorFocusButton(setColorTamplate(color));
  };
  /**
   * Change "indexFocusButton" in its state, "colorFocusButton" in ColorPalette's state, and call function onColorSelect from props, if ctrl or shift key is clicked.
   * @param {number} index Number of value in array that focusing by mouse
   * @param {object} color Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model
   */
  const setIsFocus = (index, color, e) => {
    if (e.ctrlKey || e.shiftKey) return;
    const underglowButton = 14;
    const backlightButton = 15;
    const startKeys = 0;
    const startUnderglow = 69;
    const endKeys = 142;
    if (indexFocusButton === backlightButton) {
      toChangeAllKeysColor(backlightButton, startKeys, startUnderglow);
    } else if (indexFocusButton === underglowButton) {
      toChangeAllKeysColor(underglowButton, startUnderglow, endKeys);
    }
    if (
      (index === backlightButton && indexFocusButton !== index) ||
      (index === underglowButton && indexFocusButton !== index)
    ) {
      setIndexFocusButton(index);
      onBacklightColorSelect(index);
      setColorFocusButton(setColorTamplate(color));
      return;
    }
    if (index === indexFocusButton) {
      setIndexFocusButton(!indexFocusButton);
      onColorButtonSelect("one_button_click");
      return;
    }
    onColorButtonSelect("another_button_click");
    setIndexFocusButton(index);
    setColorFocusButton(setColorTamplate(color));
    onColorSelect(index);
  };

  const propsToArea = {
    colorFocusButton,
    indexFocusButton,
    setIsFocus,
    palette,
    disabled,
    theme,
    toChangeAllKeysColor,
    setIndexFocusButton,
    setColorFocusButton,
    onBacklightColorSelect
  };
  return (
    <Paper className={classes.root}>
      <PickerColorButton
        setColorFocusButton={toSetColorFocusButton}
        disabled={disabled || !isColorButtonSelected}
        colorFocusButton={colorFocusButton}
        indexFocusButton={indexFocusButton}
      >
        {i18n.components.pickerColorButton}
      </PickerColorButton>
      <ColorButtonsArea {...propsToArea} />
    </Paper>
  );
}

export default withStyles(styles)(ColorPalette);
