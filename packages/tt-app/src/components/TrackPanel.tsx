import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Temporal } from "proposal-temporal";
import React from "react";

import TrackButton from "./TrackButton";
import TrackInput from "./TrackInput";
import TrackTimer from "./TrackTimer";

type Props = {
  readonly trackingSince?: Temporal.ZonedDateTime;
  readonly taskName: string;
  readonly onTaskNameChange: (newValue: string) => void;
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
}: Props) => {
  const classes = useStyles();
  const isTracking = Boolean(trackingSince);
  return (
    <Box className={classes.root}>
      <Box className={classes.entrySection}>
        <TrackInput value={taskName} onChange={onTaskNameChange} />
      </Box>
      <Box>
        <TrackTimer trackingSince={trackingSince} />
      </Box>
      <Box>
        <TrackButton isTracking={isTracking} />
      </Box>
    </Box>
  );
};

export default TrackPanel;
