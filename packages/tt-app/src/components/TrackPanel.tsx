import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
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
  readonly onTrackingCancel: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      padding: theme.spacing(1),
      "& > *": {
        display: "inline-flex",
        alignItems: "center",
        padding: theme.spacing(1),
      },
    },
    entrySection: {
      flexGrow: 1,
    },
  }),
);

const TrackPanel: React.FC<Props> = ({
  trackingSince,
  taskName,
  onTaskNameChange,
  onTrackingStart,
  onTrackingStop,
  onTrackingCancel,
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
  const handleTrackInputSubmit = useCallback(() => {
    if (isTracking) {
      onTrackingStop();
    } else {
      onTrackingStart();
    }
  }, [isTracking, onTrackingStart, onTrackingStop]);
  return (
    <Box className={classes.root}>
      <Box className={classes.entrySection}>
        <TrackInput
          value={taskName}
          onChange={onTaskNameChange}
          onSubmit={handleTrackInputSubmit}
        />
      </Box>
      <Box>
        <TrackTimer trackingSince={trackingSince} />
      </Box>
      <Box>
        <TrackButton isTracking={isTracking} onClick={handleTrackButtonClick} />
      </Box>
      <Box>
        <IconButton onClick={onTrackingCancel} size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TrackPanel;
