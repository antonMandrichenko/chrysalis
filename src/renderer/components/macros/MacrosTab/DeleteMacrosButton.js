import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
  margin: {
    marginBottom: theme.spacing.unit * 1
  }
});

function ButtonSizes(props) {
  const { classes } = props;
  return (
    <Fab color="secondary" aria-label="Add" className={classes.margin}>
      <DeleteIcon />
    </Fab>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonSizes);
