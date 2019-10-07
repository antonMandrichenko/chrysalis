import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Focus from "@chrysalis-api/focus";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

const focus = new Focus();

function PlayMacros(props) {
  const { classes } = props;
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handlePlay = async () => {
    console.log(await focus.command("macros.trigger", 0));
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Button color="primary" className={classes.button} onClick={handlePlay}>
        Play
      </Button>
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax="4"
        rows="4"
        value={value}
        onChange={handleChange}
        className={classes.textField}
        margin="normal"
        helperText="hello"
        variant="outlined"
      />
    </form>
  );
}

PlayMacros.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlayMacros);
