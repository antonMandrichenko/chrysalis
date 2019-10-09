// -*- mode: js-jsx -*-
/* Chrysalis -- Dygma Raise macros
 * Copyright (C) 2019  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import RootRef from "@material-ui/core/RootRef";
// import Focus from "@chrysalis-api/focus";
import MacrosCardInput from "./MacrosCardInput";
import DeleteMacrosButton from "./DeleteMacrosButton";
import MacrosButtonsDND from "./MacrosButtonsDND";
import AddKeyInMacros from "./AddKeyInMacros";
// import PlayMacros from "./PlayMacros";
import i18n from "../../../i18n";

const styles = {
  card: {
    width: "100%"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  container: {
    marginTop: 10
  },
  flex: {
    display: "flex",
    justifyContent: "flex-end"
  },
  flexStart: {
    justifyContent: "flex-start"
  },
  content: {
    padding: 10
  },
  button: {
    color: "green"
  },
  cardInRecord: {
    border: "2px solid green"
  }
};

// const focus = new Focus();

function MacrosCard(props) {
  const {
    classes,
    macros,
    toMacrosChange,
    macrosIndex,
    toDeleteMacros,
    addKeyToMacros,
    toRecordMacros,
    isRecord,
    openKeyConfig,
    deleteKeyFromMacros,
    openDelayConfig,
    toChangeMacrosName,
    currentLanguageLayout
  } = props;

  // const [value, setValue] = useState("");

  const domRef = React.useRef();

  React.useEffect(() => {
    if (isRecord) {
      domRef.current.focus();
    }
  }, [isRecord]);

  // const handlePlay = async () => {
  //   await focus.request("macros.trigger", "0").then(() => {
  //     return focus.request("0");
  //   });
  // };

  return (
    <Card
      className={classNames(classes.card, isRecord && classes.cardInRecord)}
    >
      <CardContent className={classes.content}>
        <Grid container>
          <Grid
            item
            xs={10}
            className={classNames(classes.item, classes.flexStart)}
          >
            <Typography gutterBottom variant="h5" component="h2">
              {macros.macrosName}
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.flex}>
            <DeleteMacrosButton
              toDeleteMacros={toDeleteMacros}
              macrosIndex={macrosIndex}
              isRecord={isRecord}
              isMacrosInMemory={Boolean(macros.data.length)}
            >
              {i18n.editor.macros.deleteMacros}
            </DeleteMacrosButton>
          </Grid>
        </Grid>
        <Divider />
        <Grid container className={classes.container}>
          <Grid item xs={4}>
            <MacrosCardInput
              isRecord={isRecord}
              toChangeMacrosName={toChangeMacrosName}
              macrosName={macros.macrosName}
            />
            <AddKeyInMacros
              isRecord={isRecord}
              openKeyConfig={openKeyConfig}
              openDelayConfig={openDelayConfig}
            >
              {i18n.editor.macros.addKeyOrDelay}
            </AddKeyInMacros>
            {/* <Divider />
            <PlayMacros /> */}
          </Grid>
          <Grid item xs={8} className={classes.item}>
            <RootRef rootRef={domRef}>
              <MacrosButtonsDND
                macros={macros}
                toMacrosChange={toMacrosChange}
                macrosIndex={macrosIndex}
                addKeyToMacros={addKeyToMacros}
                isRecord={isRecord}
                deleteKeyFromMacros={deleteKeyFromMacros}
                openKeyConfig={openKeyConfig}
                openDelayConfig={openDelayConfig}
                currentLanguageLayout={currentLanguageLayout}
              />
            </RootRef>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color={!isRecord ? "secondary" : "inherit"}
          onClick={toRecordMacros}
          className={isRecord && classes.button}
        >
          Record macros
        </Button>
        {/* <Button
          size="small"
          color={!isRecord ? "primary" : "inherit"}
          onClick={handlePlay}
          className={isRecord && classes.button}
        >
          Play macros
        </Button> */}
      </CardActions>
    </Card>
  );
}

MacrosCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosCard);
