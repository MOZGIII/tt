/* eslint-disable sonarjs/no-duplicate-string */
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PlayArrow } from "@material-ui/icons";
import clsx from "clsx";
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
      marginBottom: theme.spacing(1),
      "& > *": {
        display: "inline-flex",
        alignItems: "center",
        padding: theme.spacing(1),
      },
    },
    taskName: {
      flexGrow: 1,
    },
    taskNameInput: {},
    timeInterval: {
      textAlign: "center",
    },
    timeIntervalInput: {
      width: theme.spacing(8),
    },
    timeIntervalInputFrom: {
      "& > input": {
        textAlign: "right",
      },
    },
    timeIntervalInputTo: {},
    timeIntervalSeparator: {
      display: "inline-flex",
      alignItems: "center",
    },
    duration: {
      display: "inline-flex",
      alignItems: "center",
    },
    durationText: {
      width: theme.spacing(12),
      textAlign: "right",
    },
    resume: {},
    resumeButton: {},
  })
);

const TrackRecordsListItem: React.FC<Props> = ({ record, onResume }: Props) => {
  const classes = useStyles();
  return (
    <Paper
      className={classes.root}
      role={`track-records-list-item-${record.id}`}
      square
    >
      <Box className={classes.taskName}>
        <InputBase
          className={classes.taskNameInput}
          fullWidth
          placeholder="Add description"
          value={record.taskName}
        />
      </Box>
      <Box className={classes.timeInterval}>
        <InputBase
          className={clsx(
            classes.timeIntervalInput,
            classes.timeIntervalInputFrom
          )}
          value={formatTrackTime(record.from)}
        />
        <Typography variant="body1" className={classes.timeIntervalSeparator}>
          &nbsp;-&nbsp;
        </Typography>
        <InputBase
          className={clsx(
            classes.timeIntervalInput,
            classes.timeIntervalInputTo
          )}
          value={formatTrackTime(record.to)}
        />
      </Box>
      <Box className={classes.duration}>
        <Typography variant="body1" className={classes.durationText}>
          {formatTrackDuration(record.to.since(record.from))}
        </Typography>
      </Box>
      <Box className={classes.resume}>
        <IconButton
          className={classes.resumeButton}
          onClick={onResume}
          role={`track-records-list-item-${record.id}-resume`}
          size="small"
        >
          <PlayArrow />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TrackRecordsListItem;
