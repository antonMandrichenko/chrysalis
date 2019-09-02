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
 * This is Reactjs functional component that show us list of groupe name of keys
 */
import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { baseKeyCodeTable } from "@chrysalis-api/keymap";

import GroupeItem from "./GroupeItem";

/**
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {number} currentKeyCode Property that show us current key's value adn code that could be changed on the keyboard layout
 * @param {string} selectedGroupe New key's groupe
 * @param {number} selectedKeyCode New key's code to wich we can change keyboard layout
 * @param {function} onKeySelect Callback function from Editor component that change key's value on the keyboard layout
 * @param {object} baseKeyCodeTable Imported module - it is Data Base of keys
 */

const styles = () => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 900,
    flexGrow: 1,

    height: 580,
    overflowY: "scroll",
    backgroundColor: "#f5f5f5"
  }
});

class SearchKeyBox extends Component {
  state = {
    selectedGroupe: null,
    selectedKeyCode: this.props.currentKeyCode
  };
  keySelect = (groupName, code) => {
    this.setState(state => {
      return {
        selectedGroupe: (state.selectedGroupe = groupName),
        selectedKeyCode: (state.selectedKeyCode = code)
      };
    });
    this.props.onKeySelect(code);
  };
  render() {
    const { classes } = this.props;

    const groupeList = baseKeyCodeTable.map(group => {
      return (
        <GroupeItem
          key={group.groupName.toString()}
          groupName={group.groupName}
          keys={group.keys}
          keySelect={this.keySelect}
          selectedKeyCode={this.state.selectedKeyCode}
        />
      );
    });
    return (
      <Grid container className={classes.root} spacing={8} sm={12}>
        {groupeList}
      </Grid>
    );
  }
}

export default withStyles(styles)(SearchKeyBox);
