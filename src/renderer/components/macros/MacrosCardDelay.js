import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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

  const handleChange = (e, value) => {
    setValue(value);
  };

  const { classes, isRecord } = props;

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
    </Grid>
  );
}

MacrosCardDelay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosCardDelay);
