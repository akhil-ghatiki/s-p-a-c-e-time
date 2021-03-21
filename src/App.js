import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
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
  commentHeader: {
    margin: 15
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
    this.state = {markDownContent: null, commentsData: []}
  }

  componentDidMount() {
    this.updateCommentsState();
  }

  static getDerivedStateFromProps() {

  }

  updateCommentsState() {
    // //Api.get('/issues/1/comments')
    // let commentUrl = null;
    // if (this.props.contentFilePath.includes("Keepwaiting")) {
    //   commentUrl = "https://api.github.com/repos/akhil-ghatiki/akhil-ghatiki.github.io/issues/1/comments";
    // } else {
    //   commentUrl = "https://api.github.com/repos/akhil-ghatiki/ghpages-blog-comments/issues/1/comments";
    // }
    Api.get(this.getCommentApiUrl())
    .then((response) => {
      this.setState({
        commentsData: response.data.map(
            comment => this.createCommentData(comment))
      })
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
    const {classes} = this.props;
    const gitIssueBaseUrl_keepWaiting = "https://github.com/akhil-ghatiki/akhil-ghatiki.github.io/issues/";
    const gitIssueBaseUrl = "https://github.com/akhil-ghatiki/ghpages-blog-comments/issues/";
    let contentFilePath = this.props.contentFilePath;
    const gitIssueUrl = this.getGitIssueUrl(contentFilePath,
        gitIssueBaseUrl_keepWaiting, gitIssueBaseUrl);
    return (
        <div className={'App'}>
          <PrimaryAppBar2></PrimaryAppBar2>
          <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} sm={3.5}>
              <div></div>
            </Grid>
            <Grid item xs={12} sm={5}>
              <div>
                <MarkdownMembrane markDownFilePath={this.props.contentFilePath}>
                </MarkdownMembrane>
              </div>
              <p className={classes.commentHeader}>Shoot your comments for this
                post in <span>
              <a href={gitIssueUrl}
                 target="_blank"
                 rel="noopener noreferrer">this link</a></span>. It will
                show up
                in the comments below</p>
              <Typography className={classes.commentHeader}
                          variant={"h6"}>Comments:</Typography>
              {this.state.commentsData.map(commentDataObject =>
                  <Comments commentData={commentDataObject}
                            gitIssue={this.props.gitIssue}></Comments>
              )}
            </Grid>
            <Grid item xs={12} sm={3.5}>
              <div></div>
            </Grid>
          </Grid>
        </div>
    );
  }

  getGitIssueUrl(contentFilePath, gitIssueBaseUrl_keepWaiting,
      gitIssueBaseUrl) {
    if (contentFilePath.includes("Keepwaiting")) {
      return gitIssueBaseUrl_keepWaiting.concat(this.props.gitIssue);
    } else {
      return gitIssueBaseUrl.concat(this.props.gitIssue);
    }
  }

  getCommentApiUrl() {
    if (this.props.contentFilePath.includes("Keepwaiting")) {
      return "https://api.github.com/repos/akhil-ghatiki/akhil-ghatiki.github.io/issues/"
          + this.props.gitIssue + "/comments";
    } else {
      return "https://api.github.com/repos/akhil-ghatiki/ghpages-blog-comments/issues/"
          + this.props.gitIssue + "/comments";
    }
  }
}

export default withStyles(useStyles)(App);
