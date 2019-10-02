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

  componentDidMount() {
    const string =
      "1 20 8 11 5 8 12 8 8 8 15 8 15 8 18 0 8 12 8 9 8 15 8 15 8 18 0 0 ";
    const macrosNames = ["MAcros 1", "Macros 2"];
    const newString = string.match(/[\d\s]+?\s0\s/g);
    const macroses = newString.map(macros =>
      macros.match(/[^5^0]{1}\s[0-9]+|5\s[0-9]\s[0-9]+/g)
    );
    const macrosesWithNames = macroses.map((macros, i) =>
      macrosNames.reduce(
        (newObj, macrosName, j) =>
          i === j ? { ...newObj, macrosName, macros } : newObj,
        {}
      )
    );
    this.setState({ macrosTab: macrosesWithNames });
    console.log(macrosesWithNames);
  }

  render() {
    const { classes } = this.props;
    const { value, macrosTab } = this.state;
    const renderTabContainer = value =>
      macrosTab.map(
        (macros, i) =>
          value === i && (
            <TabContainer key={uuid()} className={classes.container}>
              <MacrosTab values={macros.macrosName} macros={macros} />
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
