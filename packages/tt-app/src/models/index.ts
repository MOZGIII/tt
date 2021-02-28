import { Models } from "@rematch/core";

import { tracker } from "./tracker";

export interface RootModel extends Models<RootModel> {
  tracker: typeof tracker;
}

export const models: RootModel = { tracker };
