import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

DemoSwitch.propTypes = {
  onAddMockKeyboards: PropTypes.func.isRequired,
  isDemo: PropTypes.bool.isRequired
};

function DemoSwitch(props) {
  const { onAddMockKeyboards, isDemo } = props;
  const [state, setState] = useState({
    checked: false
  });

  useEffect(() => {
    if (isDemo) {
      setState({ checked: isDemo });
    }
  }, []);

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
