import { createStyles, makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { PlayArrow, Stop } from "@material-ui/icons";
import React from "react";

type Props = {
  readonly isTracking: boolean;
  readonly onClick: () => void;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      background: (props: Props) =>
        props.isTracking
          ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
          : "linear-gradient(45deg, #6BFE8B 30%, #96F321 90%)",
    },
  })
);

const TrackButton: React.FC<Props> = (props: Props) => {
  const classes = useStyles(props);
  const { isTracking, onClick } = props;
  return (
    <Fab className={classes.root} onClick={onClick} role="trackButton">
      {isTracking ? <Stop /> : <PlayArrow />}
    </Fab>
  );
};

export default TrackButton;
