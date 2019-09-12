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

import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
// languagesDB is data base, typeof object
import { languagesDB } from "@chrysalis-api/keymap";
import Button from "@material-ui/core/Button";
import TranslateIcon from "@material-ui/icons/Translate";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import LanguageItem from "./LanguageItem";
import Popper from "@material-ui/core/Popper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: 15,
    minWidth: 145
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 1
  },
  menu: {
    width: "100%"
  }
});

/**
 * Reactjs class component that select new language layout
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {HTMLAnchorElement} anchorEl HTMLAnchorElement which is a relative element for our list of languages
 * @param {string} language String value, that passes the value to the LanguageItem component to select language layout
 * @param {function} scanKeyboard Callback function from Editor -> KeySelector components. Without parametrs, this function call KeymapDB in Keymap and modify languagu layout
 */

class SelectLanguage extends Component {
  state = {
    anchorEl: null,
    language: localStorage.getItem("language") || "english"
  };
  handleOpenLanguage = evt => {
    this.setState({
      anchorEl: evt.currentTarget
    });
  };

  handleCloseLanguage = () => {
    this.setState({
      anchorEl: null
    });
  };

  languageSelect = newLeng => {
    this.setState({
      language: newLeng
    });
  };

  render() {
    const { classes, scanKeyboard } = this.props;
    const { anchorEl, language } = this.state;
    const open = Boolean(anchorEl);
    const languageList = Object.keys(languagesDB).map(item => (
      <div key={item.toString()}>
        <LanguageItem
          language={item}
          onClose={this.handleCloseLanguage}
          languageSelect={this.languageSelect}
          scanKeyboard={scanKeyboard}
        >
          {item}
        </LanguageItem>
        <Divider />
      </div>
    ));

    return (
      <div>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={this.handleOpenLanguage}
        >
          {language}
          <TranslateIcon className={classes.rightIcon} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="top-start"
          disablePortal={true}
        >
          <ClickAwayListener onClickAway={this.handleCloseLanguage}>
            <List component="nav" className={classes.root}>
              {languageList}
            </List>
          </ClickAwayListener>
        </Popper>
      </div>
    );
  }
}

SelectLanguage.propTypes = {
  classes: PropTypes.object.isRequired,
  scanKeyboard: PropTypes.func.isRequired
};

export default withStyles(styles)(SelectLanguage);
