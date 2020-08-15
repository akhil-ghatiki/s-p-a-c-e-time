import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import markDownFilePath from './Keepwaiting.md';
import Grid from '@material-ui/core/Grid';
import ReactMarkdown from 'react-markdown'
import PrimaryAppBar2 from "./components/PrimaryAppBar";

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
  }
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {markDownContent: null}
  }

  componentWillMount() {
    fetch(markDownFilePath).then((response) => response.text()).then((text) => {
      this.setState({markDownContent: text})
    })
  }

  render() {
    const {classes} = this.props;
    return (
        <div className={'App'}>
          <PrimaryAppBar2></PrimaryAppBar2>
          <img src={'./spacetimeRect.svg'} alt={"poster"} className={'image'}></img>
          <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={2}>
              <div></div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div>
                <ReactMarkdown className={classes.markdownText}
                    source={this.state.markDownContent}></ReactMarkdown>
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
