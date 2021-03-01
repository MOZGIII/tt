import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

import { TrackingRecord } from "../logic/trackingRecord";
import TrackRecordsListItem from "./TrackRecordsListItem";

type Props = {
  readonly records: Array<TrackingRecord>;
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

const TrackRecordsList: React.FC<Props> = ({ records }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {records.map((record) => (
        <TrackRecordsListItem key={record.id} record={record} />
      ))}
    </Box>
  );
};

export default TrackRecordsList;
