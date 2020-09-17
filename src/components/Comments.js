import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  comment: {
    fontFamily: '-apple-system, BlinkMacSystemFont,'
      + ' \'Segoe UI\', \'Roboto\', \'Oxygen\','
      + ' \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\','
      + ' \'Helvetica Neue\', sans-serif',
  },
  inline: {
    flexGrow: 1,
    display: 'inline',
    marginRight: 10,
  },
  lowText: {
    flexGrow: 1,
    display: 'inline',
    marginRight: 10,
    color: '#808080',
    fontSize: 12
  }
}));

export default function Comments(props) {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" flexDirection="row" p={1}>
        <Box p={1}>
          <Avatar src={props.commentData.ImgSrc}></Avatar>
        </Box>
        <Box p={1}>
          <Typography className={classes.inline}>{props.commentData.userName}</Typography>
          <Typography className={classes.lowText}>{props.commentData.createdDateTime}</Typography>
          <Link target="_blank" rel="noopener noreferrer" href={props.commentData.commentUrl} color="inherit" className={classes.lowText}>#{props.commentData.id}</Link>
          <Typography className={classes.comment}>{props.commentData.comment}</Typography>
        </Box>
      </Box>
    </div>
  );
}
