import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

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
  const { classes, isRecord } = props;
  return (
    <div className={classes.root}>
      <Tooltip placement="bottom" title={props.children}>
        <div>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.margin}
            disabled={!isRecord}
          >
            <AddIcon />
          </Fab>
        </div>
      </Tooltip>
    </div>
  );
}

AddKeyInMacros.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddKeyInMacros);
