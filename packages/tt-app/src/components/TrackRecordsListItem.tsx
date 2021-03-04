import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PlayArrow } from "@material-ui/icons";
import React from "react";

import formatTrackDuration from "../logic/formatTrackDuration";
import formatTrackTime from "../logic/formatTrackTime";
import { TrackingRecord } from "../logic/trackingRecord";

type Props = {
  readonly record: TrackingRecord;
  readonly onResume: () => void;
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
    taskName: {
      flexGrow: 1,
    },
    timeInterval: {},
    duration: {},
    resume: {},
  })
);

const TrackRecordsListItem: React.FC<Props> = ({ record, onResume }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} role={`track-records-list-item-${record.id}`}>
      <Box className={classes.taskName}>{record.taskName}</Box>
      <Box className={classes.timeInterval}>
        {formatTrackTime(record.from)} - {formatTrackTime(record.to)}
      </Box>
      <Box className={classes.duration}>
        {formatTrackDuration(record.to.since(record.from))}
      </Box>
      <IconButton
        className={classes.resume}
        onClick={onResume}
        role={`track-records-list-item-${record.id}-resume`}
      >
        <PlayArrow />
      </IconButton>
    </Box>
  );
};

export default TrackRecordsListItem;
