import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import MacrosTabs from "./MacrosTabs";
import MacrosProgress from "./MacrosProgress";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
    flex: 1
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MacrosDialog(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [startContext, setStartContext] = useState(false);
  const [macrosTab, setMacrosTab] = useState(null);
  const [macrosLength, setMacrosLength] = useState(0);
  const [activeMacrosIndex, setActiveMacrosIndex] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setStartContext(false);
  };

  const toStartContext = () => {
    setStartContext(true);
  };

  useEffect(() => {
    const string =
      "1 20 8 11 5 8 12 8 8 8 15 8 15 8 18 8 11 5 8 12 8 8 8 15 8 15 8 18 0 8 12 8 9 8 15 8 15 8 18 0 0 255 255 255";
    const macrosNames = ["MAcros 1", "Macros 2"];
    const newString = string.match(/[\d\s]+?\s0\s/g);
    const macroses = newString.map(macros =>
      macros.match(/[^5^0]{1}\s[0-9]+|5\s[0-9]\s[0-9]+/g)
    );
    const macrosesWithNames = macroses.map((data, i) =>
      macrosNames.reduce(
        (newObj, macrosName, j) =>
          i === j ? { ...newObj, macrosName, data } : newObj,
        {}
      )
    );
    setMacrosTab(macrosesWithNames);
    getMacrosLength(macrosesWithNames);
    console.log(macrosesWithNames);
  }, [open]);

  const getMacrosLength = data => {
    let length = 0;
    if (data.length) {
      data.forEach(item => {
        item.data.forEach(string => {
          length += string.split(" ").length;
        });
        length += 1;
      });
      length += 1;
    }
    setMacrosLength(length);
  };

  const toMacrosChangeFromDND = (newMacros, macrosIndex, macrosName) => {
    let data = newMacros.map(item => item.replace(/\s(\d+)$/, ""));
    const changedData = macrosTab.map((item, i) =>
      i === macrosIndex ? { macrosName, data } : item
    );
    setMacrosTab(changedData);
    getMacrosLength(changedData);
    toStartContext();
  };

  const toDeleteMacros = macrosIndex => {
    const newState = macrosTab.filter((_, i) => i !== macrosIndex);
    setMacrosTab(newState);
    getMacrosLength(newState);
    setStartContext(truncate);
  };

  const toSaveChanges = () => {
    console.log("changes saves");
    setStartContext(false);
  };

  const addKeyToMacros = e => {
    console.log(
      "add",
      e.keyCode,
      e.shiftKey,
      e.key,
      e.location,
      activeMacrosIndex
    );
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Macros
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          className={classes.appBar}
          color={startContext ? "secondary" : "primary"}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title} color="inherit">
              Macros config
            </Typography>
            <Button
              color="inherit"
              onClick={toSaveChanges}
              disabled={!startContext}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <MacrosTabs
          macrosTab={macrosTab}
          toMacrosChange={toMacrosChangeFromDND}
          toDeleteMacros={toDeleteMacros}
          addKeyToMacros={addKeyToMacros}
          setActiveMacrosIndex={setActiveMacrosIndex}
        />
        <MacrosProgress macrosLength={macrosLength} />
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(MacrosDialog);
