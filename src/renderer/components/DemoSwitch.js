import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

DemoSwitch.propTypes = {
  onAddMockKeyboards: PropTypes.func.isRequired,
  isDemo: PropTypes.bool.isRequired
};

/**
 * Reactjs functional component that create switch for select demo mode
 * @param {function} onAddMockKeyboards Callback function from KeyboardSelect component. Parameter is checked of Switch component
 * @param {boolean} isDemo if in demo mode isDemo === true
 */
function DemoSwitch(props) {
  const { onAddMockKeyboards, isDemo } = props;

  /**
   * This is Hook that lets add React state "state.checked" to functional components
   * @param {object} [checked] Checked default value = false
   */
  const [state, setState] = useState({
    checked: false
  });

  /**
   * Changes "state.checked", if prop isDemo === true
   */
  useEffect(() => {
    if (isDemo) {
      setState({ checked: isDemo });
    }
  }, []);

  /**
   * Changes switch state and calls onAddMockKeyboards method from KeyboardSelect
   */
  const handleChange = name => async e => {
    setState({ [name]: e.target.checked });
    onAddMockKeyboards(state.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={state.checked}
          onChange={handleChange("checked")}
          value="checked"
          color="primary"
        />
      }
      label="Demo"
    />
  );
}

export default DemoSwitch;
