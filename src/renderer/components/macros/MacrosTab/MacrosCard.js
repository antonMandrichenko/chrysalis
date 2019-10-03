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
import MacrosCardInput from "./MacrosCardInput";
import MacrosCardDelay from "./MacrosCardDelay";
import DeleteMacrosButton from "./DeleteMacrosButton";
import MacrosButtonsDND from "./MacrosButtonsDND";
import AddKeyInMacros from "./AddKeyInMacros";
import i18n from "../../../i18n";

const styles = {
  card: {
    width: "100%"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
  }
};

function MacrosCard(props) {
  const { classes, macros, toMacrosChange, macrosIndex } = props;
  return (
    <Card className={classes.card}>
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
            <DeleteMacrosButton>
              {i18n.editor.macros.deleteMacros}
            </DeleteMacrosButton>
          </Grid>
        </Grid>
        <Divider />
        <Grid container className={classes.container}>
          <Grid item xs={4}>
            <MacrosCardInput />
            <MacrosCardDelay />
            <AddKeyInMacros>{i18n.editor.macros.addKeyOrDelay}</AddKeyInMacros>
          </Grid>
          <Grid item xs={8} className={classes.item}>
            <MacrosButtonsDND
              macros={macros}
              toMacrosChange={toMacrosChange}
              macrosIndex={macrosIndex}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary">
          Record macros
        </Button>
      </CardActions>
    </Card>
  );
}

MacrosCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosCard);
