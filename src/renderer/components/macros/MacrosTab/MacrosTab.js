import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MacrosCard from "./MacrosCard";

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

class MacrosTab extends React.Component {
  handleChange = key => (e, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { values } = this.props;

    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10} md={8}>
          <MacrosCard values={values} />
        </Grid>
      </Grid>
    );
  }
}

MacrosTab.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MacrosTab);
