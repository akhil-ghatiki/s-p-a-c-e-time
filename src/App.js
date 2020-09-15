import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import contentFilePath from './posts/Keepwaiting.md';
import Grid from '@material-ui/core/Grid';
import PrimaryAppBar2 from "./components/PrimaryAppBar";
import Comments from "./components/Comments";
import Typography from '@material-ui/core/Typography';
import Api from "./utils/Api";
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

  componentDidMount() {
    this.updateCommentsState();
  }

  updateCommentsState() {
    Api.get('/issues/1/comments')
      .then((response) => {
        this.setState({ commentsData: response.data.map(comment => this.createCommentData(comment)) })
      });
  }

  createCommentData(comment) {
    let commentDetails = {};
    commentDetails['comment'] = comment.body;
    commentDetails['ImgSrc'] = comment.user.avatar_url;
    commentDetails['commentUrl'] = comment.html_url;
    commentDetails['id'] = comment.id;
    commentDetails['userName'] = comment.user.login;
    commentDetails['createdDateTime'] = comment.created_at;
    return commentDetails;
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
              <MarkdownMembrane markDownFilePath={contentFilePath}>
              </MarkdownMembrane>
            </div>
            <p>Try adding a comment in <span>
              <a href="https://github.com/akhil-ghatiki/akhil-ghatiki.github.io/issues/1"
                target="_blank" rel="noopener noreferrer">this issue</a></span> and it should show up
                in the comments below</p>
            <Typography variant={"h6"}>Comments:</Typography>
            {this.state.commentsData.map(commentDataObject =>
              <Comments commentData={commentDataObject}></Comments>
            )}
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
