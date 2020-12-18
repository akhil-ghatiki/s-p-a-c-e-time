import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import Grid from '@material-ui/core/Grid';
import homeFilePath from './posts/home/home.md';
import PrimaryAppBar2 from "./components/PrimaryAppBar";
import MarkdownMembrane from "./components/MarkdownMembrane";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  control: {
    padding: theme.spacing(2),
  },
  markdownText: {
    margin: 30
  },
  link: {
    fontFamily: '-apple-system, BlinkMacSystemFont,'
      + ' \'Segoe UI\', \'Roboto\', \'Oxygen\','
      + ' \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\','
      + ' \'Helvetica Neue\', sans-serif',
  }
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { markDownContent: null, commentsData: [] }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={'App'}>
        <PrimaryAppBar2></PrimaryAppBar2>
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12} sm={2}>
            <div></div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <div>
              <MarkdownMembrane markDownFilePath={homeFilePath}>
              </MarkdownMembrane>
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div></div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
