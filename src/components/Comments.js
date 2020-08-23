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
    display: 'inline',
    marginRight: 20,
  },
  lowText: {
    color: '#808080'
  }
}));

export default function Comments(props) {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" flexDirection="row" p={1}>
        <Box p={1}>
          <Avatar src={props.comment.ImgSrc}></Avatar>
        </Box>
        <Box p={1}>
          <Typography className={classes.inline}>{props.comment.userName}</Typography>
          <Typography className={[classes.inline, classes.lowText]}>{props.comment.createdDateTime}</Typography>
          <Link href={props.comment.commentUrl} color="inherit" className={[classes.inline, classes.lowText]}>#{props.comment.id}</Link>
          <Typography className={classes.comment}>{props.comment.comment}</Typography>
        </Box>
      </Box>
    </div>
  );
}
