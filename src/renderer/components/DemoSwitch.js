import React, { useState } from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Focus from "@chrysalis-api/focus";

DemoSwitch.propTypes = {
  onAddMockKeyboards: PropTypes.func.isRequired
};

function DemoSwitch(props) {
  const { onAddMockKeyboards } = props;
  const [state, setState] = useState({
    checked: false
  });

  const findMockKeyboards = async () => {
    let focus = new Focus();

    return new Promise(resolve => {
      let mockDevices = [];
      focus.mockFind().then(devices => {
        for (const device of devices) {
          mockDevices.push(device);
        }
        resolve(mockDevices);
      });
    });
  };

  const handleChange = name => async e => {
    setState({ ...state, [name]: e.target.checked });
    if (!state.checked) {
      const mockKeyboards = await findMockKeyboards();
      onAddMockKeyboards(mockKeyboards);
    } else {
      onAddMockKeyboards([]);
    }
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
