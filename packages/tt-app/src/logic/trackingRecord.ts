import { Temporal } from "@js-temporal/polyfill";
import { v4 as uuidv4 } from "uuid";

export type TrackingRecordId = string;

export type TrackingRecord = {
  id: TrackingRecordId;
  from: Temporal.ZonedDateTime;
  to: Temporal.ZonedDateTime;
  taskName: string;
};

export const makeTrackingRecordId = (): TrackingRecordId => uuidv4();

export const makeTrackingRecord = (
  params: Omit<TrackingRecord, "id">
): TrackingRecord => ({
  ...params,
  id: makeTrackingRecordId(),
});
