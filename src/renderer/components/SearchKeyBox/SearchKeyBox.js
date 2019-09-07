// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2019  Keyboardio, Inc.
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
import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";

import GroupItem from "./GroupItem";

const styles = theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  wrapper: {
    height: "90vh",
    width: "90vw",
    position: "relative"
  },
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 30px 50px rgba(0, 0, 0, 0.7)",
    padding: "13px 8px 0",
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      overflowY: "scroll"
    }
  },
  close: {
    position: "absolute",
    right: -20,
    cursor: "pointer"
  },
  margin: {
    margin: "15px 10px",
    width: 170
  },
  extendedIcon: {
    marginRight: theme.spacing.unit * 1
  }
});

const orderArray = [
  { group: "Letters", isUnite: false, displayName: "Letters" },
  { group: "Digits & Spacing", isUnite: true, displayName: "Digits & Spacing" },
  { group: "Fx keys", isUnite: false, displayName: "Fx keys" },
  {
    group: "Punctuation",
    isUnite: false,
    displayName: "Punctuation & special letters"
  },
  {
    group: "Navigation & Miscellaneous",
    isUnite: true,
    displayName: "Navigation & Miscellaneous"
  },
  { group: "Numpad", isUnite: false, displayName: "Number pud" },
  { group: "Modifiers", isUnite: false, displayName: "Modifiers" },
  { group: "Shift to layer", isUnite: false, displayName: "Shift to layer" },
  { group: "Lock layer to", isUnite: false, displayName: "Lock layer" },
  { group: "Media", isUnite: false, displayName: "Media" },
  {
    group: "OneShot modifiers",
    isUnite: false,
    displayName: "One shot modifiers"
  },
  { group: "LED Effect", isUnite: false, displayName: "Led effects" },
  { group: "OneShot layers", isUnite: false, displayName: "One shot layers" },
  { group: "Leader", isUnite: false, displayName: "Leader" },
  { group: "SpaceCadet", isUnite: false, displayName: "Space cadet" },
  {
    group: "Mouse configuration options",
    isUnite: true,
    displayName: "Mouse configuration options"
  },
  { group: "Steno", isUnite: false, displayName: "Steno" }
];

/**
 * Reactjs component that creates menu for choise key from all keys list
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} onKeySelect Callback function from Editor component that changes key's value on the keyboard layout and closes modal window
 * @param {number} currentKeyCode Property that shows current key's value
 */

class SearchKeyBox extends Component {
  state = {
    open: false,
    orderArrayWithKeys: []
  };

  componentDidMount() {
    this.setState({
      orderArrayWithKeys: this.toOrderArrayWithKeys()
    });
  }

  /**
   * Creates array for render component
   */
  toOrderArrayWithKeys = () =>
    orderArray.map(item =>
      !item.isUnite
        ? {
            ...this.props.baseKeyCodeTable.filter(
              group => item.group === group.groupName
            )[0],
            displayName: item.displayName
          }
        : {
            groupName: item.group,
            displayName: item.displayName,
            innerGroup: this.props.baseKeyCodeTable.filter(group =>
              item.group.includes(
                group.groupName.slice(0, group.groupName.indexOf(" "))
              )
            )
          }
    );

  /**
   * Opens modal window with keys list
   */
  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  /**
   * Closes modal window with keys list
   */
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  /**
   * Changes state of component and calls function from Editor
   * @param {number} code Unique number from keymap database
   */
  keySelect = code => {
    this.handleClose();
    this.props.onKeySelect(code);
  };

  render() {
    const { classes, currentKeyCode } = this.props;
    const { open, orderArrayWithKeys } = this.state;
    const groupeList = orderArrayWithKeys.map((group, index) => (
      <GroupItem
        key={group.groupName}
        group={group}
        keySelect={this.keySelect}
        isUnited={Boolean(group.innerGroup)}
        selectedKeyCode={currentKeyCode}
        numderContGrids={orderArrayWithKeys.length === index + 1 ? 8 : 4}
        numderLgItemsGrids={orderArrayWithKeys.length === index + 1 ? 1 : 2}
        numderMdItemsGrids={orderArrayWithKeys.length === index + 1 ? 2 : 3}
      />
    ));

    return (
      <React.Fragment>
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          className={classes.margin}
          onClick={this.handleOpen}
        >
          <KeyboardIcon className={classes.extendedIcon} />
          Key config
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
        >
          <div className={classes.wrapper}>
            <CloseIcon className={classes.close} onClick={this.handleClose} />
            <Grid container className={classes.root} spacing={8}>
              {groupeList}
            </Grid>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

SearchKeyBox.propTypes = {
  onKeySelect: PropTypes.func.isRequired,
  currentKeyCode: PropTypes.number.isRequired,
  baseKeyCodeTable: PropTypes.array.isRequired
};

export default withStyles(styles)(SearchKeyBox);
