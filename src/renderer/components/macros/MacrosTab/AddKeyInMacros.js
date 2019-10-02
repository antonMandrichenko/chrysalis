import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "center",
    marginTop: theme.spacing.unit * 2
  },
  margin: {
    marginBottom: theme.spacing.unit * 1
  }
});

function AddKeyInMacros(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="Add" className={classes.margin}>
        <AddIcon />
      </Fab>
    </div>
  );
}

AddKeyInMacros.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddKeyInMacros);
