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
/*import PropTypes from "prop-types";*/
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { baseKeyCodeTable } from "@chrysalis-api/keymap";

import GroupeItem from "./GroupeItem";

/*SearchKeyBox.propTypes = {
  showPopap: PropTypes.bool.isRequired,
  onKeySelect: PropTypes.func.isRequired,
  currentKeyCode: PropTypes.number.isRequired,
  onSettingClose: PropTypes.func.isRequired
};*/

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
 * Reactjs functional component that create color button
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {function} onKeySelect Callback function from Editor component that change key's value on the keyboard layout
 * @param {number} currentKeyCode Property that show us current key's value adn code that could be changed on the keyboard layout
 * @param {string} selectedGroupe New key's groupe
 * @param {number} selectedKeyCode New key's code to wich we can change keyboard layout
 * @param {object} baseKeyCodeTable Imported module - it is Data Base of keys
 */

class SearchKeyBox extends Component {
  state = {
    selectedGroupe: null,
    selectedKeyCode: this.props.currentKeyCode,
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  keySelect = (groupName, code) => {
    this.setState(state => ({
      selectedGroupe: (state.selectedGroupe = groupName),
      selectedKeyCode: (state.selectedKeyCode = code),
      open: false
    }));
    this.props.onKeySelect(code);
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
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
      <GroupeItem
        key={group.groupName.toString()}
        groupName={group.groupName}
        keys={group.keys}
        keySelect={this.keySelect}
        selectedKeyCode={this.state.selectedKeyCode}
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

export default withStyles(styles)(SearchKeyBox);
