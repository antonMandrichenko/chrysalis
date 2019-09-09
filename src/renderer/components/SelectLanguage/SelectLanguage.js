import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TranslateIcon from "@material-ui/icons/Translate";
import Menu from "@material-ui/core/Menu";
import LanguageItem from "./LanguageItem";
import { languagesDB } from "@chrysalis-api/keymap";

const styles = theme => ({
  root: {
    position: "relative"
  },
  button: {
    margin: 15,
    minWidth: 145
  },
  rightIcon: {
    marginLeft: theme.spacing.unit * 1
  },
  menu: {
    position: "absolute",
    bottom: 300,
    width: 250,
    minHeight: 30
  }
});

class SelectLanguage extends Component {
  state = {
    anchorEl: null,
    language: "Language"
  };
  handleOpenLanguage = evt => {
    this.setState({
      anchorEl: evt.target
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
      <LanguageItem
        key={item.toString()}
        language={item}
        onClose={this.handleCloseLanguage}
        languageSelect={this.languageSelect}
        scanKeyboard={scanKeyboard}
      >
        {item}
      </LanguageItem>
    ));

    return (
      <div id="select-language">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={this.handleOpenLanguage}
        >
          {language}
          <TranslateIcon className={classes.rightIcon} />
        </Button>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={this.handleCloseLanguage}
          className={classes.menu}
        >
          {languageList}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(SelectLanguage);
