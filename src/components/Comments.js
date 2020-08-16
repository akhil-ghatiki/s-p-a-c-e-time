import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  comment: {
    fontFamily: '-apple-system, BlinkMacSystemFont,'
        + ' \'Segoe UI\', \'Roboto\', \'Oxygen\','
        + ' \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\','
        + ' \'Helvetica Neue\', sans-serif',
  }
}));

export default function Comments(props) {
  const classes = useStyles();
  return (
      <p className={classes.comment}>{props.comment}</p>
  );
}
