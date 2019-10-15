// -*- mode: js-jsx -*-
/* Chrysalis -- Dygma Raise macros
 * Copyright (C) 2019  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

AddKeyInMacros.propTypes = {
  classes: PropTypes.object.isRequired,
  isRecord: PropTypes.bool.isRequired,
  openKeyConfig: PropTypes.func.isRequired,
  openDelayConfig: PropTypes.func.isRequired
};

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
  const {
    classes,
    isRecord,
    openKeyConfig,
    openDelayConfig,
    macrosProgress
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = e => {
    if (e.currentTarget.value === 1) {
      openDelayConfig();
    } else if (e.currentTarget.value === 0) {
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
            disabled={!isRecord || macrosProgress >= 100}
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

export default withStyles(styles)(AddKeyInMacros);
