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
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { baseKeyCodeTable } from "@chrysalis-api/keymap";

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
  { group: "Letters", isUnite: false },
  { group: "Digits & Spacing", isUnite: true },
  { group: "Fx keys", isUnite: false },
  { group: "Punctuation & special letters", isUnite: false },
  { group: "Navigation & Miscellaneous", isUnite: true },
  { group: "Number pud", isUnite: false },
  { group: "Modifiers", isUnite: false },
  { group: "Shift to layer", isUnite: false },
  { group: "Lock layer", isUnite: false },
  { group: "Media", isUnite: false },
  { group: "One shot modifiers", isUnite: false },
  { group: "Led effects", isUnite: false },
  { group: "One shot layers", isUnite: false },
  { group: "Leader", isUnite: false },
  { group: "Space cadet", isUnite: false },
  { group: "Mouse configuration options", isUnite: true },
  { group: "Steno", isUnite: false }
];

const orederArrayWithKeys = orderArray.map(item =>
  !item.isUnite
    ? baseKeyCodeTable.filter(group => item.group === group.groupName)[0]
    : {
        groupName: item.group,
        innerGroup: baseKeyCodeTable.filter(group =>
          item.group.includes(
            group.groupName.slice(0, group.groupName.indexOf(" "))
          )
        )
      }
);

/**
 * Reactjs component that creates menu for choise key from all keys list
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} onKeySelect Callback function from Editor component that changes key's value on the keyboard layout and closes modal window
 * @param {number} currentKeyCode Property that shows current key's value
 */

class SearchKeyBox extends Component {
  state = {
    selectedKeyCode: this.props.currentKeyCode,
    open: false
  };

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
    this.setState({
      selectedKeyCode: code,
      open: false
    });
    this.props.onKeySelect(code);
  };

  render() {
    const { classes } = this.props;
    const { open, selectedKeyCode } = this.state;

    const groupeList = orederArrayWithKeys.map((group, index) => (
      <GroupItem
        key={group.groupName}
        group={group}
        keySelect={this.keySelect}
        isUnited={Boolean(group.innerGroup)}
        selectedKeyCode={selectedKeyCode}
        numderContGrids={orederArrayWithKeys.length === index + 1 ? 8 : 4}
        numderLgItemsGrids={orederArrayWithKeys.length === index + 1 ? 1 : 2}
        numderMdItemsGrids={orederArrayWithKeys.length === index + 1 ? 2 : 3}
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
          KEYCUP VALUE
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.wrapper}>
              <CloseIcon className={classes.close} onClick={this.handleClose} />
              <Grid container className={classes.root} spacing={8}>
                {groupeList}
              </Grid>
            </div>
          </Fade>
        </Modal>
      </React.Fragment>
    );
  }
}

SearchKeyBox.propTypes = {
  onKeySelect: PropTypes.func.isRequired,
  currentKeyCode: PropTypes.number.isRequired
};

export default withStyles(styles)(SearchKeyBox);
