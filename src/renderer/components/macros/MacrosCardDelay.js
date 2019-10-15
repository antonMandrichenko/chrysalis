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
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  slider: {
    padding: "22px 0px"
  },
  typograthy: {
    display: "flex",
    alignItems: "center"
  },
  right: {
    justifyContent: "flex-end"
  }
};

function MacrosCardDelay(props) {
  const [value, setValue] = useState(10);
  const { classes, isRecord, toAddDelayToMacros } = props;

  const handleChange = (e, value) => {
    setValue(value);
  };

  return (
    <Grid container>
      <Grid item xs={2} className={classes.typograthy}>
        <Typography align="left" disabled={!isRecord}>
          Delay
        </Typography>
      </Grid>
      <Grid item xs={8} className={classes.typograthy}>
        <Slider
          classes={{ container: classes.slider }}
          value={value}
          min={0}
          max={250}
          step={10}
          onChange={handleChange}
          disabled={!isRecord}
        />
      </Grid>
      <Grid
        item
        xs={2}
        className={classNames(classes.typograthy, classes.right)}
      >
        <Typography disabled={!isRecord}>{`${value}ms`}</Typography>
      </Grid>
      <Button
        size="small"
        color={"secondary"}
        onClick={() => {
          toAddDelayToMacros(value);
        }}
        className={classes.button}
      >
        OK
      </Button>
    </Grid>
  );
}

MacrosCardDelay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosCardDelay);
