import { Models } from "@rematch/core";

import { theme } from "./theme";
import { tracker } from "./tracker";

export interface RootModel extends Models<RootModel> {
  tracker: typeof tracker;
  theme: typeof theme;
}

export const models: RootModel = { tracker, theme };
