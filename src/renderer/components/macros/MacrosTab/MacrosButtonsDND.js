import React, { useState } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const propTypes = {};

const stateInit = {
  items: [
    "🍰 Cake",
    "🍩 Donut",
    "🍎 Apple",
    "🍕 Pizza",
    "🍰 Cake1",
    "🍩 Donut1",
    "🍎 Apple1",
    "🍕 Pizza1"
  ]
};

const styles = {
  root: {
    maxHeight: 700,
    overflow: "auto"
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    width: "100%"
  },
  li: {
    padding: 10,
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    lineHeight: 1
  },
  drag: {
    cursor: "move"
  },
  button: {
    width: 200
  }
};

function MacrosButtonsDND(props) {
  const { classes } = props;
  const [state, setState] = useState(stateInit);
  const [draggedItem, setDraggedItem] = useState(null);

  const onDragStart = (e, index) => {
    setDraggedItem(state.items[index]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = index => {
    const draggedOverItem = state.items[index];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = state.items.filter(item => item !== draggedItem);

    // add the dragged item after the dragged over item
    items.splice(index, 0, draggedItem);

    setState({ items });
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <Paper className={classes.root}>
      <ul className={classes.ul}>
        {state.items.map((item, idx) => (
          <li
            key={item}
            onDragOver={() => onDragOver(idx)}
            className={classes.li}
          >
            <div
              className={classes.drag}
              draggable
              onDragStart={e => onDragStart(e, idx)}
              onDragEnd={onDragEnd}
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                fullWidth
              >
                {item}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Paper>
  );
}

MacrosButtonsDND.propTypes = propTypes;

export default withStyles(styles)(MacrosButtonsDND);
