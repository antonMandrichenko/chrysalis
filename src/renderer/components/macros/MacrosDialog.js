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
  // const [macrosForSave, setMacrosForSave] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toStartContext = () => {
    setStartContext(true);
  };

  useEffect(() => {
    const string =
      "1 20 8 11 5 8 12 8 8 8 15 8 15 8 18 0 8 12 8 9 8 15 8 15 8 18 0 0 ";
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
    console.log(macrosesWithNames);
  }, []);

  const toMacrosChange = (newMacros, macrosIndex, macrosName) => {
    let data = newMacros.map(item => item.replace(/\s(\d+)$/, ""));
    setMacrosTab(
      macrosTab.map((item, i) =>
        i === macrosIndex ? { macrosName, data } : item
      )
    );
    toStartContext();
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
            <Typography variant="h6" className={classes.title}>
              Macros config
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <MacrosTabs macrosTab={macrosTab} toMacrosChange={toMacrosChange} />
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(MacrosDialog);
