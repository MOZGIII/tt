import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

import formatTrackDuration from "../logic/formatTrackDuration";
import formatTrackTime from "../logic/formatTrackTime";
import { TrackingRecord } from "../logic/trackingRecord";

type Props = {
  readonly record: TrackingRecord;
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
  })
);

const TrackRecordsListItem: React.FC<Props> = ({ record }: Props) => {
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
    </Box>
  );
};

export default TrackRecordsListItem;
