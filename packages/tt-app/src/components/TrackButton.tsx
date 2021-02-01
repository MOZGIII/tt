import { createStyles, makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { PlayArrow, Stop } from "@material-ui/icons";
import React from "react";

type Props = {
  readonly isTracking?: boolean;
  readonly onClick: () => void;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
  })
);

const TrackButton: React.FC<Props> = ({ isTracking, onClick }: Props) => {
  const classes = useStyles();
  return (
    <Fab className={classes.root} onClick={onClick}>
      {isTracking ? <Stop /> : <PlayArrow />}
    </Fab>
  );
};

export default TrackButton;
