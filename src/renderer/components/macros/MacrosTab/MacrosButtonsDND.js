import React, { useState } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { KeymapDB, keyCodeTable } from "@chrysalis-api/keymap";
import ButtonDNDevents from "./ButtonDNDevents";

const propTypes = {};

const styles = {
  root: {
    maxHeight: 500,
    overflow: "auto",
    paddingBottom: 25,
    marginLeft: 15,
    width: "100%",
    minHeight: 200
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    width: "100%"
  },
  li: {
    padding: "25px 10px 0",
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    lineHeight: 1
  },
  drag: {
    cursor: "move",
    position: "relative"
  },
  button: {
    width: 200,
    textTransform: "none"
  }
};

const keymapDB = new KeymapDB();

const MacrosButtonsDND = props => {
  const {
    classes,
    macros,
    toMacrosChange,
    macrosIndex,
    // addKeyToMacros,
    isRecord,
    deleteKeyFromMacros,
    openKeyConfig,
    openDelayConfig
  } = props;
  const [state, setState] = useState(
    macros.data.map((item, i) => `${item} ${i}`)
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isOnDrag, setIsOnDrag] = useState(false);

  const onDragStart = (e, index) => {
    setAnchorEl(null);
    setDraggedItem(state[index]);
    setIsOnDrag(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    console.log(keyCodeTable);
    console.log(keymapDB.keymapCodeTable);
  };

  const onDragOver = index => {
    const draggedOverItem = state[index];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = state.filter(item => item !== draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, draggedItem);
    setState(items);
  };

  const onDragEnd = () => {
    setDraggedItem(null);
    setIsOnDrag(false);
    toMacrosChange(state, macrosIndex, macros.macrosName);
  };

  const handlePopoverOpen = item => {
    setAnchorEl(item);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handlePopoverToggle = item => {
    setAnchorEl(anchorEl ? null : item);
  };

  const getKey = (str, open, classes, idx) => {
    const macroConfig = str[0];
    const oneMacrosArr = str.split(" ");
    let item,
      isDelay = false,
      keyNumber;
    switch (macroConfig) {
      case "1": {
        item = `delay ${oneMacrosArr[oneMacrosArr.length - 2]} ms`;
        isDelay = true;
        break;
      }
      case "5": {
        item = oneMacrosArr[oneMacrosArr.length - 2];
        break;
      }
      case "8": {
        keyNumber = +oneMacrosArr[oneMacrosArr.length - 2];
        item = keymapDB.keymapCodeTable.filter((item, i) => i === keyNumber)[0];
        if (item.labels.top) {
          item = `${item.labels.top} ${item.labels.primary}`;
        } else {
          item =
            item.labels.primary.length > 1
              ? item.labels.primary.toUpperCase()
              : item.labels.primary.toLowerCase();
        }
        break;
      }
    }
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color={isDelay ? "secondary" : "primary"}
          className={classes.button}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={() => {
            handlePopoverOpen(str);
          }}
          onMouseLeave={handlePopoverClose}
          onClick={() => {
            handlePopoverToggle(str);
          }}
          disabled={isOnDrag && draggedItem !== state[idx]}
        >
          {item}
        </Button>
        <ButtonDNDevents
          isDisplay={isRecord && anchorEl === str}
          handlePopoverOpen={handlePopoverOpen}
          handlePopoverClose={handlePopoverClose}
          item={str}
          keyIndex={idx}
          deleteKeyFromMacros={deleteKeyFromMacros}
          isDelay={isDelay}
          openKeyConfig={openKeyConfig}
          openDelayConfig={openDelayConfig}
          keyNumber={keyNumber}
        />
      </React.Fragment>
    );
  };

  const open = Boolean(anchorEl);

  return (
    <Paper className={classes.root}>
      <ul className={classes.ul}>
        {state.length > 0 &&
          state.map((item, idx) => (
            <li
              key={item}
              onDragOver={isRecord ? () => onDragOver(idx) : null}
              className={classes.li}
            >
              <div
                className={classes.drag}
                draggable={isRecord}
                onDragStart={isRecord ? e => onDragStart(e, idx) : null}
                onDragEnd={isRecord ? onDragEnd : null}
              >
                {getKey(item, open, classes, idx)}
              </div>
            </li>
          ))}
      </ul>
    </Paper>
  );
};

MacrosButtonsDND.propTypes = propTypes;

export default withStyles(styles)(MacrosButtonsDND);
