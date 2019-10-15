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
  const {
    classes,
    toDeleteMacros,
    macrosIndex,
    isRecord,
    isMacrosInMemory
  } = props;
  return (
    <Tooltip placement="top" title={props.children}>
      <div>
        <IconButton
          aria-label="delete"
          className={classes.margin}
          onClick={() => {
            toDeleteMacros(macrosIndex);
          }}
          disabled={isRecord || !isMacrosInMemory}
        >
          <DeleteIcon
            color={isRecord || !isMacrosInMemory ? "inherit" : "secondary"}
          />
        </IconButton>
      </div>
    </Tooltip>
  );
}

DeleteMacrosButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteMacrosButton);
