import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const styles = () => ({
  root: {
    position: "absolute",
    dispalay: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    top: -27,
    right: 0
  },
  hidden: {
    display: "none"
  },
  margin: {
    padding: 3
  }
});

function ButtonDNDevents(props) {
  const {
    classes,
    isDisplay,
    handlePopoverOpen,
    handlePopoverClose,
    item,
    keyIndex,
    deleteKeyFromMacros,
    isDelay, //bool
    openKeyConfig, //func
    openDelayConfig, //func,
    keyNumber //number
  } = props;
  return (
    <div
      className={classNames(!isDisplay && classes.hidden, classes.root)}
      onMouseEnter={() => {
        handlePopoverOpen(item);
      }}
      onMouseLeave={handlePopoverClose}
    >
      <IconButton
        color="primary"
        aria-label="Edit letter"
        fontSize="small"
        className={classes.margin}
        onClick={() => {
          isDelay
            ? openDelayConfig(keyIndex)
            : openKeyConfig(keyIndex, keyNumber);
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        color="secondary"
        aria-label="Delete letter"
        fontSize="small"
        className={classes.margin}
        onClick={() => {
          deleteKeyFromMacros(keyIndex);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

ButtonDNDevents.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonDNDevents);
