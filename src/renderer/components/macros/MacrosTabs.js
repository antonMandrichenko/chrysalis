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
    macrosTab: []
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, macrosTab, toDeleteMacros } = this.props;
    const { value } = this.state;
    const renderTabContainer = value =>
      macrosTab.map(
        (macros, i) =>
          value === i && (
            <TabContainer key={uuid()} className={classes.container}>
              <MacrosTab
                macros={macros}
                toMacrosChange={this.props.toMacrosChange}
                macrosIndex={i}
                toDeleteMacros={toDeleteMacros}
              />
            </TabContainer>
          )
      );

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange}>
            {macrosTab.map(tab => (
              <Tab
                label={tab.macrosName}
                className={classes.tab}
                key={uuid()}
              />
            ))}
            <Tab icon={<AddIcon />} className={classes.tab} />
          </Tabs>
        </AppBar>
        {renderTabContainer(value)}
      </div>
    );
  }
}

MacrosTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosTabs);
