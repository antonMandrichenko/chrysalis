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
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

ButtonDNDevents.propTypes = {
  classes: PropTypes.object.isRequired,
  isDisplay: PropTypes.bool.isRequired,
  handlePopoverOpen: PropTypes.func.isRequired,
  handlePopoverClose: PropTypes.func.isRequired,
  // item:
  keyIndex: PropTypes.number.isRequired,
  deleteKeyFromMacros: PropTypes.func.isRequired,
  isDelay: PropTypes.bool.isRequired,
  openKeyConfig: PropTypes.func.isRequired,
  openDelayConfig: PropTypes.func.isRequired,
  keyNumber: PropTypes.number
};

const styles = () => ({
  root: {
    position: "absolute",
    dispalay: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    top: -27,
    right: 0
  },
  hidden: {
    display: "none"
  },
  margin: {
    padding: 3
  }
});

function ButtonDNDevents(props) {
  const {
    classes,
    isDisplay,
    handlePopoverOpen,
    handlePopoverClose,
    item,
    keyIndex,
    deleteKeyFromMacros,
    isDelay, //bool
    openKeyConfig, //func
    openDelayConfig, //func,
    keyNumber //number
  } = props;
  return (
    <div
      className={classNames(!isDisplay && classes.hidden, classes.root)}
      onMouseEnter={() => {
        handlePopoverOpen(item);
      }}
      onMouseLeave={handlePopoverClose}
    >
      <IconButton
        color="primary"
        aria-label="Edit letter"
        fontSize="small"
        className={classes.margin}
        onClick={() => {
          isDelay
            ? openDelayConfig(keyIndex)
            : openKeyConfig(keyIndex, keyNumber);
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        color="secondary"
        aria-label="Delete letter"
        fontSize="small"
        className={classes.margin}
        onClick={() => {
          deleteKeyFromMacros(keyIndex);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default withStyles(styles)(ButtonDNDevents);
