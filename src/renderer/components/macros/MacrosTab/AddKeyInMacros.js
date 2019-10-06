import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
  const { classes, isRecord, openKeyConfig, openDelayConfig } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = e => {
    if (e.currentTarget.value) {
      openDelayConfig();
    } else {
      openKeyConfig();
    }
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Tooltip placement="bottom" title={props.children}>
        <div>
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.margin}
            disabled={!isRecord}
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AddIcon />
          </Fab>
        </div>
      </Tooltip>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} value={0}>
          Add key
        </MenuItem>
        <MenuItem onClick={handleClose} value={1}>
          Add delay
        </MenuItem>
      </Menu>
    </div>
  );
}

AddKeyInMacros.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddKeyInMacros);
