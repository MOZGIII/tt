import Paper from "@material-ui/core/Paper";
import React, { useMemo } from "react";

import TrackPanel from "../components/TrackPanel";
import TrackRecordsList from "../components/TrackRecordsList";
import currentZonedDateTimeISO from "../logic/currentZonedDateTimeISO";
import { TrackingRecordId } from "../logic/trackingRecord";
import { recordsActions, useRecordsStore } from "../models/records";
import { trackerActions, useTrackerStore } from "../models/tracker";

const Page: React.FC = () => {
  const taskName = useTrackerStore((state) => state.taskName);
  const trackingSince = useTrackerStore((state) => state.trackingSince);

  const records = useRecordsStore();

  const recordsList = useMemo(
    () => Object.values(records).reverse(),
    [records],
  );

  return (
    <>
      <Paper square>
        <TrackPanel
          trackingSince={trackingSince}
          taskName={taskName}
          onTaskNameChange={trackerActions.setTaskName}
          onTrackingStart={() =>
            trackerActions.start(currentZonedDateTimeISO())
          }
          onTrackingStop={() =>
            trackerActions.stopAndRecord(currentZonedDateTimeISO())
          }
          onTrackingCancel={trackerActions.stop}
        />
      </Paper>
      <TrackRecordsList
        records={recordsList}
        onResume={(recordId: TrackingRecordId) => {
          recordsActions.resume({
            trackingSince: currentZonedDateTimeISO(),
            recordId,
          });
        }}
        onDelete={(recordId: TrackingRecordId) => {
          recordsActions.delete(recordId);
        }}
        onTaskNameChange={(recordId: TrackingRecordId, taskName: string) => {
          recordsActions.patch({
            recordId,
            patch: {
              taskName,
            },
          });
        }}
      />
    </>
  );
};

export default Page;
