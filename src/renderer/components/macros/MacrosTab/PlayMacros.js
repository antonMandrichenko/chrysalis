import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";

const styles = theme => ({
  textField: {
    marginTop: theme.spacing.unit * 2
  }
});

//

function PlayMacros(props) {
  const { classes } = props;
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <TextField
      id="outlined-multiline-flexible"
      label="Multiline"
      multiline
      rowsMax="4"
      rows="4"
      value={value}
      onChange={handleChange}
      className={classes.textField}
      // margin="normal"
      helperText="hello"
      variant="outlined"
      fullWidth
    />
  );
}

PlayMacros.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlayMacros);
