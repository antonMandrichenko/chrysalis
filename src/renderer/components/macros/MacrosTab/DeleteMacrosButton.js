import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  root: {
    position: "absolute",
    top: 0,
    right: 0
  }
});

function ButtonSizes(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <IconButton aria-label="Delete" className={classes.margin}>
        <DeleteIcon fontSize="small" />
      </IconButton>
      {/* <IconButton aria-label="Delete" className={classes.margin}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="Delete" className={classes.margin}>
          <DeleteIcon fontSize="large" />
        </IconButton> */}
    </div>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonSizes);
