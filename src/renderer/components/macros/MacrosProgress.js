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
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 10,
    marginTop: "1rem",
    position: "fixed",
    bottom: "2rem",
    left: "2rem",
    right: "2rem"
  },
  div: {
    position: "relative"
  },
  progress: {
    height: 20,
    borderRadius: 5
  },
  percentage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

const FULL_MACROS_LENGTH = 128;

function MacrosProgress(props) {
  const { classes, macrosLength } = props;
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted((macrosLength / FULL_MACROS_LENGTH) * 100);
  }, [macrosLength]);

  return (
    <Paper className={classes.root}>
      <Typography gutterBottom>Used macros memory</Typography>
      <div className={classes.div}>
        <LinearProgress
          color={completed < 90 ? "primary" : "secondary"}
          variant="determinate"
          value={completed}
          className={classes.progress}
        />
        <Typography className={classes.percentage}>{`${Math.round(
          completed
        )}%`}</Typography>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(MacrosProgress);
