import { createStyles, makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { PlayArrow } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
  })
);

const TrackButton: React.FC = () => {
  const classes = useStyles();
  return (
    <Fab className={classes.root}>
      <PlayArrow />
    </Fab>
  );
};

export default TrackButton;
