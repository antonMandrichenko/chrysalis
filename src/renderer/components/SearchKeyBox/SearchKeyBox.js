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
import SettingsIcon from "@material-ui/icons/Settings";
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
    overflowY: "scroll",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 30px 50px rgba(0, 0, 0, 0.7)"
  },
  close: {
    position: "absolute",
    right: -20,
    cursor: "pointer"
  },
  margin: {
    margin: 15
  },
  extendedIcon: {
    marginRight: theme.spacing.unit * 1
  }
});

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
    let isLastItem = false;
    
    const bigGroupInStart = baseKeyCodeTable.reduce((newArray, group) => {
      if (group.keys.length > 35) {
        isLastItem = true;
        return [...newArray, group];
      }
      if (group.keys.length > 15 && group.keys.length <= 35) {
        return [group, ...newArray];
      } else {
        if (isLastItem) {
          let lastItem = newArray.pop();
          return [...newArray, group, lastItem];
        } else {
          return [...newArray, group];
        }
      }
    }, []);

    const groupeList = bigGroupInStart.map((group, index) => (
      <GroupItem
        key={group.groupName}
        groupName={group.groupName}
        keys={group.keys}
        keySelect={this.keySelect}
        selectedKeyCode={selectedKeyCode}
        numderContGrids={bigGroupInStart.length === index + 1 ? 8 : 4}
        numderLgItemsGrids={bigGroupInStart.length === index + 1 ? 1 : 2}
        numderMdItemsGrids={bigGroupInStart.length === index + 1 ? 1 : 2}
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
          <SettingsIcon className={classes.extendedIcon} />
          Setting
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
