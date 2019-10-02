import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  margin: {
    marginBottom: theme.spacing.unit * 1
  }
});

function DeleteMacrosButton(props) {
  const { classes } = props;
  return (
    <Tooltip placement="top" title={props.children}>
      <IconButton aria-label="delete" className={classes.margin}>
        <DeleteIcon color="secondary" />
      </IconButton>
    </Tooltip>
  );
}

DeleteMacrosButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteMacrosButton);
