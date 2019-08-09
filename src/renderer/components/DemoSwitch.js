import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MockBinding from "@serialport/binding-mock";
import SerialPort from "@serialport/stream";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Hardware from "@chrysalis-api/hardware";
// import Focus from "@chrysalis-api/focus";

DemoSwitch.propTypes = {
  onAddMockKeyboards: PropTypes.func.isRequired,
  isDemo: PropTypes.bool.isRequired
};

function DemoSwitch(props) {
  const { onAddMockKeyboards, isDemo } = props;
  const [state, setState] = useState({
    checked: false
  });

  const mockFind = async () => {
    Hardware.serial.forEach((keyboard, index) => {
      const options = {
        echo: true,
        record: true,
        manufacturer: keyboard.info.displayName,
        vendorId: keyboard.usb.vendorId,
        productId: keyboard.usb.productId
      };
      SerialPort.Binding = MockBinding;
      const comName =
        process.platform == "win32" ? `COM${index}` : `/dev/ttyACM${index}`;
      MockBinding.createPort(comName, options);
    });

    let portList = await MockBinding.list();

    let found_devices = [];

    for (let port of portList) {
      for (let device of Hardware.serial) {
        if (
          port.productId == device.usb.productId &&
          port.vendorId == device.usb.vendorId &&
          port.manufacturer == device.info.displayName
        ) {
          let newPort = Object.assign({}, port);
          newPort.device = device;
          found_devices.push(newPort);
        }
      }
    }
    return new Promise(resolve => {
      resolve(found_devices);
    });
    // return found_devices;
  };

  // const findMockKeyboards = async () => {
  //   let focus = new Focus();

  //   return new Promise(resolve => {
  //     let mockDevices = [];
  //     mockFind().then(devices => {
  //       for (const device of devices) {
  //         mockDevices.push(device);
  //       }

  //     });
  //   });
  // };

  useEffect(() => {
    if (isDemo) {
      setState({ checked: isDemo });
    }
    mockFind();
  }, []);

  const handleChange = name => async e => {
    setState({ [name]: e.target.checked });
    if (!state.checked) {
      const mockKeyboards = await mockFind();
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
