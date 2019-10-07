import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MacrosCard from "./MacrosCard";

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
    addKeyToMacros,
    isRecord,
    toRecordMacros,
    openKeyConfig,
    deleteKeyFromMacros,
    openDelayConfig,
    toChangeMacrosName
  } = props;

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item sm={10} md={8} lg={6}>
        <MacrosCard
          macros={macros}
          toMacrosChange={toMacrosChange}
          macrosIndex={macrosIndex}
          toDeleteMacros={toDeleteMacros}
          addKeyToMacros={addKeyToMacros}
          toRecordMacros={toRecordMacros}
          isRecord={isRecord}
          openKeyConfig={openKeyConfig}
          deleteKeyFromMacros={deleteKeyFromMacros}
          openDelayConfig={openDelayConfig}
          toChangeMacrosName={toChangeMacrosName}
        />
      </Grid>
    </Grid>
  );
}

MacrosTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosTab);
