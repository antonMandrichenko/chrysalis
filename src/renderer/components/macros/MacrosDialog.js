import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import settings from "electron-settings";
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
import MacrosCardDelay from "./MacrosCardDelay";
import { baseKeyCodeTable } from "@chrysalis-api/keymap";
import { orderArray } from "../SearchKeyBox/SearchKeyBox";
import GroupItem from "../SearchKeyBox/GroupItem";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Focus from "@chrysalis-api/focus";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
    flex: 1
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  wrapper: {
    height: "90vh",
    width: "90vw",
    position: "relative"
  },
  wrapperDelay: {
    height: "10vh",
    width: "40vw"
  },
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 30px 50px rgba(0, 0, 0, 0.7)",
    padding: "13px 8px 0",
    overflowY: "auto",
    [theme.breakpoints.down("md")]: {
      overflowY: "scroll"
    }
  },
  rootDelay: {
    overflow: "hidden"
  },
  close: {
    position: "absolute",
    right: -20,
    cursor: "pointer"
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let keyCode;

const toOrderArrayWithKeys = baseKeyCodeTable =>
  orderArray.map(item =>
    !item.isUnite
      ? {
          // Change baseKeyCodeTable from props to local variable
          ...baseKeyCodeTable.filter(
            group => item.group === group.groupName
          )[0],
          displayName: item.displayName
        }
      : {
          groupName: item.group,
          displayName: item.displayName,
          //Change baseKeyCodeTable from props to local variable
          innerGroup: baseKeyCodeTable.filter(
            group =>
              item.group.includes(
                group.groupName.slice(0, group.groupName.indexOf(" "))
              ) ||
              (item.group === "Navigation & Miscellaneous" &&
                group.groupName === "Blank")
          )
        }
  );

const focus = new Focus();

const initMacros = { macrosName: "Macros 1", data: [] };

function MacrosDialog(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [startContext, setStartContext] = useState(false);
  const [macrosTab, setMacrosTab] = useState(null);
  const [macrosLength, setMacrosLength] = useState(0);
  const [oldMacrosLength, setOldMacrosLength] = useState(0);
  const [activeMacrosIndex, setActiveMacrosIndex] = useState(null);
  const [isOpenKeyConfig, setIsOpenKeyConfig] = useState(false);
  const [orderArrayWithKeys, setOrderArrayWithKeys] = useState(null);
  const [isOpenDelayConfig, setIsOpenDelayConfig] = useState(false);
  const [delayKeyEdit, setDelayKeyEdit] = useState(null);
  const [keyEdit, setKeyEdit] = useState(null);

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
    let macrosMap;
    // const string =
    // "1 20 8 11 5 8 12 8 8 8 15 8 15 8 18 8 11 5 8 12 8 8 8 15 8 15 8 18 0 8 12 8 9 8 15 8 15 8 18 0 0 255 255 255";
    const getMacrosMap = async () => {
      // await focus.command("macros.map", string);
      macrosMap = await focus.command("macros.map");

      console.log(macrosMap);
      const macrosNames = settings.get("macrosNames")
        ? settings.get("macrosNames").split(" ")
        : ["Macros 1"];
      // const macrosNames = ["MAcros 1", "Macros 2"];
      const newString = macrosMap.match(/[\d\s]+?\s0\s/g);
      const macroses = newString
        ? newString.map(macros =>
            macros.match(/[^5^0]{1}\s[0-9]+|5\s[0-9]\s[0-9]+/g)
          )
        : [];
      if (macrosNames.length && macroses.length)
        macrosNames.length = macroses.length;

      const macrosesWithNames = macroses.length
        ? macroses.map((data, i) =>
            macrosNames.reduce(
              (newObj, macrosName, j) =>
                i === j && data
                  ? {
                      ...newObj,
                      macrosName: macrosName ? macrosName : `Macros ${i + 1}`,
                      data
                    }
                  : data && newObj,
              {}
            )
          )
        : [initMacros];
      setMacrosTab(macrosesWithNames);
      getMacrosLength(macrosesWithNames);
      console.log(macrosesWithNames);
    };
    getMacrosMap();
  }, [open]);

  useEffect(() => {
    setOrderArrayWithKeys(toOrderArrayWithKeys(baseKeyCodeTable));
  }, []);

  const getMacrosLength = data => {
    let length = 0;
    if (data.length && data[0].data.length) {
      data.forEach(item => {
        item.data.forEach(string => {
          length += string.split(" ").length;
        });
        length += 1;
      });
      length += 1;
    }
    setMacrosLength(length);
    if (!oldMacrosLength) setOldMacrosLength(length);
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
    let newState = macrosTab.filter((_, i) => i !== macrosIndex);
    if (!newState.length) {
      newState = [initMacros];
    }
    setMacrosTab(newState);
    getMacrosLength(newState);
    setStartContext(true);
  };

  const toSaveChanges = async () => {
    console.log("changes saves");
    setStartContext(false);
    console.log(macrosTab);
    const addToAllLength =
      oldMacrosLength > macrosLength &&
      Array(oldMacrosLength - macrosLength + 1)
        .fill("255")
        .join(" ");
    const newMacrosMap = macrosTab
      .reduce(
        (newMacros, item) =>
          newMacros.concat(" ", item.data.join(" ")).concat(" ", 0),
        ""
      )
      .concat(" ", addToAllLength);
    console.log(
      newMacrosMap,
      newMacrosMap.split(" ").length,
      typeof newMacrosMap
    );
    await focus.command("macros.map", newMacrosMap);
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

  const openKeyConfig = (keyIndex, keyNumber) => {
    setIsOpenKeyConfig(true);
    if (keyIndex !== undefined) {
      setKeyEdit(keyIndex);
      keyCode = keyNumber;
    }
  };

  const handleCloseKeyConfig = () => {
    setIsOpenKeyConfig(false);
    setKeyEdit(null);
    keyCode = null;
  };

  const openDelayConfig = keyIndex => {
    setIsOpenDelayConfig(true);
    if (keyIndex !== undefined) setDelayKeyEdit(keyIndex);
  };

  const handleCloseDelayConfig = () => {
    setIsOpenDelayConfig(false);
    setDelayKeyEdit(null);
  };

  const changeMacrosTabState = (newMacrosName, newData) =>
    macrosTab.map((item, i) =>
      i === activeMacrosIndex
        ? {
            macrosName: newMacrosName || item.macrosName,
            data: (newData && newData(item)) || item.data
          }
        : item
    );

  const keySelect = code => {
    let newArr;
    if (keyEdit === null) {
      const changeData = item => item.data.concat([`8 ${code}`]);
      newArr = changeMacrosTabState(null, changeData);
    } else {
      const changeData = item =>
        item.data.map((keyMacros, i) =>
          i === keyEdit ? `8 ${code}` : keyMacros
        );
      newArr = changeMacrosTabState(null, changeData);
    }
    setMacrosTab(newArr);
    getMacrosLength(newArr);
    setStartContext(true);
    handleCloseKeyConfig();
  };

  const deleteKeyFromMacros = keyIndex => {
    const changeData = item => item.data.filter((_, i) => i !== keyIndex);
    const newArr = changeMacrosTabState(null, changeData);
    setMacrosTab(newArr);
    getMacrosLength(newArr);
    setStartContext(true);
  };

  const toChangeMacrosName = newName => {
    const newArr = changeMacrosTabState(newName, null);
    setMacrosTab(newArr);
    setStartContext(true);
  };

  const toAddDelayToMacros = delay => {
    let newArr;
    if (delayKeyEdit === null) {
      const changeData = item => [`1 ${delay}`].concat(item.data);
      newArr = changeMacrosTabState(null, changeData);
    } else {
      const changeData = item =>
        item.data.map((delayMacros, i) =>
          i === delayKeyEdit ? `1 ${delay}` : delayMacros
        );
      newArr = changeMacrosTabState(null, changeData);
    }
    setMacrosTab(newArr);
    getMacrosLength(newArr);
    setStartContext(true);
    handleCloseDelayConfig();
  };

  const groupeList =
    orderArrayWithKeys &&
    orderArrayWithKeys.map((group, index) => (
      <GroupItem
        key={group.groupName}
        group={group}
        keySelect={keySelect}
        isUnited={Boolean(group.innerGroup)}
        selectedKeyCode={keyEdit !== null ? keyCode : null}
        numderContGrids={orderArrayWithKeys.length === index + 1 ? 8 : 4}
        numderLgItemsGrids={orderArrayWithKeys.length === index + 1 ? 1 : 2}
        numderMdItemsGrids={orderArrayWithKeys.length === index + 1 ? 2 : 3}
      />
    ));

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
          openKeyConfig={openKeyConfig}
          deleteKeyFromMacros={deleteKeyFromMacros}
          openDelayConfig={openDelayConfig}
          toChangeMacrosName={toChangeMacrosName}
        />
        <MacrosProgress macrosLength={macrosLength} />
      </Dialog>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        open={isOpenKeyConfig || isOpenDelayConfig}
        onClose={
          isOpenDelayConfig ? handleCloseDelayConfig : handleCloseKeyConfig
        }
        closeAfterTransition
      >
        <div
          className={classNames(
            isOpenKeyConfig && classes.wrapper,
            isOpenDelayConfig && classes.wrapperDelay
          )}
        >
          <CloseIcon
            className={classes.close}
            onClick={
              isOpenDelayConfig ? handleCloseDelayConfig : handleCloseKeyConfig
            }
          />
          <Grid
            container
            className={classNames(
              classes.root,
              isOpenDelayConfig && classes.rootDelay
            )}
            spacing={8}
          >
            {isOpenKeyConfig ? (
              groupeList
            ) : (
              <MacrosCardDelay
                isRecord={true}
                toAddDelayToMacros={toAddDelayToMacros}
              />
            )}
          </Grid>
        </div>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(MacrosDialog);
