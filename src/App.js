import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import termsFrPath from './Keepwaiting.md';
import Grid from '@material-ui/core/Grid';
import ReactMarkdown from 'react-markdown'
import Paper from '@material-ui/core/Paper';

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
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {terms: null}
  }

  componentWillMount() {
    fetch(termsFrPath).then((response) => response.text()).then((text) => {
      this.setState({terms: text})
    })
  }

  render() {
    const {classes} = this.props;
    return (
        <div>
          <img src={'./spacetimeRect.svg'} className={'image'}></img>
          <Grid container justify="center">
            <Grid item xs={12} sm={2}>
              <Paper className={classes.paper}>test1</Paper>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <ReactMarkdown source={this.state.terms}></ReactMarkdown>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Paper className={classes.paper}>test3</Paper>
            </Grid>
          </Grid>
        </div>
    );
  }
}

export default withStyles(useStyles)(App);
