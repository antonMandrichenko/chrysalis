import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  margin: {
    marginBottom: theme.spacing.unit * 1
  }
});

function DeleteMacrosButton(props) {
  const { classes } = props;
  return (
    <IconButton aria-label="delete" className={classes.margin}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
}

DeleteMacrosButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteMacrosButton);
