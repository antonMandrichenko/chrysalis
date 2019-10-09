// -*- mode: js-jsx -*-
/* Chrysalis -- Dygma Raise macros
 * Copyright (C) 2019  DygmaLab SE
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
import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import MacrosTab from "./MacrosTab";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3, height: "100%" }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tab: {
    width: "auto",
    minWidth: "auto"
  },
  container: {
    height: "100%"
  }
});

class MacrosTabs extends React.Component {
  state = {
    value: 0,
    isRecord: this.props.startContext
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  toRecordMacros = () => {
    this.setState({ isRecord: !this.state.isRecord });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.startContext !== prevProps.startContext &&
      this.state.isRecord
    ) {
      this.setState({ isRecord: this.props.startContext });
    }
  }

  render() {
    const {
      classes,
      macrosTab,
      toDeleteMacros,
      addKeyToMacros,
      setActiveMacrosIndex,
      openKeyConfig,
      deleteKeyFromMacros,
      openDelayConfig,
      toChangeMacrosName,
      toAddNewMacros,
      currentLanguageLayout
    } = this.props;
    const { value, isRecord } = this.state;
    const isEmptyLastMacros = Boolean(macrosTab.slice(-1)[0].data.slice(-1)[0]);
    const renderTabContainer = value =>
      macrosTab.map((macros, i) => {
        if (value === i) {
          setActiveMacrosIndex(value);
          return (
            <TabContainer key={uuid()} className={classes.container}>
              <MacrosTab
                macros={macros}
                toMacrosChange={this.props.toMacrosChange}
                macrosIndex={i}
                toDeleteMacros={toDeleteMacros}
                addKeyToMacros={addKeyToMacros}
                toRecordMacros={this.toRecordMacros}
                isRecord={isRecord}
                openKeyConfig={openKeyConfig}
                deleteKeyFromMacros={deleteKeyFromMacros}
                openDelayConfig={openDelayConfig}
                toChangeMacrosName={toChangeMacrosName}
                currentLanguageLayout={currentLanguageLayout}
              />
            </TabContainer>
          );
        }
      });

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange}>
            {macrosTab.map((tab, i) => (
              <Tab
                label={tab.macrosName}
                className={classes.tab}
                key={uuid()}
                disabled={isRecord && value !== i}
              />
            ))}
            <Tab
              icon={<AddIcon />}
              className={classes.tab}
              disabled={isRecord || !isEmptyLastMacros}
              onClick={toAddNewMacros}
            />
          </Tabs>
        </AppBar>
        {renderTabContainer(value)}
      </div>
    );
  }
}

MacrosTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  startContext: PropTypes.bool.isRequired
};

export default withStyles(styles)(MacrosTabs);
