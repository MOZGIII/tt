import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useMemo } from "react";

import { TrackingRecord, TrackingRecordId } from "../logic/trackingRecord";
import TrackRecordsListItem from "./TrackRecordsListItem";

type Props = {
  readonly records: Array<TrackingRecord>;
  readonly onResume: (recordId: TrackingRecordId) => void;
  readonly onDelete: (recordId: TrackingRecordId) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "block",
      flexDirection: "row",
      padding: theme.spacing(1),
    },
  })
);

const TrackRecordsList: React.FC<Props> = ({
  records,
  onResume,
  onDelete,
}: Props) => {
  const classes = useStyles();
  const onResumes = useMemo(
    () => records.map((record) => () => onResume(record.id)),
    [records, onResume]
  );
  const onDeletes = useMemo(
    () => records.map((record) => () => onDelete(record.id)),
    [records, onDelete]
  );
  return (
    <Box className={classes.root}>
      {records.map((record, idx) => (
        <TrackRecordsListItem
          key={record.id}
          record={record}
          onResume={onResumes[idx]}
          onDelete={onDeletes[idx]}
        />
      ))}
    </Box>
  );
};

export default TrackRecordsList;
