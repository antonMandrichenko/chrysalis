import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = () => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginBottom: 10
  }
});

function MacrosCardInput(props) {
  const { classes, isRecord } = props;

  const [name, setName] = useState("macros 1");
  const handleChange = e => {
    setName(e.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="macros-name"
        label="Macros name"
        className={classes.textField}
        value={name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        disabled={!isRecord}
      />
    </form>
  );
}

MacrosCardInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosCardInput);
