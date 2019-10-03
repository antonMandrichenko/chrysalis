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
    height: 20
  },
  percentage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

function MacrosProgress(props) {
  const { classes, macrosLength } = props;
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted((macrosLength / 255) * 100);
  }, [macrosLength]);

  return (
    <Paper className={classes.root}>
      <Typography gutterBottom>Used macros memory</Typography>
      <div className={classes.div}>
        <LinearProgress
          color="secondary"
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
