import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  margin: {
    marginBottom: theme.spacing.unit * 1
  }
});

function AddKeyInMacros(props) {
  const { classes } = props;
  return (
    <Fab color="secondary" aria-label="Add" className={classes.margin}>
      <AddIcon />
    </Fab>
  );
}

AddKeyInMacros.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddKeyInMacros);
