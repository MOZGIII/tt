import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";

import { models, RootModel, transforms } from "./models";
import rootTransform from "./storeTransforms";

const persistConfig = {
  key: "root",
  storage,
  transforms: [rootTransform(transforms)],
};

export const store = init<RootModel>({
  models,
  plugins: [persistPlugin(persistConfig)],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
