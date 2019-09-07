import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

MouseGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  renderKeyMap: PropTypes.func.isRequired,
  classButton: PropTypes.string.isRequired
};

const styles = () => ({
  itemName: {
    paddingLeft: 2
  },
  itemKeys: {
    paddingRight: 2
  }
});

function MouseGroup(props) {
  const { group, classes, renderKeyMap, classButton } = props;
  return (
    <React.Fragment>
      <Grid item xs={2} md={4} className={classes.itemName}>
        <Button
          variant="contained"
          color="secondary"
          disabled
          className={classButton}
        >
          {group.groupName
            .slice(group.groupName.indexOf(" ") - group.groupName.length)
            .toUpperCase()}
        </Button>
      </Grid>
      <Grid item xs={10} md={8} className={classes.itemKeys}>
        {renderKeyMap(group, 4, 3)}
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(MouseGroup);
