import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Link } from '@material-ui/core';

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
}));

export default function Comments(props) {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" flexDirection="row">
        <Box p={2}>
          <Avatar src={props.comment.ImgSrc}></Avatar>
        </Box>
        <Box p={1}>
          <p varient='h6'>{props.comment.userName}</p>
          <p className={classes.comment}>{props.comment.comment}</p>
          <Link href={props.comment.commentUrl} color="inherit">{props.comment.id}</Link>
        </Box>
      </Box>
    </div>
  );
}
