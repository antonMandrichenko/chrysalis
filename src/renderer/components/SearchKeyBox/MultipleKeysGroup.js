import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

MultipleKeysGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  renderKeyMap: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  classButton: PropTypes.string.isRequired
};

const styles = () => ({
  container: {
    padding: "0 2px"
  },
  itemName: {
    paddingLeft: 2
  },
  itemKeys: {
    paddingRight: 2
  }
});

function MultipleKeysGroup(props) {
  const { groups, renderKeyMap, classes, classButton } = props;
  return (
    <Grid container>
      {groups.map(group => (
        <React.Fragment key={group.groupName}>
          {group.groupName.includes("Mouse") ? (
            <React.Fragment>
              <Grid item xs={3} className={classes.itemName}>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled
                  className={classButton}
                >
                  {group.groupName
                    .slice(
                      group.groupName.indexOf(" ") - group.groupName.length
                    )
                    .toUpperCase()}
                </Button>
              </Grid>
              <Grid item xs={9} className={classes.itemKeys}>
                {renderKeyMap(group, 3, 3)}
              </Grid>
            </React.Fragment>
          ) : (
            <Grid item xs={12}>
              {renderKeyMap(group, 2, 2, classes.container)}
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
}

export default withStyles(styles)(MultipleKeysGroup);
