import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MouseGroup from "./MouseGroup";

MultipleKeysGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  renderKeyMap: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  classButton: PropTypes.string.isRequired
};

const styles = () => ({
  container: {
    padding: "0 2px"
  }
});

/**
 * Reactjs functional component that creates blocks with two or other keys group
 * @param {object} classes Property that sets up CSS classes that adding to HTML elements
 * @param {array} groups Keys groups what will render
 * @param {function} renderKeyMap Callback function from GroupItem component that renders key buttons in grid container
 * @param {object} classButton className of buttons from parent component
 */
function MultipleKeysGroup(props) {
  const { groups, renderKeyMap, classes, classButton } = props;
  return (
    <Grid container>
      {groups.map(group => (
        <React.Fragment key={group.groupName}>
          {group.groupName.includes("Mouse") ? (
            <MouseGroup
              group={group}
              renderKeyMap={renderKeyMap}
              classButton={classButton}
            />
          ) : (
            <Grid item xs={12}>
              {renderKeyMap(group, 3, 2, classes.container)}
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
}

export default withStyles(styles)(MultipleKeysGroup);
