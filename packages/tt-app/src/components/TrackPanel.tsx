import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import { TrackingSince } from "../types";

import TrackButton from "./TrackButton";
import TrackInput from "./TrackInput";
import TrackTimer from "./TrackTimer";

type Props = {
  readonly trackingSince: TrackingSince;
  readonly taskName: string;
  readonly onTaskNameChange: (newValue: string) => void;
  readonly onTrackingStart: () => void;
  readonly onTrackingStop: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      padding: theme.spacing(1),
      "& > *": {
        padding: theme.spacing(1),
      },
    },
    entrySection: {
      flexGrow: 1,
    },
  })
);

const TrackPanel: React.FC<Props> = ({
  trackingSince,
  taskName,
  onTaskNameChange,
  onTrackingStart,
  onTrackingStop,
}: Props) => {
  const classes = useStyles();
  const isTracking = Boolean(trackingSince);
  const handleTrackButtonClick = useCallback(() => {
    if (isTracking) {
      onTrackingStop();
    } else {
      onTrackingStart();
    }
  }, [isTracking, onTrackingStart, onTrackingStop]);
  return (
    <Box className={classes.root}>
      <Box className={classes.entrySection}>
        <TrackInput value={taskName} onChange={onTaskNameChange} />
      </Box>
      <Box>
        <TrackTimer trackingSince={trackingSince} />
      </Box>
      <Box>
        <TrackButton isTracking={isTracking} onClick={handleTrackButtonClick} />
      </Box>
    </Box>
  );
};

export default TrackPanel;
