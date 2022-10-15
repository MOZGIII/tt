import { Models } from "@rematch/core";

import { ModelTransforms } from "../lib/modelsTransform";
import { records, recordsTransform } from "./records";
import { theme } from "./theme";
import { tracker, trackerTransform } from "./tracker";

export interface RootModel extends Models<RootModel> {
  tracker: typeof tracker;
  theme: typeof theme;
  records: typeof records;
}

export const models: RootModel = { tracker, theme, records };

export interface RootTransforms
  extends ModelTransforms<RootModel, RootTransforms> {
  tracker: typeof trackerTransform;
  records: typeof recordsTransform;
}

export const transforms: RootTransforms = {
  tracker: trackerTransform,
  records: recordsTransform,
};
