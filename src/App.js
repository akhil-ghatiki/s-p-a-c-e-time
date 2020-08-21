import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import markDownFilePath from './Keepwaiting.md';
import Grid from '@material-ui/core/Grid';
import ReactMarkdown from 'react-markdown'
import PrimaryAppBar2 from "./components/PrimaryAppBar";
import Comments from "./components/Comments";
import Typography from '@material-ui/core/Typography';
import Api from "./utils/Api";

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
    this.state = {markDownContent: null, comment: "test", comments: []}
  }

  componentWillMount() {
    fetch(markDownFilePath).then((response) => response.text()).then((text) => {
      this.setState({markDownContent: text})
    })
  }

  componentDidMount() {
    Api.get('/issues/1/comments')
    .then((response) => {
      // console.log(response.data[0].body);
      // response.data.map(comment => comment.body);
      this.setState({comments: response.data.map(comment => comment.body)})
    });
  }

  render() {
    const {classes} = this.props;
    return (
        <div className={'App'}>
          <PrimaryAppBar2></PrimaryAppBar2>
          <img src={'./spacetimeRect.svg'} alt={"poster"}
               className={'image'}></img>
          <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={2}>
              <div></div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div>
                <ReactMarkdown className={classes.markdownText}
                               source={this.state.markDownContent}></ReactMarkdown>
              </div>
              <p>Try adding a comment in <span>
                <a href="https://github.com/akhil-ghatiki/akhil-ghatiki.github.io/issues/1"
                   target="_blank">this issue</a></span> and it should show up
                in the comments below</p>
              <Typography variant={"h6"}>Comments:</Typography>
              {this.state.comments.map(comment =>
                  <Comments comment={comment}></Comments>
              )}
              {/*<Comments comment={this.state.comments[0]}></Comments>*/}
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
