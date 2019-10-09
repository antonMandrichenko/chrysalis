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
import TextField from "@material-ui/core/TextField";

const styles = () => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginBottom: 10
  }
});

function MacrosCardInput(props) {
  const { classes, isRecord, toChangeMacrosName, macrosName } = props;

  const [name, setName] = useState(macrosName);
  const handleChange = e => {
    setName(e.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="macros-name"
        label="Macros name"
        className={classes.textField}
        value={name}
        onChange={handleChange}
        onBlur={() => {
          toChangeMacrosName(name);
        }}
        variant="outlined"
        fullWidth
        disabled={!isRecord}
      />
    </form>
  );
}

MacrosCardInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosCardInput);
