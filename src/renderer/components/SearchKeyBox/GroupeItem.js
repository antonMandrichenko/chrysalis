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
/*import PropTypes from "prop-types";*/
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

/*GroupeItem.propTypes = {
  groupName: PropTypes.string.isRequired,
  keys: PropTypes.array.isRequired,
  keySelect: PropTypes.func.isRequired,
  selectedKeyCode: PropTypes.number.isRequired
};*/

const styles = theme => ({
  wrapper: {
    border: 1,
    padding: 5,
    marginBottom: 3
  },
  background: {
    backgroundColor: "lavender",
    height: "100%"
  },
  root: {
    display: "flex",
    justifyСontent: "space-evenly"
  },
  button: {
    margin: 3,
    padding: 1,
    minWidth: "50px",
    width: "90%",
    color: "#676363",
    borderColor: "#darkgray",
    fontSize: "0.7rem",
    fontWeight: 900
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "left",
    color: "#ccdad1bd",
    marginBottom: 2,
    font: "400 15px Arial",
    backgroundColor: "#4e4e4e"
  }
});

/**
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {string} groupName Property that get name of keys groupe
 * @param {array} keys Property array of kay value and key code of groupName
 * @param {function} onKeySelect Callback function from Editor component that change key's value on the keyboard layout
 * @param {number} selectedKeyCode Property - new key's code to wich we can change keyboard layout, we highlight it in red.
 */

const GroupeItem = props => {
  const {
    classes,
    groupName,
    keys,
    keySelect,
    selectedKeyCode,
    numderContGrids,
    numderLgItemsGrids,
    numderMdItemsGrids
  } = props;

  const keyMap = keys.map(key => {
    const {
      code,
      labels: { primary }
    } = key;
    return (
      <React.Fragment key={code}>
        {primary ? (
          <Grid
            id={code}
            item
            md={numderMdItemsGrids}
            lg={numderLgItemsGrids}
            className={classes.key}
            onClick={() => keySelect(groupName, code)}
          >
            <Button
              variant={code === selectedKeyCode ? "contained" : "outlined"}
              color={code === selectedKeyCode ? "secondary" : null}
              className={classes.button}
            >
              {primary}
            </Button>
          </Grid>
        ) : null}
      </React.Fragment>
    );
  });
  return (
    <Grid item md={numderContGrids} className={classes.wrapper}>
      <Paper className={classes.background}>
        <Paper className={classes.paper} xs={12}>
          {groupName}
        </Paper>
        <Grid container className={classes.root}>
          {keyMap}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default withStyles(styles)(GroupeItem);
