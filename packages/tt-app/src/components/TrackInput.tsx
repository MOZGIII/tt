import InputBase from "@material-ui/core/InputBase";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(6),
      fontSize: theme.spacing(3),
      padding: theme.spacing(1),
    },
  })
);

const TrackInput: React.FC = () => {
  const classes = useStyles();
  return (
    <InputBase
      className={classes.root}
      fullWidth
      placeholder="What are you working on?"
    />
  );
};

export default TrackInput;
