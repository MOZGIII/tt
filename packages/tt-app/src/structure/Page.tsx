import Paper from "@material-ui/core/Paper";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import TrackPanel from "../components/TrackPanel";
import TrackRecordsList from "../components/TrackRecordsList";
import currentZonedDateTimeISO from "../logic/currentZonedDateTimeISO";
import { TrackingRecordId } from "../logic/trackingRecord";
import { Dispatch, RootState } from "../store";

const Page: React.FC = () => {
  const tracker = useSelector((state: RootState) => state.tracker);
  const records = useSelector((state: RootState) => state.records);
  const dispatch = useDispatch<Dispatch>();

  const recordsList = useMemo(() => Object.values(records).reverse(), [
    records,
  ]);

  return (
    <>
      <Paper square>
        <TrackPanel
          trackingSince={tracker.trackingSince}
          taskName={tracker.taskName}
          onTaskNameChange={(val) => dispatch.tracker.setTaskName(val)}
          onTrackingStart={() =>
            dispatch.tracker.start(currentZonedDateTimeISO())
          }
          onTrackingStop={() =>
            dispatch.tracker.stopAndRecord(currentZonedDateTimeISO())
          }
        />
      </Paper>
      <TrackRecordsList
        records={recordsList}
        onResume={(recordId: TrackingRecordId) => {
          dispatch.records.resume({
            trackingSince: currentZonedDateTimeISO(),
            recordId,
          });
        }}
      />
    </>
  );
};

export default Page;
