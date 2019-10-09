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
// import Button from "@material-ui/core/Button";

const styles = theme => ({
  textField: {
    marginTop: theme.spacing.unit * 2
  }
});

//

function PlayMacros(props) {
  const { classes } = props;
  const [value, setValue] = useState("");

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <TextField
      id="outlined-multiline-flexible"
      label="Multiline"
      multiline
      rowsMax="4"
      rows="4"
      value={value}
      onChange={handleChange}
      className={classes.textField}
      // margin="normal"
      helperText="hello"
      variant="outlined"
      fullWidth
    />
  );
}

PlayMacros.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlayMacros);
