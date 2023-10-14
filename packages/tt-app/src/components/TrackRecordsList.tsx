import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

import useMapOverArray from "../hooks/useMapOverArray";
import { TrackingRecord, TrackingRecordId } from "../logic/trackingRecord";
import TrackRecordsListItem from "./TrackRecordsListItem";

type Props = {
  readonly records: Array<TrackingRecord>;
  readonly onResume: (recordId: TrackingRecordId) => void;
  readonly onDelete: (recordId: TrackingRecordId) => void;
  readonly onTaskNameChange: (
    recordId: TrackingRecordId,
    taskName: string,
  ) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "block",
      flexDirection: "row",
      padding: theme.spacing(1),
    },
  }),
);

const TrackRecordsList: React.FC<Props> = ({
  records,
  onResume,
  onDelete,
  onTaskNameChange,
}: Props) => {
  const classes = useStyles();
  const onResumes = useMapOverArray(
    records,
    (record) => () => onResume(record.id),
    [onResume],
  );
  const onDeletes = useMapOverArray(
    records,
    (record) => () => onDelete(record.id),
    [onDelete],
  );
  const onTaskNameChanges = useMapOverArray(
    records,
    (record) => (taskName: string) => onTaskNameChange(record.id, taskName),
    [onTaskNameChange],
  );
  return (
    <Box className={classes.root}>
      {records.map((record, idx) => (
        <TrackRecordsListItem
          key={record.id}
          record={record}
          onResume={onResumes[idx]}
          onDelete={onDeletes[idx]}
          onTaskNameChange={onTaskNameChanges[idx]}
        />
      ))}
    </Box>
  );
};

export default TrackRecordsList;
