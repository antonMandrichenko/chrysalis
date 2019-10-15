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
    toChangeMacrosName,
    currentLanguageLayout,
    macrosProgress
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
          currentLanguageLayout={currentLanguageLayout}
          macrosProgress={macrosProgress}
        />
      </Grid>
    </Grid>
  );
}

MacrosTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosTab);
