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
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";

import { baseKeyCodeTable } from "@chrysalis-api/keymap";

import GroupeItem from "./GroupeItem";

/*SearchKeyBox.propTypes = {
  showPopap: PropTypes.bool.isRequired,
  onKeySelect: PropTypes.func.isRequired,
  currentKeyCode: PropTypes.number.isRequired,
  onSettingClose: PropTypes.func.isRequired
};*/

const styles = () => ({
  wrapper: {},
  root: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    flexGrow: 1,
    zIndex: 6,
    height: 580,
    overflowY: "scroll",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 30px 50px rgba(0, 0, 0, 0.7)"
  },
  close: {
    position: "fixed",
    bottom: 550,
    right: 40,
    cursor: "pointer",
    zIndex: 7
  }
});

/**
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {boolean} showPopap Propery that define to show popap or not
 * @param {function} onKeySelect Callback function from Editor component that change key's value on the keyboard layout
 * @param {number} currentKeyCode Property that show us current key's value adn code that could be changed on the keyboard layout
 * @param {function} onSettingClose Callback that change showPopap to false and closes popap
 * @param {string} selectedGroupe New key's groupe
 * @param {number} selectedKeyCode New key's code to wich we can change keyboard layout
 * @param {object} baseKeyCodeTable Imported module - it is Data Base of keys
 */

class SearchKeyBox extends Component {
  state = {
    selectedGroupe: null,
    selectedKeyCode: this.props.currentKeyCode
  };
  keySelect = (groupName, code) => {
    this.setState(state => ({
      selectedGroupe: (state.selectedGroupe = groupName),
      selectedKeyCode: (state.selectedKeyCode = code)
    }));
    this.props.onKeySelect(code);
  };
  render() {
    const { classes, showPopap, onSettingClose } = this.props;
    if (!showPopap) return null;
    const groupeList = baseKeyCodeTable.map(group => (
      <GroupeItem
        key={group.groupName.toString()}
        groupName={group.groupName}
        keys={group.keys}
        keySelect={this.keySelect}
        selectedKeyCode={this.state.selectedKeyCode}
      />
    ));
    return (
      <div className={classes.wrapper}>
        <CloseIcon className={classes.close} onClick={onSettingClose} />
        <Grid container className={classes.root} spacing={8} sm={10}>
          {groupeList}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SearchKeyBox);
