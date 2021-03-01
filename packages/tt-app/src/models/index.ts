import { Models } from "@rematch/core";

import { records } from "./records";
import { theme } from "./theme";
import { tracker } from "./tracker";

export interface RootModel extends Models<RootModel> {
  tracker: typeof tracker;
  theme: typeof theme;
  records: typeof records;
}

export const models: RootModel = { tracker, theme, records };
