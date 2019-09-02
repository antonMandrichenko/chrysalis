// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
/**
 * This is Reactjs functional component that change key value on the keyboard layout
 */
import React from "react";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

/**
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {string} groupName Property that get name of keys groupe
 * @param {array} keys Property array of kay value and key code of groupName
 * @param {function} onKeySelect Callback function from Editor component that change key's value on the keyboard layout
 * @param {number} selectedKeyCode Property - new key's code to wich we can change keyboard layout, we highlight it in red.
 */

const styles = theme => ({
  wrapper: {
    border: 1,
    padding: 5,
    marginBottom: 15
  },
  key: {
    boxSizing: "border-box"
  },
  root: {
    flexGrow: 1,
    height: 200,

    overflowX: "hidden"
  },
  button: {
    margin: theme.spacing.unit * 1,
    padding: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: "#000000bd",
    marginBottom: 15,
    font: "400 13.3333px Arial"
  }
});

const GroupeItem = props => {
  const { classes, groupName, keys, keySelect, selectedKeyCode } = props;

  const keyMap = keys.map(key => {
    const {
      code,
      labels: { primary }
    } = key;
    if (!primary) return null;
    let colorBtn = "",
      variantBtn = "outlined";
    if (code === selectedKeyCode) {
      colorBtn = "secondary";
      variantBtn = "contained";
    }
    return (
      <Grid
        key={code}
        id={code}
        item
        md={3}
        className={classes.key}
        onClick={() => keySelect(groupName, code)}
      >
        <Button
          variant={variantBtn}
          color={colorBtn}
          className={classes.button}
          xs
        >
          {primary}
        </Button>
      </Grid>
    );
  });
  return (
    <Grid item md={3} sm={6} className={classes.wrapper}>
      <Paper className={classes.paper} xs={12}>
        {groupName}
      </Paper>
      <Grid container className={classes.root} spacing={2}>
        {keyMap}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(GroupeItem);
