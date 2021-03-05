/* eslint-disable sonarjs/no-duplicate-string */

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { MoreVert, PlayArrow } from "@material-ui/icons";
import clsx from "clsx";
import React, { useCallback } from "react";

import formatTrackDuration from "../logic/formatTrackDuration";
import formatTrackTime from "../logic/formatTrackTime";
import { TrackingRecord } from "../logic/trackingRecord";

type Props = {
  readonly record: TrackingRecord;
  readonly onResume: () => void;
  readonly onDelete: () => void;
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
    dropdown: {},
    dropdownButton: {},
  })
);

const TrackRecordsListItem: React.FC<Props> = ({
  record,
  onResume,
  onDelete,
}: Props) => {
  const classes = useStyles();
  const [
    menuAnchorEl,
    setMenuAnchorEl,
  ] = React.useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setMenuAnchorEl(event.currentTarget);
    },
    [setMenuAnchorEl]
  );
  const handleClose = useCallback(() => {
    setMenuAnchorEl(null);
  }, [setMenuAnchorEl]);

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
      <Box className={classes.dropdown}>
        <IconButton
          className={classes.dropdownButton}
          onClick={handleOpenMenu}
          role={`track-records-list-item-${record.id}-dropdown`}
          size="small"
        >
          <MoreVert />
        </IconButton>
        <Menu
          id={`track-records-list-item-${record.id}-dropdown-menu`}
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default TrackRecordsListItem;
