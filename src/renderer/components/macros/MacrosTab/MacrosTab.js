import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MacrosCard from "./MacrosCard";
import MacrosProgress from "./MacrosProgress";

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

function MacrosTab(props) {
  const {
    macros,
    toMacrosChange,
    macrosIndex,
    toDeleteMacros,
    macrosLength
  } = props;

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item sm={10} md={8} lg={6}>
        <MacrosCard
          macros={macros}
          toMacrosChange={toMacrosChange}
          macrosIndex={macrosIndex}
          toDeleteMacros={toDeleteMacros}
        />
        <MacrosProgress macrosLength={macrosLength} />
      </Grid>
    </Grid>
  );
}

MacrosTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosTab);
